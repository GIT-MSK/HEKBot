
const { Client, Collection, Intents } = require("discord.js");
const fs = require('fs');

require('dotenv').config();

// These should be added
const myIntents = new Intents();

// Adding permisisons to the bot as of discord.js v13
myIntents.add(
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS
);

const client = new Client({ intents: myIntents });


// Create a command collection 
client.commands = new Collection();
client.events = new Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Client)
})


// Finds the token before initializing
// const token = fs.readFileSync('./token.txt', 'utf8', (err, data) => {

//     if (err) throw err;

//     return data;
// });


// Has to be the last line of the file
client.login(`${process.env.TOKEN}`);

