module.exports = {
  name: "status",
  description: "Gets a graphical status of the server",
  async execute(client, message, args) {
    const { spawn } = require("child_process");
    const { MessageEmbed } = require("discord.js");

    const balancer = spawn("ping", ["-c 1", "192.168.131.142"]);
    const www1 = spawn("ping", ["-c 1", "192.168.131.123"]);
    const www2 = spawn("ping", ["-c 1", "192.168.132.34"]);
    const docserv = spawn("ping", ["-c 1", "192.168.130.3"]);
    const db = spawn("ping", ["-c 1", "192.168.128.166"]);
    const test = spawn("ping", ["-c 1", "192.168.128.44"]);

    const servers = [balancer, www1, www2, docserv, db, test];

    const EmbedFiles = new MessageEmbed()
      .setColor("#b98f01")
      .setTitle("Status!")
      .setThumbnail("attachment://dipcoin.png")
      .setTimestamp();

    // const servers = [docserv, db];

    // const names = ["docserv", "db"];

    const names = ["Balancer", "WWW1", "WWW2", "Docker", "DB", "Test"];

    let field = "";

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
        // scriptoutput += data;
      });

      server.on("close", async (code) => {
        count++;

        console.log(`child process exited with code ${code}`);

        // code = exit code

        if (code == 1) {
          field += `${names[servers.indexOf(server)].toString()}  📉 \n`;

          // EmbedFiles.addField(
          //   `${names[servers.indexOf(server)].toString()} 📉 `,
          //   "DOWN!"
          // );
        } else {
          field += `${names[servers.indexOf(server)].toString()}  ✅ \n`;
          // EmbedFiles.addField(
          //   `${names[servers.indexOf(server)].toString()} ✅ `,
          //   "UP!"
          // );
        }

        if (count == serverCounter) {
          EmbedFiles.addField("Servers", `${field} `);
          await message.channel.send({
            embeds: [EmbedFiles],
            files: [
              {
                attachment: "img/dipcoin.png",
                name: "dipcoin.png",
              },
            ],
          });
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
