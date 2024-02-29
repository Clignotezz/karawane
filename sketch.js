//class des objets sonores
class SoundObject {
    constructor(name, x, y, sound) {
      this.name = name;
      this.x = x;
      this.y = y + (textAscent() + textDescent()) / 2; // Adjust y position to be the center of the letter
      this.sound = sound;
      this.wasClicked = false;
      this.isVisible = true;
    }
  //condition, si le curseur est à bonne distance donc rouge, agrandissement, shake et retour ä la normale
  display() {
    if (this.isVisible) {
        if (this.hover(mouseX, mouseY)) {
            fill(255, 0, 0); // Change color to red
            textSize(90); // Increase text size
            text(this.name, this.x + random(-5, 5), this.y + random(-5, 5)); // Make text shake

            // Définir un délai avant de rendre l'objet invisible
            setTimeout(() => {
                this.isVisible = false;
            }, 250); // 2000 millisecondes = 2 secondes
        } else {
            fill(0);
            textSize(64); // Reset text size
            text(this.name, this.x, this.y);
        }
    }
}

        // Checks if the mouse cursor is hovering over the text.
    // It calculates the distance from the mouse cursor to the center of the text,
    // and returns true if this distance is less than half the width of the text.
    isHovering(mx, my) {
        return dist(mx, my, this.x + textWidth(this.name) / 2, this.y) < textWidth(this.name) / 2;
    }

    // Checks if the mouse cursor is clicking on the text.
    // It uses the isHovering method to check if the mouse cursor is over the text.
    // If the mouse cursor is over the text and the text was not previously clicked, it sets wasClicked to true and returns true.
    // If the mouse cursor is not over the text, it sets wasClicked to false.
    // It returns false in all other cases.
    checkIfClicked(mx, my) {
        let isHovering = this.isHovering(mx, my);
        if (isHovering && !this.wasClicked && this.isVisible) { // Ajoutez this.isVisible ici
            this.wasClicked = true;
            setTimeout(() => {
                this.isVisible = false;
            }, 2000); // 2000 millisecondes = 2 secondes
            return true;
        } else if (!isHovering) {
            this.wasClicked = false;
        }
        return false;
    }

    // A wrapper method for isHovering that can be used to determine if the mouse cursor is hovering over the text.
    hover(mx, my) {
        return this.isHovering(mx, my);
    }
}

//annonce des objets sonores
let soundObjects = [];
//lignes seulement pour la disposition des mots
let lines = [
    ["K", "A", "R", "A", "W", "A", "N", "E"],
    [" "],
    ["jo", "li", "fan", "to", " ", "bam", "bla", " ", "ô", " ", "fa", "lli", " ", "bam", "bla"],
    ["gro", "ssi", "ga", " ", "m'", "pfa", " ", "ha", "bla", " ", "ho", "rem"],
    ["é", "gi", "ga", " ", "go", "ra", "men"],
    ["hi", "go", " ", "bloi", "ko", " ", "ru", "ssu", "la", " ", "hu", "ju"],
    ["ho", "lla", "ka", " ", "ho", "lla", "la"],
    ["an", "lo", "go", " ", "bung"],
    ["bla", "go", " ", "bung"],
    ["bla", "go", " ", "bung"],
    ["bo", "sso", " ", "fa", "ta", "ka"],
    ["ü", " ", "üü", " ", "ü"],
    ["scham", "pa", " ", "wu", "lla", " ", "wu", "ssa", " ", "ó", "lo", "bo"],
    ["hej", " ", "tat", "ta", " ", "gô", "rem"],
    ["e", "schi", "ge", " ", "zun", "ba", "da"],
    ["wu", "lu", "bu", " ", "ssu", "bu", "du", " ", "u", "luw", " ", "ssu", "bu", "du"],
    ["tum", "ba", " ", "ba", "-", " ", "umf"],
    ["ku", "sa", "gau", "ma"],
    ["ba", " ", "-", " ", "umf"],
];

// Créez une variable pour stocker le son
let allInvisibleSound;
// Ajoutez une variable d'état pour suivre si le son final a été joué
let finalSoundPlayed = false;
// Chargez le son dans la fonction preload
function preload() {
    allInvisibleSound = loadSound('sounds/ligneZ/sonmarrant17.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(64); // Set the text size
    setupSounds();
  
    // Create sound objects
    let y = 100;
    let lineHeight = 65;
    for (let line of lines) {
      let x = 350;
      for (let name of line) {
        if (name === " ") {
          x += 40; // Increment x by the width of a space
        } else if (sounds[name]) { // Check if the sound exists
          soundObjects.push(new SoundObject(name, x, y));
          x += textWidth(name); // Increment x by the width of the text plus a margin
        }
      }
      y += lineHeight;
    }
  }
  function mouseMoved() {
    for (let soundObject of soundObjects) {
        if (soundObject.isVisible && soundObject.checkIfClicked(mouseX, mouseY)) { // Ajoutez soundObject.isVisible ici
            playASoundFromName(soundObject.name);
        }
    }
}

function draw() {
    background(260, 230, 230);
  
    // Draw sound names
    for (let soundObject of soundObjects) {
      soundObject.display();
    }
    let allInvisible = soundObjects.every(obj => !obj.isVisible);
    if (allInvisible && !finalSoundPlayed) {
        allInvisibleSound.play();
        finalSoundPlayed = true;

        // Réinitialisez le sketch après que le son ait fini de jouer
        allInvisibleSound.onended(resetSketch);
    }
}

// Fonction pour réinitialiser le sketch
function resetSketch() {
    // Réinitialisez tous les objets à visible de manière disparate
    soundObjects.forEach((obj, index) => {
        setTimeout(() => {
            obj.isVisible = true;
        }, Math.random() * 3000); // 3000 millisecondes = 3 secondes
    });
    // Assurez-vous que finalSoundPlayed est réinitialisé après 3 secondes
    setTimeout(() => {
        finalSoundPlayed = false;
    }, 3000);
}
  
  





