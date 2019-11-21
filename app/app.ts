
import Discord = require('discord.js');
const client = new Discord.Client();
import logger = require('winston');

//You need to create an auth json in the shape of { "token" : "yourToken"}
//get your token from your discord development portal.
import auth from '../auth.json';
import * as http from 'http';
import * as https from 'https';

import * as fs from 'fs';
import { Message } from 'discord.js';
import { Teams } from '../src/Teams';
import { TeamMessage } from '../src/Team';

const options = {
    hostname: 'statsapi.web.nhl.com',
    port: 443,
    path: '/api/v1/teams',
    method: 'GET'
}

//stats api url
let url = "https://statsapi.web.nhl.com/api/v1/";
let prefix = '$';
let delimeter = ' ';
let teams = new Teams();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Getting team data`);
    GetAllTeams();

});

client.on("error", (e) => {
    fs.writeFile("logs.txt", e, err => {
        if (err) console.error(err)
    });
});


client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    let args = msg.content.slice(1).trim().split(/ +/g);

    let command = args.shift();
    if (command)
        command = command.toLowerCase();
    else
        return;

    if (command === "team" && args.length > 0) {

        var id: any = args[0];
        if (!isNaN(Number(id))) {
            id = Number(id);
        }
        var message = teams.GetTeam(id);
        if (message)
            msg.channel.send(message.GetRichEmbed());
    }



});

client.login(auth.token);

function GetAllTeams() {
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
            teams.LoadJSON(obj);
        });

        req.on('error', (err) => {
            console.log('error: ' + err.message);
        });

        req.end();
    })

}
