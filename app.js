/**
 * Created by mathi on 16/02/2018.
 */

// Set-up the server
let express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let server = app.listen(port);

//  Dependencies
let fs = require('fs'); // pour lire le texte à analyser et écrire le json avec le tableau des mots

// The 'sentiment' package has more words, but the multilang allows other languages than english
// So use 'sentiment' when it's english, and sentiment-multilang otherwise
let sentiment = require('sentiment');
let sentimentMultilang = require('sentiment-multilang'); // for sentiment analysis

// Global Settings
let lang = 'en';

let textContent = '';
let textToAnalyze = "Neighbors said patrol cars were regularly in his mother’s driveway. More recently, Mr. Cruz, 19, had been expelled from his high school. He posted pictures of weapons and dead animals on social media.";

let score = sentiment(textToAnalyze);
// let score = sentimentMultilang(textToAnalyze, lang);
console.log(score.score);






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