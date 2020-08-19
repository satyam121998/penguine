const express = require('express');
const app = express();
const gtts = require ('gtts.js').gTTS;
const bodyParser = require ('body-parser');

app.use (bodyParser.json());
app.use (bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("index");
})

app.post("/", function (req, res) {
    let rose = req.body.text;
    const speech = new gtts(rose);
    speech.save("audio.mp3")
    .then(function (){
        res.download("audio.mp3")
    }).catch(function (err){
        console.log("Error Occured", err);
    })
})

let port = process.env.PORT || 5000;
app.listen(port, function (){
    console.log(`Listening at ${port}`);
})