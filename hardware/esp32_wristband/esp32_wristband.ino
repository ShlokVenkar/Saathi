// Senior Citizen Helping Wristband - ESP32 Firmware
#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

const int PIR_PIN = 27;     
const int BUTTON_PIN = 26;  
const int BUZZER_PIN = 25;  
const int GREEN_LED_PIN = 32; 
const int RED_LED_PIN = 33;   

void connectWiFi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    digitalWrite(RED_LED_PIN, !digitalRead(RED_LED_PIN)); 
  }
  digitalWrite(RED_LED_PIN, LOW);
  digitalWrite(GREEN_LED_PIN, HIGH); 
}

void setup() {
  Serial.begin(115200);
  pinMode(PIR_PIN, INPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP); 
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(GREEN_LED_PIN, OUTPUT);
  pinMode(RED_LED_PIN, OUTPUT);
  connectWiFi();
}
void loop() {}
