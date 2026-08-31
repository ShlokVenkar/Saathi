// Senior Citizen Helping Wristband - ESP32 Firmware
// Pin Definitions
const int PIR_PIN = 27;     
const int BUTTON_PIN = 26;  
const int BUZZER_PIN = 25;  
const int GREEN_LED_PIN = 32; 
const int RED_LED_PIN = 33;   

void setup() {
  Serial.begin(115200);
  pinMode(PIR_PIN, INPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP); 
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(GREEN_LED_PIN, OUTPUT);
  pinMode(RED_LED_PIN, OUTPUT);
}
void loop() {}
