const ticket = require("./ticket");
require("dotenv").config();
module.exports = {
  LoadCommands: function (fs, client) {
    const commandFiles = fs
      .readdirSync("./commands/")
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      client.command.set(command.name, command);
    }
  },

  ready: function (client) {
    //Caches message for the ticketing system
    client.channels.cache
      .get(process.env.DC_TICKETS_CHANNEL)
      .messages.fetch(process.env.DC_TICKETS_MESSAGE);
  },

  messageCommand: function (prefix, message, Discord, client) {
    //if this crashes, then the command does not exist
    try {
      //if message is from the bot and doesn't start wit the prefix, then ignore it
      if (!message.content.startsWith(prefix) || message.author.bot) return;

      //get command and arguments
      const args = message.content.slice(prefix.length).split(" ");
      const command = args.shift().toLowerCase();

      //execute command and pass in needed information
      client.command.get(command).execute(message, args, Discord, client);
    } catch (error) {
      message.channel.send(
        "This command was not recognised. Please try again!"
      );
    }
  },

  messageReaction: function (reaction, user, client) {
    //ignore reactions from the bot
    if (user.bot) return;

    //checks if the reaction is on the ticket message
    if (reaction.message.id == process.env.DC_TICKETS_MESSAGE) {
      reaction.users.remove(user.id);
      ticket.CreateTicket(reaction, user, client);
    }
  },
};
