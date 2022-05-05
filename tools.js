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
    try {
      if (interaction.customId == "conan-button") {
        this.conan_button(interaction, client);
      } else if (interaction.customId == "rust-button") {
        this.rust_button(interaction, client);
      } else if (interaction.customId == "farming-button") {
        this.farming_button(interaction, client);
      } else if (interaction.customId == "rules-button") {
        try {
          interaction.member.roles.add("672053262261813248");
          interaction.reply({
            content:
              "Thank you for agreeing to the rules! You now have access to the rest of the server!\n\n" +
              "You can go to the <#721368768093356094> channel to gain access to the role-specific channels!",
            ephemeral: true,
          });
        } catch (err) {
          console.log(
            "Something went wrong giving the user the members role\n\n" + err
          );
        }
      }
    } catch (err) {
      console.log("Something went when handling the buttons\n\n" + err);
    }
  },

  conan_button: function (interaction, client) {
    try {
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

        let messages = [
          "Welcome to Operation Exiles! We hope you enjoy your stay!",
          "Hello! It's great to have you here!",
        ];
        let rnd = Math.floor(Math.random() * messages.length);

        const embed = {
          description:
            messages[rnd] +
            "\nYou can use `/conan` to get a link that will automatically connect you to the server.",
          color: 16749824,
          thumbnail: {
            url: "https://operationscentre.github.io/community/img/conan-logo.png",
          },
          author: {
            name: "JackalTaco",
            icon_url:
              "https://cdn.discordapp.com/avatars/228605814716366850/8dd6dba87edbe1ffd63c8b7ca0a8e874.png",
          },
        };

        client.channels.cache.get("887374977219821588").send({
          content: "<@" + interaction.member.user.id + ">",
          embeds: [embed],
        });
      }
    } catch (err) {
      console.log("Something went wrong sending the interaction\n\n" + err);
    }
  },

  rust_button: function (interaction, client) {
    try {
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

        let messages = [
          "Welcome to Rusty Operations! We hope you enjoy your stay!",
          "Hello! It's great to have you here!",
        ];
        let rnd = Math.floor(Math.random() * messages.length);

        const embed = {
          description:
            messages[rnd] +
            "\nYou can use `/rust` to get a link that will automatically connect you to the server.",
          color: 16749824,
          thumbnail: {
            url: "https://operationscentre.github.io/community/img/rust-logo.jpg",
          },
          author: {
            name: "Terpene Boy",
            icon_url:
              "https://cdn.discordapp.com/avatars/697595109415583756/b945b92f47ee1ab19543ce25f40ecb20.png",
          },
        };

        client.channels.cache.get("947813530407682068").send({
          content: "<@" + interaction.member.user.id + ">",
          embeds: [embed],
        });
      }
    } catch (err) {
      console.log("Something went wrong sending the interaction\n\n" + err);
    }
  },

  farming_button: function (interaction, client) {
    try {
      if (interaction.member.roles.cache.has("967142420619862056")) {
        interaction.reply({
          content:
            "You no longer have the Farming role. We're sorry to see you go.",
          ephemeral: true,
        });
        interaction.member.roles.remove("967142420619862056");
        client.channels.cache
          .get("967142992764874772")
          .send(
            "<@" +
              interaction.member.user.id +
              "> has removed the Farming role."
          );
      } else {
        interaction.reply({
          content: "You have been given the Farming role.",
          ephemeral: true,
        });
        interaction.member.roles.add("967142420619862056");
        client.channels.cache
          .get("967142992764874772")
          .send(
            "<@" + interaction.member.user.id + "> has got the Farming role."
          );

        let messages = [
          "Welcome to Farming Operations! We hope you enjoy your stay!",
          "Hello! It's great to have you here!",
        ];
        let rnd = Math.floor(Math.random() * messages.length);

        const embed = {
          description:
            messages[rnd] +
            "\nGo to <#967144306777419876> to get the information to join the server.",
          color: 16749824,
          author: {
            name: "Alan",
            icon_url:
              "https://cdn.discordapp.com/avatars/456943422717165579/ef4f25cbc19971e9862efd04f5daa299.png?size=1024",
          },
        };

        client.channels.cache.get("967143916249964564").send({
          content: "<@" + interaction.member.user.id + ">",
          embeds: [embed],
        });
      }
    } catch (err) {
      console.log("Something went wrong sending the interaction\n\n" + err);
    }
  },

  sendLink: async function (interaction, client, channel, link, type) {
    try {
      const user = await client.users.cache.get(
        interaction.member.user.id.toString()
      );
      user.send({
        content: link,
      });

      interaction.reply({
        content: "The link has been sent you. Check your DMs!",
        ephemeral: true,
      });

      client.channels.cache
        .get(channel)
        .send(
          "<@" +
            interaction.member.user.id +
            "> has requested the server " +
            type +
            " link."
        );
    } catch (err) {
      console.log("Something went wrong sending the link\n\n" + err);
    }
  },

  manageMessages: function (prefix, message, client) {
    if (
      message.author.id == 362647384502697984 &&
      message.channel.id == 947890245398044723
    ) {
      if (
        message.content.includes(
          "Server is back online! Players may now re-join."
        )
      ) {
        client.channels.cache
          .get(message.channel.id)
          .setName("🟢│rust-server-status");
        console.log("Rust Server Online");
      } else if (message.content.includes("Server shutting down.")) {
        let result = client.channels.cache
          .get(message.channel.id)
          .setName("🔴│rust-server-status");
        console.log(result + "\nRust Server Offline");
      }
    }
  },
};
