#include <AccelStepper.h>
#include <Stepper.h>

#define ENA_PIN_X1 13
#define DIR_PIN_X1 12
#define PUL_PIN_X1 11

#define ENA_PIN_Y1 10
#define DIR_PIN_Y1 9
#define PUL_PIN_Y1 8

#define ENA_PIN_Z1 7
#define DIR_PIN_Z1 6
#define PUL_PIN_Z1 5

const int pompe = 3;

AccelStepper stepperX1(AccelStepper::DRIVER, PUL_PIN_X1, DIR_PIN_X1);
AccelStepper stepperX2(AccelStepper::DRIVER, PUL_PIN_Y1, DIR_PIN_Y1);
AccelStepper stepperY(AccelStepper::DRIVER, PUL_PIN_Z1, DIR_PIN_Z1);

// Constante pour la distance parcourue par le moteur pour un seul pas (en mètres/step)
const float DISTANCE_PER_STEP = 0.25; // 1 millimètre par pas

void setup() {
  // Définir les broches comme des sorties pour les moteurs
  pinMode(ENA_PIN_X1, OUTPUT);
  pinMode(ENA_PIN_Y1, OUTPUT);
  pinMode(ENA_PIN_Z1, OUTPUT);

  // Activer les moteurs
  digitalWrite(ENA_PIN_X1, LOW);
  digitalWrite(ENA_PIN_Y1, LOW);
  digitalWrite(ENA_PIN_Z1, LOW);

  stepperX1.setMaxSpeed(5000);
  stepperX1.setAcceleration(3000);
  stepperX2.setMaxSpeed(5000);
  stepperX2.setAcceleration(3000);
  stepperY.setMaxSpeed(5000);
  stepperY.setAcceleration(3000);

  pinMode(pompe, OUTPUT); // output pin for relay board, this will send signal to the relay

  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    String typePlante = Serial.readStringUntil(' ');
    int stepsX = Serial.parseInt();
    int stepsY = Serial.parseInt();
    int stepsZ = Serial.parseInt();

    // Logique de contrôle en fonction du type de plante
    if (typePlante == "beet") {

    } else if (typePlante == "carrot") {
      // Ajoutez votre logique spécifique pour la plante "carrot"
    } else if (typePlante == "lettuce") {
      // Ajoutez votre logique spécifique pour la plante "lettuce"
    } else if (typePlante == "tomato") {
      moveStepper(stepperY, 20000);
      delay(2000);
      moveStepper(stepperY, -20000);
    }

    moveStepper(stepperX1, stepsX);
    moveStepper(stepperX2, stepsY);
    moveStepper(stepperY, stepsZ);

    delay(2000);               // Maintenir la pompe activée pendant 2 secondes
    digitalWrite(pompe, LOW);  // Désactiver la pompe

    Serial.println("Movement and watering completed."); // Indiquer que le mouvement et l'arrosage sont terminés
  }
}

void moveStepper(AccelStepper &stepper, int steps) {
  stepper.setCurrentPosition(0); // Réinitialiser la position actuelle
  int stepsToMove = steps / DISTANCE_PER_STEP;
  stepper.moveTo(stepsToMove); // Déplacer le moteur

  // Boucle pour exécuter le mouvement des moteurs
  while (stepper.distanceToGo() != 0) {
    stepper.run();
  }
}