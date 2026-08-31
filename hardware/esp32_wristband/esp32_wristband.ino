// Senior Citizen Helping Wristband - ESP32 Firmware
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
String serverName = "http://YOUR_SERVER_IP:PORT/api/alert"; 

const int PIR_PIN = 27;     
const int BUTTON_PIN = 26;  
const int BUZZER_PIN = 25;  
const int GREEN_LED_PIN = 32; 
const int RED_LED_PIN = 33;   

void connectWiFi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) { delay(500); }
  digitalWrite(GREEN_LED_PIN, HIGH); 
}

void sendAlertToCloud(String alertType) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    String jsonPayload = "{\"device_id\":\"wristband_01\",\"alert_type\":\"" + alertType + "\"}";
    int httpResponseCode = http.POST(jsonPayload);
    http.end();
  }
}

void setup() {
  Serial.begin(115200);
  connectWiFi();
}
void loop() {}
