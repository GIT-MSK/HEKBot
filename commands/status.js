module.exports = {
  name: "status",
  description: "Gets a graphical status of the server",
  async execute(client, message, args) {
    const { spawn } = require("child_process");
    const { MessageEmbed } = require("discord.js");

    const balancer = spawn("ping", ["-c 1", "192.168.131.142"]);
    const backup = spawn("ping", ["-c 1", "192.168.130.205"]);		
    const server1 = spawn("ping", ["-c 2", "192.168.132.227"]);
    const server2 =  spawn("ping", ["-c 2", "192.168.131.189"]); 
    const server3 =  spawn("ping", ["-c 2", "192.168.128.146"]);

    const servers = [balancer, backup, server1, server2, server3];
    

    const EmbedFiles = new MessageEmbed()
      .setColor("#b98f01")
      .setTitle("Status!")
      .setThumbnail("attachment://dipcoin.png")
      .setTimestamp();

    // const servers = [docserv, db];

    // const names = ["docserv", "db"];

    const names = ["balancer", "backup", "server1", "server2", "server3"];

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
