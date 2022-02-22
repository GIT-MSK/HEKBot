module.exports = {
  name: "server",
  description: "Enables server automation and status checking",
  async execute(client, message, args) {
    const { spawn } = require("child_process");
    const { MessageEmbed } = require("discord.js");

    // ping -i 1 -c 4 192.168.0.105

    // Keeping track if the floating ip is set to the balancer or not.
    let ipBalancer = true;
    let ipDatabase = true;

    setInterval(() => {
      const balancer = spawn("ping", ["-c 2", "192.168.131.142"]);
      const www1 = spawn("ping", ["-c 2", "192.168.131.123"]);
      const www2 = spawn("ping", ["-c 2", "192.168.132.34"]);
      const docserv = spawn("ping", ["-c 2", "192.168.130.3"]);
      const db = spawn("ping", ["-c 2", "192.168.128.166"]);
      const test = spawn("ping", ["-c 2", "192.168.128.44"]);

      const servers = [balancer, www1, www2, docserv, db, test];
      const names = ["Balancer", "WWW1", "WWW2", "Docker", "DB", "Test"];

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
            // if the balancer or database is down, try to switch to the emergency temp server
            if (
              (names[servers.indexOf(server)].toString() == "Balancer" ||
                names[servers.indexOf(server)].toString() == "DB") &&
              ipBalancer == true &&
              ipDatabase == true
            ) {
              try {
                await message.channel.send("Trying to switch to test...");
                await spawn("downtime");
                await message.channel.send("Switched to test!");

                if (names[servers.indexOf(server)].toString() == "Balancer") {
                  ipBalancer = false;
                } else if (names[servers.indexOf(server)].toString() == "DB") {
                  ipDatabase = false;
                }
              } catch (e) {
                await message.channel.send(e);
              }
            }

            await message.reply(
              `${names[servers.indexOf(server)].toString()} is DOWN!!  📉 `
            );
            // Balancer had been down, and is now up
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
            // DB had been down, and is now up
          } else if (
            ipDatabase == false &&
            names[servers.indexOf(server)].toString() == "DB"
          ) {
            try {
              await message.channel.send(
                "DB: Trying to switch back to Balancer..."
              );
              await spawn("downtimeFix");
              ipDatabase = true;
              await message.channel.send("Switched back to balancer!");
            } catch (e) {
              await message.channel.send(e);
            }
          }
        });
      }
    }, 1200000);

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
