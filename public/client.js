/**
 * Created by mathi on 16/02/2018.
 */

// Global variables
let socket = io();
let userInfos = '';

socket.on('new-connection', welcomeNewUser);

function welcomeNewUser() {
    let name = prompt("Salut ça va ? C'est quoi ton nom ?", 'math');
    userInfos = {name: name};
    let usernameBlock = document.querySelector('header p span#username');
    usernameBlock.textContent = name;
}





// Speech to text

let final_transcript = '';
let recognizing = false;

let recognition = new webkitSpeechRecognition();
recognition.lang = "fr-FR";
recognition.continuous = true;
recognition.interimResults = true;

if ('webkitSpeechRecognition' in window) {

    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        recognizing = true;
    };

    // quand un mot est reconnu, on récupère sa valeur
    recognition.onresult = (event) => {
        // console.log(event);
        let last = event.results.length-1;
        let foundWords = event.results[last][0].transcript;
        console.log(foundWords);

    };

    // permet de redémarrer la recognition quand elle s'arrête
    recognition.onend = () => {
        // recognizing = true;
        console.log("je me suis arrêté");
        startRecording(event);
    };

}

function startRecording(event) {

    console.log('start recording');
    console.log(event);
    recognition.stop();
    final_transcript = '';
    recognition.start();

}