module.exports = {
  name: "server",
  description: "Enables server automation and status checking",
  async execute(client, message, args) {
    const { spawn } = require("child_process");
    const { MessageEmbed } = require("discord.js");

    // ping -i 1 -c 4 192.168.0.105

    // Keeping track if the floating ip is set to the balancer or not.
    let ipBalancer = true;

    setInterval(() => {
      const balancer = spawn("ping", ["-c 1", "192.168.131.142"]);
      const www1 = spawn("ping", ["-c 1", "192.168.131.123"]);
      const www2 = spawn("ping", ["-c 1", "192.168.132.34"]);
      const docserv = spawn("ping", ["-c 1", "192.168.130.3"]);
      const db = spawn("ping", ["-c 1", "192.168.128.166"]);
      const test = spawn("ping", ["-c 1", "192.168.128.44"]);

      const servers = [balancer, www1, www2, docserv, db, test];
      const names = ["Balancer", "WWW1", "WWW2", "Docker", "DB", "Test"];

      let scriptOutput = "";

      // Looping through the servers and checking status
      for (const server of servers) {
        // Normal
        server.stdout.setEncoding("utf8");
        server.stdout.on("data", async (data) => {
          data = data.toString();
          data;
        });
        //error
        server.stderr.on("data", async (data) => {
          console.error(`stderr: ${data}`);
          data = data.toString();
          // scriptoutput += data;
        });

        // Exit child
        server.on("close", async (code) => {
          await console.log(`child process exited with code ${code}`);

          // if error
          if (code != 0) {
            // if the balancer is down, try to switch to the emergency temp server
            if (
              names[servers.indexOf(server)].toString() == "Balancer" &&
              ipBalancer == true
            ) {
              try {
                await message.channel.send("Trying to switch test...");
                await spawn("downtime");
                await message.channel.send("Switched to test!");
                ipBalancer = false;
              } catch (e) {
                await message.channel.send(e);
              }
            }

            await message.reply(
              `${names[servers.indexOf(server)].toString()} is DOWN!!  📉 `
            );
          } else if (
            ipBalancer == false &&
            names[servers.indexOf(server)].toString() == "Balancer"
          ) {
            try {
              await message.channel.send(
                "Trying to switch back to Balancer..."
              );
              await spawn("downtimeFix");
              ipBalancer = true;
              await message.channel.send("Switched back to balancer!");
            } catch (e) {
              await message.channel.send(e);
            }
          }
        });
      }
    }, 1800000);

    await message.reply("Started listening!");
  },
};

// Template

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
