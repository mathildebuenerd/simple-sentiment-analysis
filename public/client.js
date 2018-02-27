/**
 * Created by mathi on 16/02/2018.
 */

// Global variables
let socket = io();
let userInfos = '';

socket.on('new-connection', welcomeNewUser);
socket.on('score', displayScore);






function displayScore(data) {
    // console.log('data');
    // console.log(data);
    let scoreBlock = document.querySelector('#score');
    let voteBlock = document.querySelector('#vote');
    let positiveWords = document.querySelector('#positive');
    let negativeWords = document.querySelector('#negative');

    sentences.push({score:data.score, vote:data.vote, positiveWords:data.positive, negativeWords:data.negative});

    // Display the score
    scoreBlock.textContent = data.score;

    // Display the vote
    voteBlock.textContent = data.vote;

    // Display the positive words
    for (let i=0; i<data.positive.length; i++) {
        positiveWords.innerHTML = "";
        let singleWord = document.createElement('span');
        singleWord.textContent += data.positive[i];
        positiveWords.appendChild(singleWord);
    }

    // Display the negative words
    for (let i=0; i<data.negative.length; i++) {
        negativeWords.innerHTML = "";
        let singleWord = document.createElement('span');
        singleWord.textContent += data.negative[i];
        negativeWords.appendChild(singleWord);
    }

}

function welcomeNewUser() {
    let name = prompt("Salut ça va ? C'est quoi ton nom ?", 'math');
    userInfos = {name: name};
    let usernameBlock = document.querySelector('header p span#username');
    usernameBlock.textContent = name;
}



// Speech to text

// Configure the webkitSpeechRecognition
let recognizing = false;
let recognition = new webkitSpeechRecognition();
recognition.lang = "fr-FR";
recognition.continuous = true;
recognition.interimResults = true;

// What I do is :
// - Here I listen to the speech
// - When I have enough words (10), I stop the recognition and put those words into the sentence variable
// - I send sentence to the server
// - The server analyze that sentence, change the current score, and add the sentence to a file
// - The server send the score back to the client
// - I update the variable on the interface

if ('webkitSpeechRecognition' in window) {

    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
        recognizing = true;
    };

    // each time it recognizes a new word
    recognition.onresult = (event) => {

        let sentence = '';

        // we go into the results in order to have the whole sentence
        for (let i=0; i<event.results.length; i++) {
            sentence+=event.results[i][0].transcript + ' ';
        }


        console.log(sentence);

        // when we have 10 words, we send it to the server and restart the recording
        if ((sentence.split(' ')).length > 10) {
            socket.emit('newSentence', {sentence: sentence}); // on envoie un message de type 'newsentence, avec la sentence en contenu
            sentences.push({sentence:sentence});
            restartRecording();
        }


    };

    // permet de redémarrer la recognition quand elle s'arrête
    recognition.onend = () => {
        // recognizing = true;
        console.log("je me suis arrêté");
        restartRecording(event);
    };

}


function restartRecording(event) {

    console.log('start recording');
    recognition.stop();
    recognition.start();

}