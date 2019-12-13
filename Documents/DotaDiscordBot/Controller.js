const Clock = require('./clock.js');
const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const d2gsi = require('dota2-gsi');

function printMessageToDiscord(message, filePath) {
    let defChannel = client.channels.get('[your chat channel here]');
    let voiceChannel = client.channels.get('[your voice channel here]');
    if (!voiceChannel) return console.error("The channel does not exist!");
    voiceChannel.join().then(connection => {
        //const stream = ytdl('https://www.youtube.com/watch?v=6n3pFFPSlW4', { filter: 'audioonly'});
        //const dispacther = connection.playStream(stream);
        const dispatcher = connection.play(filePath);

        dispatcher.on('error', function(error) {
            console.log(error);
            voiceChannel.leave();
        } );

        dispatcher.on('end', () => voiceChannel.leave());
    });
    defChannel.send(message);
}

let clock = new Clock(printMessageToDiscord);

client.on('message', msg => {
    if(msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.on('message', msg => {
    if (msg.content === '!Start') {
        clock.startTimer();
        msg.reply ('Dota Program Started!');
    }
});

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
    let mapInfo = client.gamestate.map;
    if (mapInfo) {
        let time = client.gamestate.map.clock_time;
        if (time) {
            console.log(time);
            if (time > 0 && (time+20) % 300 == 0) {
                printMessageToDiscord("Take Outposts!", './beastmaster_bounty.mp3');
            }
            else if (time > 0 && time <=840 && (time+20) % 120 == 0) {
                printMessageToDiscord("Grab Power Runes!", './power_overwhelming.mp3');
            }
            else if (time > 60 && (time+20) % 60 == 0) {
                printMessageToDiscord("Stack Camps!", './work_work.mp3');
            }
        }
    }
    if (client.gamestate.hero && client.gamestate.hero.level) {
        console.log("Client " + index + " is level " + client.gamestate.hero.level);
    }
});
}, 1 * 1000); // Every ten seconds










client.login('[Your bot token here]');
