//const request = require('request');
//let url = 'https://api.opendota.com/api/matches/5148721352?api_key=97c92ed4-e384-4425-bcb0-3894a53a4236';
//request(url, function(error, steamHttpResponse, steamHttpBody) {
    //console.log(steamHttpBody);
//})

var d2gsi = require('dota2-gsi');
var server = new d2gsi();

var clients = [];

server.events.on('newclient', function(client) {
    console.log("New client connection, IP address: " + client.ip);
    if (client.auth && client.auth.token) {
        console.log("Auth token: " + client.auth.token);
    } else {
        console.log("No Auth token");
    }
    clients.push(client);
});

function getTime(map){
    return map.clock_time;
}

setInterval(function() {
    clients.forEach(function(client, index) {
        console.log(getTime(client.gamestate.map));
        if (client.gamestate.hero && client.gamestate.hero.level) {
            console.log("Client " + index + " is level " + client.gamestate.hero.level);
        }
    });
}, 1 * 1000); // Every ten seconds