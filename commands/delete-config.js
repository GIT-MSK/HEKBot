// Gets a spesific config and deletes the file from the configs directory
// Format: !hek get-config -configName.txt

module.exports = {
    name: 'delete-config',
    description: 'Deletes a spesific config\nFormat: !hek delete-config -configName.txt',
    async execute(client, message, args) {

        // Import the filesystem module
        const fs = require("fs");

        let directory_name = "configs";

        // Function to get current filenames in a directory
        let filenames = await fs.readdirSync(directory_name);

        // Finds the content of the command
        let newMessage = message.content.replace('!hek delete-config ', '');

        if (newMessage.startsWith('-')) {
            let strFirstWord = newMessage.split(' ')[0].replace('-', '');

            // Dynamically finds the spesific file in the filenames array
            let file = filenames[filenames.indexOf(strFirstWord)];

            if (typeof file !== 'undefined' && file !== '') {
                try {
                    //removes spesific file from the configs folder.
                    fs.rmSync(`configs/${file}`);
                    message.channel.send(`Deleted ${file} from the database!`);
                } catch (e) {
                    console.error(e, 'from catch rmSync')
                }
            } else {
                await message.reply(`Could not find config; ${strFirstWord} in the database`);
            }
        } else {
            await message.reply('You need to use the format: !hek delete-config -config-name');
        }
    }
}