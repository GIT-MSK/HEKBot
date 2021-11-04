// Command to show all of the configs in an embed
// Need to do this another way some other time

module.exports = {
    name: 'help',
    description: 'Help command that shows all of the other commands\nFormat: !hek help',
    async execute(client, message, args) {

        // Import the filesystem module
        const fs = require("fs");

        const { MessageEmbed } = require('discord.js');

        // inside a command, event listener, etc.
        const EmbedFiles = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Help!')
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setAuthor('Marius Karlsen')
            .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fbitcoin%2Fbitcoin_PNG48.png&f=1&nofb=1')
            .setTimestamp()


        // Finds all of the name and desciption attributes within the commands files
        const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

        for (const file of command_files) {
            const command = require(`../commands/${file}`);

            EmbedFiles.addField(command.name, command.description);
        };

        // Embed.addFields({ name: filenames })

        await message.channel.send({ embeds: [EmbedFiles] });
    }
}