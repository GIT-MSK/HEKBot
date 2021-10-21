// Command to show all of the configs in an embed
// Need to do this another way some other time

module.exports = {
    name: 'show-configs',
    description: 'Shows the configs in a list\nFormat: !hek show-configs',
    async execute(client, message, args) {

        // Import the filesystem module
        const fs = require("fs");

        let directory_name = "configs";

        // Function to get current filenames
        // in directory
        let filenames = await fs.readdirSync(directory_name);

        // Converts the array into a printable string
        // There's probably a cleaner solution to this
        let filenamesString = filenames.toString().replaceAll(",", "\n");

        console.log("\nFilenames in directory:");
        console.log(filenames);

        const { MessageEmbed } = require('discord.js');

        // inside a command, event listener, etc.
        const EmbedFiles = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Configs')
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley')
            .setDescription(`${filenamesString}`)
            .setThumbnail('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.5Q7b27uXNncISgogSoxLiQHaD9%26pid%3DApi&f=1')
            .setTimestamp()

        await message.channel.send({ embeds: [EmbedFiles] });
    }
}