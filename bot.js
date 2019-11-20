
const Discord = require('discord.js');
const client = new Discord.Client();
var logger = require('winston');
var auth = require('./auth.json');
const Team = require('./utils/Team.js')
const https = require('https');
const fs = require('fs');
const options = {
    hostname: 'statsapi.web.nhl.com',
    port: 443,
    path: '/api/v1/teams',
    method: 'GET'
}

let botId = "646749617517625354"; //the id of this bot
let url = "https://statsapi.web.nhl.com/api/v1/";
let prefix = '$';
let delimeter = ' ';
var beautify = require("json-beautify");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

client.on("error", (e) => {
    fs.writeFile("logs.txt", e, err => {
        if (err) console.error(err)
    });
});


client.on('message', msg => {   
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    let args = msg.content.slice(1).trim().split(/ +/g);

    let command = args.shift().toLowerCase();
    if (command === "teams") {
        GetAllTeams(msg, args);
    }

    

});

client.login(auth.token);

function SendMessage(msg, text) {
    if (text === undefined)
        return;
    msg.channel.send(text);

}

function GetAllTeams(msg, args) {
    let output = '';
    const req = https.get(options, (res) => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', (d) => {
            output += d;
        })
        res.on('end', () => {
            // let obj = JSON.parse(output);
            console.log("done");
            var obj = JSON.parse(output);
            var team = new Team(obj.teams[0]);
            
            SendMessage(msg, "```" + beautify(obj.teams[0], null, 2, 50) + "```");
        });

        req.on('error', (err) => {
            console.log('error: ' + err.message);
        });

        req.end();
    })

}

