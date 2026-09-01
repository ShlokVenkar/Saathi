import { RequestItem, RequestType, RequestSource, RequestPriority } from '@/types';
import { INITIAL_REQUESTS } from '@/data/mockData';

const STORAGE_KEY = 'saathi_requests_v1';

class RequestService {
  private requests: RequestItem[] = [];
  private listeners: Array<(requests: RequestItem[]) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          this.requests = JSON.parse(stored);
        } catch {
          this.requests = [...INITIAL_REQUESTS];
        }
      } else {
        this.requests = [...INITIAL_REQUESTS];
        this.save();
      }
    } else {
      this.requests = [...INITIAL_REQUESTS];
    }
  }

  private save() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.requests));
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach((fn) => fn([...this.requests]));
  }

  public subscribe(listener: (requests: RequestItem[]) => void): () => void {
    this.listeners.push(listener);
    listener([...this.requests]);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public getRequests(): RequestItem[] {
    return [...this.requests];
  }

  public createRequest(
    type: RequestType,
    source: RequestSource = 'APP',
    seniorName: string = 'Shlok',
    customMessage?: string
  ): RequestItem {
    let priority: RequestPriority = 'NORMAL';
    if (type === 'EMERGENCY') priority = 'EMERGENCY';
    else if (type === 'PAIN' || type === 'MEDICINE' || type === 'HELP') priority = 'HIGH';

    const newReq: RequestItem = {
      id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      seniorId: 'senior-shlok-1',
      seniorName,
      type,
      message: customMessage || `Request for ${type.toLowerCase()}`,
      source,
      timestamp: Date.now(),
      status: 'PENDING',
      priority
    };

    this.requests = [newReq, ...this.requests];
    this.save();
    return newReq;
  }

  public acknowledgeRequest(requestId: string, caregiverName: string = 'Son (Caregiver)'): void {
    this.requests = this.requests.map((r) => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'ACKNOWLEDGED',
          acknowledgedAt: Date.now(),
          acknowledgedBy: caregiverName
        };
      }
      return r;
    });
    this.save();
  }

  public resolveRequest(requestId: string, caregiverName: string = 'Son (Caregiver)'): void {
    this.requests = this.requests.map((r) => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'RESOLVED',
          resolvedAt: Date.now(),
          resolvedBy: caregiverName
        };
      }
      return r;
    });
    this.save();
  }

  public cancelRequest(requestId: string): void {
    this.requests = this.requests.map((r) => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'CANCELLED'
        };
      }
      return r;
    });
    this.save();
  }

  public getActiveCount(): number {
    return this.requests.filter((r) => r.status === 'PENDING' || r.status === 'ACKNOWLEDGED').length;
  }
}

export const requestService = new RequestService();
