let sounds = {};

function playASoundFromName(name) {
    let sound = sounds[name];
    console.log(name);
    // choisir aleatoirement un son
    let randomIndex = Math.floor(Math.random() * sound.length);
    let randomSound = sound[randomIndex];
    // jouer le son
    randomSound.play();
    console.log(sound.length);
}

function soundDidLoad() {
}

function soundHadError(err) {
    console.log("error " + err)
}

function setupSounds() {
    // combien de lignes ?
    //console.log("lines = " + poem.length)
    // pour chaque ligne
    for(let line of poem) {
        // combien de vocables sur cette ligne ?
        //console.log("==============")
        //console.log("length = " + line.length)
        // pour chaque vocable
        for(let vocable of line) {
            // combien de syllabes dans ce vocable ?
            //console.log("------------------")
            let syllabeName = Object.keys(vocable)
            //console.log("syllable = " + syllabeName)
            // pour chaque syllabe
            for(let syllable in vocable) {
                // combien de sons dans cette syllabe ?
                //console.log("sounds = " + vocable[syllable].length)
                // pour chaque son
                for(let sound of vocable[syllable]) {

                    let fullname = "sounds/" + sound
                    // verifier si la clé existe déjà dans le tableau
                    if (!sounds[syllabeName]) {
                        sounds[syllabeName] = []
                    }

                    sounds[syllabeName].push(loadSound(fullname, soundDidLoad, soundHadError))

                }
            }
            // for(sound of vocable) {
        }
        // for(vocable of line) {
    }
    // for(line of poem) {

    //console.log(sounds)

}

