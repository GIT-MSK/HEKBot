// yes

module.exports = {
    name: 'olav',
    description: 'Olav',
    async execute(client, message, args) {

        await message.channel.send(
            "`Hasjverdi`"
        ).catch(console.error)
    }
}