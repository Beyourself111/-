
// Motor Connections (Both must use PWM pins)
#define RPWM 5
#define LPWM 6

void setup() {

  // Set motor connections as outputs
  pinMode(RPWM, OUTPUT);
  pinMode(LPWM, OUTPUT);

  // Stop motors
  analogWrite(RPWM, 0);
  analogWrite(LPWM, 0);
}

void loop() {
int i=0;
  // Accelerate reverse
  digitalWrite(LPWM, LOW);
  for (i = 0; i < 255; i++) {
    analogWrite(RPWM, i);
    delay(20);
  }

  delay(1000);

  // Decelerate reverse
  for ( i = 255; i >= 0; i--) {
    analogWrite(RPWM, i);
    delay(20);
  }

  delay(500);
}