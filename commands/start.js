module.exports = {
  name: "start",
  description: "Enables server automation and status checking",
  async execute(client, message, args) {
    const { spawn } = require("child_process");
    const { MessageEmbed } = require("discord.js");

    // ping -i 1 -c 4 192.168.0.105

    setInterval(() => {
      const balancer = spawn("ping", ["-c 2", "192.168.131.142"]);
      const www1 = spawn("ping", ["-c 2", "192.168.131.123"]);
      const www2 = spawn("ping", ["-c 2", "192.168.132.34"]);
      const docserv = spawn("ping", ["-c 2", "192.168.130.3"]);
      const db = spawn("ping", ["-c 2", "192.168.128.166"]);
      const test = spawn("ping", ["-c 2", "192.168.128.44"]);
      const backup = spawn("ping", ["-c 2", "192.168.130.205"])


      const servers = [balancer, www1, www2, docserv, db, test, backup];
      const names = ["balancer", "www1", "www2", "docServ", "db1", "test", "backup"];

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
              try {
                await message.channel.send("Trying to start server: " + names[servers.indexOf(server)]);
                const starter = spawn("openstack", ["server start", `${names[servers.indexOf(server)]}`]);
		
		starter.stderr.on('data', async (data) => {
			await console.error("STDERR:", data.toString());
		});
		starter.stdout.on('data', async (data) => {
			await console.log("STDOUT:", data.toString());
		});
		starter.on('exit', async (exitCode) => {
			await console.log("Child exited with code: " + exitCode);
		});

	      }catch (e) {
                await message.channel.send(e);
              }
          } 
        });
      }
       // 5 min
    }, 300000);

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
