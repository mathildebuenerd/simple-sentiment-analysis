/**
 * Created by mathi on 27/02/2018.
 */

let sentences = "";

// Initialize Firebase

// Put your own config
// let config = {
//     apiKey: "xxx",
//     authDomain: "xxx.firebaseapp.com",
//     databaseURL: "https://xxx.firebaseio.com",
//     projectId: "xxx",
//     storageBucket: "xxx.appspot.com",
//     messagingSenderId: "xxx"
// };

firebase.initializeApp(config);
console.log(firebase);
let database = firebase.database();
sentences = database.ref('sentences'); // désigne une branche de l'arbre des données qui sont sous forme json

