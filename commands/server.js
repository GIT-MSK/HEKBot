module.exports = {
  name: "server",
  description: "server test",
  async execute(client, message, args) {
    const { spawn } = require("child_process");
    const { MessageEmbed } = require("discord.js");

    // ping -i 1 -c 4 192.168.0.105

    setInterval(() => {
      const balancer = spawn("ping", ["-c 1", "192.168.131.142"]);
      const www1 = spawn("ping", ["-c 1", "192.168.131.123"]);
      const www2 = spawn("ping", ["-c 1", "192.168.132.34"]);
      const docserv = spawn("ping", ["-c 1", "192.168.130.3"]);
      const db = spawn("ping", ["-c 1", "192.168.128.166"]);

      const servers = [balancer, www1, www2, docserv, db];

      // const servers = [docserv, db];

      // const names = ["docserv", "db"];

      const names = ["Balancer", "WWW1", "WWW2", "Docker", "DB"];

      let scriptOutput = "";

      for (const server of servers) {
        server.stdout.setEncoding("utf8");
        server.stdout.on("data", async (data) => {
          // console.log(`stdout: ${data} hellohello`);
          data = data.toString();
          data;
        });

        server.stderr.on("data", async (data) => {
          console.error(`stderr: ${data}`);
          data = data.toString();
          scriptoutput += data;
        });

        server.on("close", async (code) => {
          await console.log(`child process exited with code ${code}`);

          if (code != 0) {
            await message.reply(
              `${names[servers.indexOf(server)].toString()} is DOWN!!  📉 `
            );
          } else {
            // await message.reply(
            //   `${names[servers.indexOf(server)].toString()} is up! ✅ `
            // );
          }

          // if (scriptOutput.includes("0 received")) {
          //   await message.reply(
          //     `${names[servers.indexOf(server)].toString()} is DOWN!!  📉 `
          //   );
          // }
        });
      }

      // balancer.stdout.setEncoding("utf8");
      // balancer.stdout.on("data", async (data) => {
      //   // console.log(`stdout: ${data} hellohello`);
      //   data = data.toString();
      //   scriptOutput += data;
      // });

      // balancer.stderr.on("data", async (data) => {
      //   console.error(`stderr: ${data}`);
      //   data = data.toString();
      //   scriptOutput += data;
      // });

      // balancer.on("close", async (code) => {
      //   await console.log(`child process exited with code ${code}`);

      //   await console.log(scriptOutput, "from output");

      //   if (scriptOutput.includes("0 received")) {
      //     await message.reply(scriptOutput);
      //   } else {
      //     await message.reply("Balancer is up! ✅ ");
      //   }
      // });
    }, 300000);

    await message.reply("Started listening!");
  },
};
