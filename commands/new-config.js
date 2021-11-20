// Creates a a new config file in the configs folder
// format: !hek new-config -filename configtext

module.exports = {
  name: "new-config",
  description:
    "Writes a new config to the config folder\nFormat: !hek new-config -filename configtext",
  async execute(client, message, args) {
    // https://discord.js.org/#/docs/main/stable/class/MessageAttachment

    const fs = require("fs");

    let newMessage = message.content.replace("!hek new-config ", "");

    if (newMessage.startsWith("-")) {
      strFirstWord = newMessage.split(" ")[0].replace("-", "");

      console.log("first word after split", strFirstWord);

      strOtherWords = newMessage
        .replace(strFirstWord + " ", "")
        .replace("-", "");

      // error checking and formatting
      if (strFirstWord.includes(".")) {
        strFirstWord = strFirstWord.replace(".txt", "").replaceAll(".", "");

        console.log(
          "first word ended with .txt or contained a .",
          strFirstWord
        );
      } else if (strOtherWords.length < 10) {
        await message.reply("The config file is too short in length");
        return;
      }

      try {
        fs.writeFileSync(`configs/${strFirstWord}.txt`, strOtherWords);
        await message.reply(`Added ${strFirstWord} to the database!`);
      } catch (e) {
        console.log("Cannot write file ", e);
      }
    } else {
      await message.reply("You need to add the -filename variable");
    }
  },
};
