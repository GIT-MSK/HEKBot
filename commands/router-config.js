module.exports = {
    name: 'router-config',
    description: "this is the basic router config",
    execute(message, args) {

        message.channel.send(
            "`enable conf t\nline console 0\npassword cisco\nlogin exit\n`"
        );
    }
}