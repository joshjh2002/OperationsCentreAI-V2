const ticket = require("./ticket");
require("dotenv").config();
module.exports = {
  LoadCommands: function (fs, client) {
    const commandFiles = fs
      .readdirSync("./commands/")
      .filter((file) => file.endsWith(".js"));

    let commands = [];
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      commands.push(command.data.toJSON());
      client.commands.set(command.data.name, command);
    }
    return commands;
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
      client.commands.get(command).execute(message, args, Discord, client);
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

  buttonHandler: function (interaction, client) {
    if (interaction.customId == "conan-button") {
      if (interaction.member.roles.cache.has("884739374284152863")) {
        interaction.reply({
          content:
            "You no longer have the Conan role. We're sorry to see you go.",
          ephemeral: true,
        });
        interaction.member.roles.remove("884739374284152863");
        client.channels.cache
          .get("887374258576162816")
          .send(
            "<@" + interaction.member.user.id + "> has removed the Conan role."
          );
      } else {
        interaction.reply({
          content: "You have been given the Conan role.",
          ephemeral: true,
        });
        interaction.member.roles.add("884739374284152863");
        client.channels.cache
          .get("887374258576162816")
          .send(
            "<@" + interaction.member.user.id + "> has got the Conan role."
          );
      }
    } else if (interaction.customId == "rust-button") {
      if (interaction.member.roles.cache.has("870978829974384660")) {
        interaction.reply({
          content:
            "You no longer have the Rust role. We're sorry to see you go.",
          ephemeral: true,
        });
        interaction.member.roles.remove("870978829974384660");
        client.channels.cache
          .get("947811153092964382")
          .send(
            "<@" + interaction.member.user.id + "> has removed the Rust role."
          );
      } else {
        interaction.reply({
          content: "You have been given the Rust role.",
          ephemeral: true,
        });
        interaction.member.roles.add("870978829974384660");
        client.channels.cache
          .get("947811153092964382")
          .send("<@" + interaction.member.user.id + "> has got the Rust role.");
      }
    }
  },
};
