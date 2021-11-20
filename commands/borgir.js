// Ping command to check that the bot is responding

module.exports = {
  name: "borgir",
  description: "This is a ping command",

  async execute(client, message, args) {
    const {
      joinVoiceChannel,
      createAudioResource,
    } = require("@discordjs/voice");
    const { createAudioPlayer } = require("@discordjs/voice");

    // const search = require("");

    // Check if someone is in a voice channel
    // Might be a cleaner way to do this
    let user = await message.member.fetch();
    let channel = await user.voice.channel;

    if (channel) {
      const connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.channel.guild.id,
        adapterCreator: message.channel.guild.voiceAdapterCreator,
      });

      //   console.log(message.member.voice.id);
      //   console.log(message.channel.guild.id);

      //   console.log(connection);

      //   const { generateDependencyReport } = require("@discordjs/voice");

      //   console.log(generateDependencyReport());

      const player = createAudioPlayer();

      const resrouce = createAudioResource(
        "/home/msk/Documents/HekBot/HEKBot/sounds/burgir.mp3",
        {
          metadata: {
            title: "A test song",
          },
        }
      );

      player.play(resrouce);
      connection.subscribe(player);
    } else {
      await message.channel.send("User must be in a voice channel!");
    }
  },
};
