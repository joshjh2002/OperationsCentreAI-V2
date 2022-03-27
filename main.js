require("dotenv").config();
const tools = require("./tools");

const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"],
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

client.login(process.env.DC_TOKEN);
