require("dotenv").config();
const tools = require("./tools");
const reactionroles = require("./reactionroles");

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MEMBERS",
  ],
});

const fs = require("fs");

const prefix = "-";
client.command = new Discord.Collection();

tools.LoadCommands(fs, client);

//Once the bot is online
client.once("ready", () => {
  console.log("Operations Centre AI: Online!");
  tools.ready(client);
});

//When someone sends a message, this will execute
client.on("messageCreate", (message) => {
  tools.messageCommand(prefix, message, Discord, client);
});

//when a user reacts to a message
client.on("messageReactionAdd", (reaction, user) => {
  tools.messageReaction(reaction, user, client);
});
const ships = ["Star Fighter", "Cruiser", "Ship"];
client.on("guildMemberAdd", (member) => {
  sleep(100);
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
        "\n\nThere are now currently " +
        client.guilds.cache.get("651455552517570586").memberCount +
        " people on board."
    );
});

client.login(process.env.DC_TOKEN);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
