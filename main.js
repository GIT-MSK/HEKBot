
const { Client, Collection, Intents } = require("discord.js");

const fs = require('fs');

// These should be added
const myIntents = new Intents();

// Adding permisisons to the bot as of discord.js v13
myIntents.add(
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING
);

const client = new Client({ intents: myIntents });
const prefix = '!hek ';

// Create a command collection 
client.commands = new Collection();

// Telling js where to look for the commands, and filtering them through .js
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

// Once the bot starts
client.once('ready', () => {
    console.log('HEKBot is online bby!')
});

// Reconnects
client.once("reconnecting", () => {
    console.log("Reconnecting!");
});

// disconnects
client.once("disconnect", () => {
    console.log("Disconnect!");
});


client.on('messageCreate', async message => {

    console.log(`${message.author.username}: ${message.content}`);

    // Command starts with the prefix, and the bot did not send the command
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // Command possibilities
    switch (command) {
        case 'ping':
            client.commands.get('ping').execute(message, args);
            break;
        case 'router-config':
            client.commands.get('router-config').execute(message, args);
            break;
        case 'olav':
            client.commands.get('olav').execute(message, args);
    }
});


// Finds the token before initializing
const token = fs.readFileSync('./token.txt', 'utf8', (err, data) => {

    if (err) throw err;

    return data;
});

// Has to be the last line of the file
client.login(`${token}`);

