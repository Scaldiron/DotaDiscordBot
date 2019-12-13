class GameState {

constructor(printMessageToDiscord)
{
    this.printMessageToDiscord = printMessageToDiscord;
};


 startGsi() {
        let d2gsi = require('dota2-gsi');
        let server = new d2gsi();

        let clients = [];

        server.events.on('newclient', function(client) {
        console.log("New client connection, IP address: " + client.ip);
        if (client.auth && client.auth.token) {
            console.log("Auth token: " + client.auth.token);
        } else {
            console.log("No Auth token");
        }
        clients.push(client);
        });
        
        setInterval(function() {
        clients.forEach(function(client, index) {

            let time = client.gamestate.map.clock_time;
            if (time) {
                if (time > 0 && time <=840 && (time+20) % 120 == 0) {
                    this.printMessageToDiscord("Grab Power Runes!");
                }

                if (time > 0 && (time+20) % 300 == 0) {
                    this.printMessageToDiscord("Take Outposts!");
                }
            }
            if (client.gamestate.hero && client.gamestate.hero.level) {
                console.log("Client " + index + " is level " + client.gamestate.hero.level);
            }
        });
        }, 1 * 1000); // Every ten seconds


    }
};

module.exports = GameState;