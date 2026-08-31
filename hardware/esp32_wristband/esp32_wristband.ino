// Senior Citizen Helping Wristband - ESP32 Firmware
#include <WiFi.h>
#include <HTTPClient.h>

const int PIR_PIN = 27;     
unsigned long pirStartTime = 0;
bool pirActive = false;

void handlePIRGestureSimulation() {
  int currentPirState = digitalRead(PIR_PIN);
  if (currentPirState == HIGH && !pirActive) {
    pirActive = true;
    pirStartTime = millis();
  }
  if (currentPirState == LOW && pirActive) {
    pirActive = false;
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(PIR_PIN, INPUT);
}
void loop() {
  handlePIRGestureSimulation();
}
