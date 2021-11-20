module.exports = (Client, client, message) => {
  const prefix = "!hek ";

  console.log(`${message.author.username}: ${message.content}`);

  // Command starts with the prefix, and the bot did not send the command
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);

  if (command) command.execute(client, message, args, Client);

  // Command possibilities
  // switch (command) {
  //     case 'ping':
  //         client.commands.get('ping').execute(message, args);
  //         break;
  //     case 'router-config':
  //         client.commands.get('router-config').execute(message, args);
  //         break;
  //     case 'olav':
  //         client.commands.get('olav').execute(message, args);
  // }
};
