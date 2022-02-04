module.exports = {
  name: "status",
  description: "server test",
  async execute(client, message, args) {
    const { spawn } = require("child_process");
    const { MessageEmbed } = require("discord.js");

    // ping -i 1 -c 4 192.168.0.105

    const balancer = spawn("ping", ["-c 1", "192.168.131.142"]);
    const www1 = spawn("ping", ["-c 1", "192.168.131.123"]);
    const www2 = spawn("ping", ["-c 1", "192.168.132.34"]);
    const docserv = spawn("ping", ["-c 1", "192.168.130.3"]);
    const db = spawn("ping", ["-c 1", "192.168.128.166"]);

    const servers = [balancer, www1, www2, docserv, db];

    const EmbedFiles = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Status!")
      .setThumbnail(
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpngimg.com%2Fuploads%2Fbitcoin%2Fbitcoin_PNG48.png&f=1&nofb=1"
      )
      .setTimestamp();

    // const servers = [docserv, db];

    // const names = ["docserv", "db"];

    const names = ["balancer", "WWW1", "WWW2", "docserv", "db"];

    let scriptOutput = "";

    const serverCounter = servers.length;

    let count = 0;

    for (const server of servers) {
      server.stdout.setEncoding("utf8");
      server.stdout.on("data", (data) => {
        // console.log(`stdout: ${data} hellohello`);
        data = data.toString();
        data;
      });

      server.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
        data = data.toString();
        scriptoutput += data;
      });

      server.on("close", async (code) => {
        count++;

        console.log(`child process exited with code ${code}`);

        console.log(count, "count");
        console.log(serverCounter, "ServerCounter");

        if (code == 1) {
          EmbedFiles.addField(
            `${names[servers.indexOf(server)].toString()} 📉 `,
            "DOWN!"
          );
        } else {
          EmbedFiles.addField(
            `${names[servers.indexOf(server)].toString()} ✅ `,
            "UP!"
          );
        }

        if (count == serverCounter) {
          await message.channel.send({ embeds: [EmbedFiles] });
        }

        // if (scriptOutput.includes("0 received")) {
        //   await message.reply(
        //     `${names[servers.indexOf(server)].toString()} is DOWN!!  📉 `
        //   );
        // }
      });
    }

    await message.reply("Getting Status!");
  },
};
