
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


client.once('ready', () => {
    console.log('HEKBot is online bby!')
});


client.on('messageCreate', message => {

    console.log(message.content);

    // Command starts with the prefix, and the bot did not send the command
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    switch (command) {
        case 'ping':
            client.commands.get('ping').execute(message, args);
            break;
        case 'router-config':
            client.commands.get('router-config').execute(message, args);
            break;
    }

    // if (command === 'ping') {
    //     client.commands.get('ping').execute(message, args)
    // }
});






// Has to be the last line of the file
client.login('OTAwMDUzNjk0MTEwOTIwNzc1.YW7uUg.FbB6s6fk5bAbNsPMZHJe05tFSbs');

