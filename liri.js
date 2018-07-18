require("dotenv").config();

var keys = require("./keys.js");
// var Spotify =  require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");

var movieKey = "http://www.omdbapi.com/?i=tt3896198&apikey=7bc4c9f6";

var nodeArgs = process.argv;
var command = nodeArgs[2];

var client = new Twitter(keys.twitterKeys);
// var spotify = new Spotify(keys.spotifyKeys);

console.log(client);

function displayTweets() {
    var output = "";
    var params = {screen_name:"TaraBender", count: 10 }
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (error) throw error;
      for (var i = 0; i < tweets.length; i++) {
        output += ("───────────────────────────────────────────\n");
        output += ("@TaraBender: " + tweets[i].text) + "\n";
        output += (tweets[i].created_at) + "\n";
      }
      output += "───────────────────────────────────────────\n";
      console.log(output);
    });
}

function spotifySong() {
    var params = {type: "track", query: process.arg[3]}
    spotify.search(params, function(error,data){
        
    })
}