/**
 * Created by mathi on 16/02/2018.
 */


let cool = require('cool-ascii-faces'); // for updating heroku when there're local changes

// Set-up the server
let express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let server = app.listen(port);

//  Dependencies
let fs = require('fs'); // pour gérer les fichiers
// Met en place le socket
let socket = require('socket.io');
let io = socket(server);

// for updating heroku when there're local changes
app.get('/cool', function(request, response) {
    response.send(cool());
});

app.use(express.static('public')); // quand l'user va sur le site il va voir ce qu'il y a dans le dossier public

// The 'sentiment' package has more words, but the multilang allows other languages than english
// So use 'sentiment' when it's english, and sentiment-multilang otherwise
// let sentiment = require('sentiment');
let sentimentMultilang = require('sentiment-multilang'); // for sentiment analysis

// Global Settings
let lang = 'fr';

io.sockets.on('connection', newConnection);
// io.sockets.on('newSentence', updateTheScore);


function newConnection(socket) {
    // console.log(socket);
    console.log('new connection');
    socket.emit('new-connection', 'Il y a eu une nouvelle connection');

    socket.on('newSentence', (data) => {
        updateTheScore(socket, data);
    });

    function updateTheScore(socket, data) {

        console.log("update data");
        // console.log(data);

        let score = sentimentMultilang(data.sentence, lang);
        console.log('score');
        console.log(score);
        socket.emit('score', score);

        // find the the score of that sentence
        // add it to the total score
        // add the sentence to a file
// send the score to the client


    }

}



// let textContent = '';
// let textToAnalyze = "Neighbors said patrol cars were regularly in his mother’s driveway. More recently, Mr. Cruz, 19, had been expelled from his high school. He posted pictures of weapons and dead animals on social media.";

// let score = sentiment(textToAnalyze);
// let score = sentimentMultilang(textToAnalyze, lang);
// console.log(score.score);






// to analyze from a text file
// you can't read easily a .txt file, but maybe html is easier

// fs.readFile('data/nytimes.txt', function read(err, data) {
//     if (err) {
//         throw err;
//     }
//     textContent = data;
//     processFile();
// });
//
// function processFile() {
//     console.log(textContent);
// }