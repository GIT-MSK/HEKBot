// Gets a spesific config and displays the file from the configs directory
// Format: !hek get-config -configName.txt

module.exports = {
    name: 'get-config',
    description: 'Gets a spesific config\nFormat: !hek get-config -configName.txt',
    async execute(client, message, args) {

        // Import the filesystem module
        const fs = require("fs");

        let directory_name = "configs";

        // Function to get current filenames in a directory
        let filenames = await fs.readdirSync(directory_name);

        // Finds the content of the command
        let newMessage = message.content.replace('!hek get-config ', '');

        if (newMessage.startsWith('-')) {
            let strFirstWord = newMessage.split(' ')[0].replace('-', '');

            console.log("\nFilenames in directory:");
            console.log(filenames);

            // Dynamically finds the spesific file in the filenames array
            let file = filenames[filenames.indexOf(strFirstWord)];

            if (typeof file !== 'undefined' && file !== '') {
                await message.channel.send({
                    files: [{
                        attachment: `configs/${strFirstWord}`,
                        name: `${strFirstWord}`
                    }]
                }).catch(console.error);
                console.log(file);
            } else {
                await message.reply(`Could not find config; ${strFirstWord} in the database\nTry the show-configs command`);
            }
        } else {
            await message.reply('You need to use the format: !hek get-config -config-name');
        }
    }
}