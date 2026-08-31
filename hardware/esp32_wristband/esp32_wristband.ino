// Senior Citizen Helping Wristband - ESP32 Firmware
// Hackathon Edition - Mocks Gesture Recognition using PIR duration and Button presses

#include <WiFi.h>
#include <HTTPClient.h>

// --- Configuration ---
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// The endpoint where the Android App/Backend is listening
// Example: http://192.168.1.100:5000/api/alert or Firebase Function URL
String serverName = "http://YOUR_SERVER_IP:PORT/api/alert"; 

// --- Pin Definitions ---
const int PIR_PIN = 27;     // HC-SR501 PIR sensor
const int BUTTON_PIN = 26;  // Emergency/Action Button
const int BUZZER_PIN = 25;  // Buzzer
const int GREEN_LED_PIN = 32; // Status/Success indicator
const int RED_LED_PIN = 33;   // Emergency/Error indicator

// --- State Variables ---
unsigned long buttonPressTime = 0;
unsigned long buttonReleaseTime = 0;
int buttonPressCount = 0;
bool isEmergency = false;

unsigned long pirStartTime = 0;
bool pirActive = false;

void setup() {
  Serial.begin(115200);
  Serial.println("Starting Senior Citizen Wristband...");

  pinMode(PIR_PIN, INPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP); 
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(GREEN_LED_PIN, OUTPUT);
  pinMode(RED_LED_PIN, OUTPUT);

  digitalWrite(GREEN_LED_PIN, LOW);
  digitalWrite(RED_LED_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);

  // Connect to WiFi
  connectWiFi();
}

void connectWiFi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    // Blink Red while connecting
    digitalWrite(RED_LED_PIN, !digitalRead(RED_LED_PIN)); 
  }
  
  Serial.println("\nConnected to WiFi!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  
  digitalWrite(RED_LED_PIN, LOW);
  digitalWrite(GREEN_LED_PIN, HIGH); // Solid Green means Connected
}

// Function to send data to the cloud/app
void sendAlertToCloud(String alertType) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    // JSON Payload
    String jsonPayload = "{\"device_id\":\"wristband_01\",\"alert_type\":\"" + alertType + "\"}";
    
    Serial.println("Sending: " + jsonPayload);
    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0) {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      
      // Success Feedback: Quick Green Blink & short Beep
      digitalWrite(GREEN_LED_PIN, LOW);
      digitalWrite(BUZZER_PIN, HIGH);
      delay(200);
      digitalWrite(BUZZER_PIN, LOW);
      digitalWrite(GREEN_LED_PIN, HIGH);
    } else {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
      // Error Feedback: Quick Red Blink
      digitalWrite(RED_LED_PIN, HIGH);
      delay(500);
      digitalWrite(RED_LED_PIN, LOW);
    }
    http.end();
  } else {
    Serial.println("WiFi Disconnected. Cannot send alert.");
    connectWiFi(); // Try reconnecting
  }
}

void handleButton() {
  bool currentButtonState = (digitalRead(BUTTON_PIN) == LOW);
  static bool lastButtonState = false;
  static unsigned long lastDebounceTime = 0;
  
  if (currentButtonState != lastButtonState) {
    lastDebounceTime = millis();
  }
  
  if ((millis() - lastDebounceTime) > 50) { // 50ms debounce
    // Button Pressed
    if (currentButtonState && !lastButtonState) {
      buttonPressTime = millis();
    }
    // Button Released
    else if (!currentButtonState && lastButtonState) {
      buttonReleaseTime = millis();
      unsigned long pressDuration = buttonReleaseTime - buttonPressTime;
      
      if (pressDuration > 2000) {
        // LONG PRESS: SOS
        Serial.println("SOS BUTTON TRIGGERED!");
        sendAlertToCloud("EMERGENCY");
        
        // SOS Feedback loop
        for(int i=0; i<5; i++) {
          digitalWrite(RED_LED_PIN, HIGH);
          digitalWrite(BUZZER_PIN, HIGH);
          delay(200);
          digitalWrite(RED_LED_PIN, LOW);
          digitalWrite(BUZZER_PIN, LOW);
          delay(200);
        }
      } else if (pressDuration > 50) {
        // SHORT PRESS: We'll count these for multi-taps
        buttonPressCount++;
      }
    }
  }
  lastButtonState = currentButtonState;

  // Process Multi-taps after a short delay
  if (buttonPressCount > 0 && (millis() - buttonReleaseTime) > 600 && !currentButtonState) {
    if (buttonPressCount == 1) {
      Serial.println("Action: Need Water (Single Tap)");
      sendAlertToCloud("THIRSTY");
    } else if (buttonPressCount == 2) {
      Serial.println("Action: Need Bathroom (Double Tap)");
      sendAlertToCloud("TOILET");
    }
    buttonPressCount = 0; // Reset
  }
}

void handlePIRGestureSimulation() {
  int currentPirState = digitalRead(PIR_PIN);
  
  // Motion Starts
  if (currentPirState == HIGH && !pirActive) {
    pirActive = true;
    pirStartTime = millis();
    Serial.println("PIR Motion Started...");
  }
  
  // Motion Ends
  if (currentPirState == LOW && pirActive) {
    pirActive = false;
    unsigned long duration = millis() - pirStartTime;
    Serial.print("PIR Motion Ended. Duration: ");
    Serial.print(duration);
    Serial.println(" ms");
    
    // HACKATHON MAKESHIFT LOGIC:
    // If the movement was quick (e.g., less than 2 seconds), simulate "Thumbs Up" (Water)
    // If it was longer, simulate "Pinky" (Bathroom)
    
    if (duration > 500 && duration <= 2000) {
      Serial.println("Simulated Gesture: Thumbs Up -> THIRSTY");
      sendAlertToCloud("THIRSTY");
    } else if (duration > 2000) {
      Serial.println("Simulated Gesture: Pinky -> TOILET");
      sendAlertToCloud("TOILET");
    }
  }
}

void loop() {
  handleButton();
  handlePIRGestureSimulation();
  
  // Small delay for stability
  delay(10);
}
