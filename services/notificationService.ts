import { NotificationItem, RequestItem } from '@/types';

export interface WhatsAppSimulationMessage {
  id: string;
  sender: string;
  recipientPhone: string;
  recipientName: string;
  timestamp: string;
  messageText: string;
  priority: string;
  requestType: string;
  source: string;
}

const STORAGE_KEY = 'saathi_notifications_v1';

class NotificationService {
  private notifications: NotificationItem[] = [];
  private listeners: Array<(notifications: NotificationItem[]) => void> = [];
  private lastWhatsAppSimMessage: WhatsAppSimulationMessage | null = null;
  private whatsAppListeners: Array<(msg: WhatsAppSimulationMessage | null) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          this.notifications = JSON.parse(stored);
        } catch {
          this.notifications = [];
        }
      }
    }
  }

  private save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.notifications));
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach((fn) => fn([...this.notifications]));
  }

  public subscribe(listener: (notifications: NotificationItem[]) => void): () => void {
    this.listeners.push(listener);
    listener([...this.notifications]);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public subscribeWhatsApp(listener: (msg: WhatsAppSimulationMessage | null) => void): () => void {
    this.whatsAppListeners.push(listener);
    listener(this.lastWhatsAppSimMessage);
    return () => {
      this.whatsAppListeners = this.whatsAppListeners.filter((l) => l !== listener);
    };
  }

  public getNotifications(): NotificationItem[] {
    return [...this.notifications];
  }

  public getUnreadCount(): number {
    return this.notifications.filter((n) => !n.read).length;
  }

  public markAllAsRead(): void {
    this.notifications = this.notifications.map((n) => ({ ...n, read: true }));
    this.save();
  }

  public notifyFromRequest(req: RequestItem): void {
    const isEmergency = req.type === 'EMERGENCY';
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: isEmergency ? '🚨 CRITICAL SOS ALERT' : `🔔 Request: ${req.type}`,
      message: `${req.seniorName} sent request: "${req.message || req.type}" via ${req.source === 'HARDWARE' ? 'ESP32 Gesture Glove' : 'Mobile Screen'}`,
      source: req.source,
      timestamp: Date.now(),
      read: false,
      requestType: req.type,
      seniorName: req.seniorName,
      priority: req.priority,
      whatsAppSimulated: true
    };

    this.notifications = [notif, ...this.notifications];
    this.save();

    // Trigger WhatsApp Simulation Message
    const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const waMessage: WhatsAppSimulationMessage = {
      id: `wa-${Date.now()}`,
      sender: 'SAATHI Assistive Gateway',
      recipientPhone: '+91 98765 43210 (Priya Sharma)',
      recipientName: 'Priya Sharma',
      timestamp: formattedTime,
      priority: req.priority,
      requestType: req.type,
      source: req.source === 'HARDWARE' ? 'ESP32 Gesture Glove' : 'Mobile Touchscreen',
      messageText: `*SAATHI ALERT - ACTION REQUIRED*\n\n` +
        `👤 *Senior:* ${req.seniorName}\n` +
        `📌 *Need:* ${req.type} (${req.message || 'Help requested'})\n` +
        `⚡ *Source:* ${req.source === 'HARDWARE' ? 'ESP32 Flex Glove Gesture' : 'Mobile App'}\n` +
        `🕒 *Time:* ${formattedTime}\n` +
        `🚨 *Priority:* ${req.priority}\n\n` +
        `👉 Reply 1 to Acknowledge | Reply 2 to Call Senior | Reply 9 for Emergency 108`
    };

    this.lastWhatsAppSimMessage = waMessage;
    this.whatsAppListeners.forEach((fn) => fn(this.lastWhatsAppSimMessage));

    // Browser Notification if supported
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(notif.title, {
          body: notif.message,
          icon: '/icons/icon-192x192.png'
        });
      } catch {
        // Ignore in restricted environments
      }
    }
  }

  public getLastWhatsAppMessage(): WhatsAppSimulationMessage | null {
    return this.lastWhatsAppSimMessage;
  }
}

export const notificationService = new NotificationService();
