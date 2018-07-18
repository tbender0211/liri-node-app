require("dotenv").config();

var keys = require("keys.js");
// var Spotify =  require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");

var nodeArgs = process.argv;
var command = nodeArgs[2];

var client = new Twitter(keys.twitterKeys);
// var spotify = new Spotify(keys.spotifyKeys);

console.log(client);


function displayTweets(){
    client.get("statuses/user_timeline", {screen_name:"TaraBender"}, {count:"10"}, function(error,tweets,response){
        if(!error){
            for(i=0; i<tweets.length; i++){
                console.log("@TaraBender: " + tweets[i].text + " " + tweets[i].created_at);
            }
        }
    })
}

// function spotifySong(){
    
// }

displayTweets();