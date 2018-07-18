require("dotenv").config();

var keys = require("./keys.js");
var Spotify =  require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");

var movieKey = "http://www.omdbapi.com/?i=tt3896198&apikey=7bc4c9f6";

var nodeArgs = process.argv;
var command = nodeArgs[2];

var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotifyKeys);



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
    var params = {type: "track", query: nodeArgs[3]}
    spotify.search(params, function(error,data){
        console.log(data);
    })
}

function movieInfo(){

    var movieName = "";
    
    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
      
          movieName = movieName + "+" + nodeArgs[i];
      
        }
      
        else {
      
          movieName += nodeArgs[i];
      
        }
      }
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=7bc4c9f6";

    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {
        if(!error && response.statusCode === 200){

            var title = JSON.parse(body).Title;
            var year = JSON.parse(body).Year;
            var ratingIMDB = JSON.parse(body).imdbRating;
            var ratingRotten = JSON.parse(body).tomatoMeter;
            var country = JSON.parse(body).Country;
            var lang = JSON.parse(body).Language;
            var plot = JSON.parse(body).Plot;
            var cast = JSON.parse(body).Actors;

            console.log("───────────────────────────────────────────\n");
            console.log("Title: " + title + "\n");
            console.log("───────────────────────────────────────────\n");
            console.log("Year: " + year + "\n");
            console.log("───────────────────────────────────────────\n");
            console.log("IMDB Rating: " + ratingIMDB + "\n");
            console.log("───────────────────────────────────────────\n");
            console.log("Tomato Meter: " + ratingRotten + "\n");
            console.log("───────────────────────────────────────────\n");
            console.log("Country: " + country + "\n");
            console.log("───────────────────────────────────────────\n");
            console.log("Language: " + lang + "\n");
            console.log("───────────────────────────────────────────\n");
            console.log("Plot: " + plot + "\n");
            console.log("───────────────────────────────────────────\n");
            console.log("Cast: " + cast + "\n");
            console.log("───────────────────────────────────────────\n");
            
        }
    })
}

if(command === "spotify-this-song"){
    spotifySong();
};

if (command === "my-tweets"){
    displayTweets();
}

if (command === "movie-this"){
    movieInfo();
}