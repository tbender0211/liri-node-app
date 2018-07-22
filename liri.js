require("dotenv").config();

var keys = require("./keys.js");
var Spotify =  require("node-spotify-api");
var Twitter = require("twitter");
var request = require("request");
var fs = require("fs");

var movieKey = "http://www.omdbapi.com/?i=tt3896198&apikey=7bc4c9f6";


if (command === "do-what-it-says"){

    fs.readFile("random.txt", "utf8", function(error,data){

        if (error) {

            return console.log(error);

        }

        var nodeArgs = data.split(",").join(" ");
        return nodeArgs;
        spotifySong();

    })
}
var nodeArgs = process.argv;
var command = nodeArgs[2];
var divider = "\n\n───────────────────────────────────────────";

var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotifyKeys);

var searchTerms = process.argv.slice(3).join(" ");


console.log(client);
console.log(spotify);

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

      fs.appendFile("log.txt", output, function(err){
          if(err) throw err;
      })

    });
}

function spotifySong(searchTerms) {

    spotify.search({type: "track", query: searchTerms, limit: "10"}, function(error,data){
    
        if ( error ) {
            console.log('Error occurred: ' + error);
            return;
        }
        //console.log(data);

        for (var i = 0; i < 3; i++) {

            var songResponse = data.tracks.items[i];

            var artist = songResponse.artists[0].name;
            var songName = songResponse.name;
            var link = songResponse.album.href;
            var album = songResponse.album.name;

            var songData = [
                "Artist: " + artist,
                "Song: " + songName,
                "Album " + album,
                "Link: " + link,
            ].join("\n\n");
        }

          console.log(divider + songData);

            fs.appendFile("log.txt", divider + songData, function(error){
                
                if (error){

                    console.log(error);

                };

            })

        
          if (error){

            console.log(error);
        };

    })
}

function movieInfo(){
    
    var queryUrl = "http://www.omdbapi.com/?t=" + searchTerms + "&y=&plot=short&apikey=7bc4c9f6";

    // console.log(queryUrl);

    request(queryUrl, function(error, response, body) {
        
        if(!error && response.statusCode === 200){

            var jsonData = JSON.parse(body);

            var title = jsonData.Title;
            var year = jsonData.Year;
            var ratingIMDB = jsonData.imdbRating;
            var ratingRotten = jsonData.tomatoMeter;
            var country = jsonData.Country;
            var lang = jsonData.Language;
            var plot = jsonData.Plot;
            var cast = jsonData.Actors;

            var movieData = [
                "\nTitle: " + title,
                "Year: " + year,
                "IMDB Rating: " + ratingIMDB,
                "Tomato Meter: " + ratingRotten,
                "Country: " + country,
                "Language: " + lang,
                "Plot: " + plot,
                "Cast: " + cast,
            ].join("\n\n");

            fs.appendFile("log.txt", divider + movieData, function(error){
                if (error) throw error;
            })

            console.log(divider + movieData);
            
        }
    })
}

function backstreetsBack(){

    fs.readFile('random.txt', "utf8", function(error, data){

      var random = data.split(',');
  
      spotifySong(random[1]);

    });

}

if (command === "do-what-it-says"){

   backstreetsBack();
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
