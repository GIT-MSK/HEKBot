// Ping command to check that the bot is responding

module.exports = {
    name: 'ping',
    description: "this is a ping command",
    async execute(client, message, args) {

        // message.channel.send('pong!')
        await message.reply(`pong!`);

    }
}