module.exports = {
    name: 'router-config',
    description: "this is the basic router config",
    async execute(client, message, args) {

        // https://discord.js.org/#/docs/main/stable/class/MessageAttachment

        console.log(message);

        await message.channel.send({
            files: [{
                attachment: 'configs/router-config.txt',
                name: 'router-config.txt'
            }]
        }).then(msg => {
            console.log(msg.description)
        }).catch(console.error)
        // await message.channel.send(file)
        // "`enable conf t\nline console 0\npassword cisco\nlogin exit\n`");
    }
}
