module.exports = {
  name: "olav",
  description: "yes",
  async execute(client, message, args) {
    const { MessageEmbed } = require("discord.js");

    // inside a command, event listener, etc.
    const EmbedOlav = new MessageEmbed()
      .setColor("#85AB03")
      .setTitle("Olav")
      .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
      .setDescription("Hasjverdi")
      .setThumbnail("attachment://OlavDenHellige.png")
      .setTimestamp();

    // To send a local image with an embed, you need to attach it like this.
    await message.channel.send({
      embeds: [EmbedOlav],
      files: [
        {
          attachment: "img/OlavDenHellige.png",
          name: "OlavDenHellige.png",
        },
      ],
    });
  },
};
