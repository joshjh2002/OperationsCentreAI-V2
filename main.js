require("dotenv").config();
const tools = require("./tools");

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const { Intents, Client, Collection } = require("discord.js");
const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MEMBERS",
  ],
});

const fs = require("fs");
const ticket = require("./ticket");

const prefix = "-";
client.commands = new Collection();
let commands = tools.LoadCommands(fs, client);

const DELETE = false;
if (DELETE) {
  const rest = new REST({ version: "9" }).setToken(process.env.DC_TOKEN);
  rest
    .get(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.DC_GUILD_ID
      )
    )
    .then((data) => {
      const promises = [];
      for (const command of data) {
        const deleteUrl = `${Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.DC_GUILD_ID
        )}/${command.id}`;
        promises.push(rest.delete(deleteUrl));
      }
      return Promise.all(promises);
    });
}

//Once the bot is online
client.once("ready", () => {
  console.log("Operations Centre AI: Online!");
  tools.ready(client);

  const CLIENT_ID = client.user.id;

  const rest = new REST({
    version: "9",
  }).setToken(process.env.DC_TOKEN);

  (async () => {
    try {
      if (process.env.ENV === "production") {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands,
        });
        console.log("Commands Registered Globally");
      } else {
        await rest.put(
          Routes.applicationGuildCommands(CLIENT_ID, process.env.DC_GUILD_ID),
          {
            body: commands,
          }
        );
        console.log("Commands Registered Locally");
      }
    } catch (err) {
      console.error(err);
    }
  })();
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    try {
      tools.buttonHandler(interaction, client);
    } catch (err) {
      console.log(err);
    }
  }

  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);

    try {
      await command.execute(interaction, client);
    } catch (err) {
      interaction.reply({
        content: "An error occurred using this command",
        ephemeral: true,
      });
      console.error(err);
    }
  }
});

//When someone sends a message, this will execute
client.on("messageCreate", (message) => {
  //tools.messageCommand(prefix, message, Discord, client);
  ticket.logMessage(message, client);
});

//when a user reacts to a message
client.on("messageReactionAdd", (reaction, user) => {
  tools.messageReaction(reaction, user, client);
});

const ships = ["Star Fighter", "Cruiser", "Ship"];
client.on("guildMemberAdd", async (member) => {
  await sleep(500);
  let num = Math.floor(Math.random() * 30) + 1;
  let rnd = Math.floor(Math.random() * ships.length);

  client.channels.cache
    .get(process.env.DC_WELCOME_CHANNEL)
    .send(
      "<@" +
        member.id +
        "> has landed their " +
        ships[rnd] +
        " in the Operations Centre air bay " +
        num +
        ".\n\nThere are now currently " +
        client.guilds.cache.get("651455552517570586").memberCount +
        " people on board."
    );
});

client.login(process.env.DC_TOKEN);

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
