module.exports = {
  conan_embed: {
    title: "Operation Exiles",
    description:
      "Our Conan server offers a casual PvE experience on the Exiled Lands map with 2x harvest rate and a few quality-of-life mods. The server is hosted in East US but is also suitable for players in the EU!",
    color: 16731689,
    image: {
      url: "https://operationscentre.github.io/community/img/conan-banner1.jpg",
    },
    fields: [
      {
        name: "Connection Info:",
        value:
          "  •   Server Name: Operation Exiles - PvE - 2x - Casual RP - Modded \n  •   Server IP: 176.57.165.12:29100",
      },
      {
        name: "Admins:",
        value:
          "Our __admins are available on the Discord__ to help with any important issues, however, we trust the community to be as __mature and patient as possible__ when the admins are not available in-game. __Please respect this__. Do not call admins for silly issues and respect that they may be busy, so please do not demand things or complain if they cannot be there right away.",
      },
      {
        name: "Rules:",
        value:
          " •   NO displaying inappropriate or discriminatory language, usernames or pictures!\n •   NO stealing other people’s belongings! (Even in a public place)\n •   NO blocking passageways or entrances to important areas within the Exiled Lands! (or block important NPC spawns)\n •   You must ask permission before building directly beside another player!\n•   NO more than 2 separate builds! (without permission)\n •   NO exploitation, cheating or hacking!\n •   MASSIVE builds the size of an entire city are prohibited unless you get permission from an admin!\n •   Thralls and Thespians should not be left in AI towns like Sepermeru!\n •   Obey the guild rules and city laws which are displayed in-game!\n •   All player trades must be completed with the agreed upon terms for all parties!",
      },
      {
        name: "Server Mods:",
        value:
          "Find the Steam collection [here!](https://steamcommunity.com/sharedfiles/filedetails/?id=2616177527)",
      },
      {
        name: "Vote For Our Server:",
        value:
          "Every 24-hours you can vote for our server [here](https://conan-exiles.com/server/89716/)! You can also use `/conan vote` to have the link sent to your DMs.",
      },
      {
        name: "Shortcut:",
        value:
          "You can get a join link to the server by typing `/conan` into any chat. <@813799178689708104> will DM you the link!",
      },
    ],
  },

  rust_embed: {
    title: "Rusty Operations",
    description:
      "Our server brings a premium experience, offering a mixture of rebalanced gameplay, premium plugins and new maps. For US and UK/EU players!",
    color: 16749824,
    image: {
      url: "https://media.discordapp.net/attachments/742826117395775589/918252341587742730/RusticOperationsThemedHD.png",
    },
    fields: [
      {
        name: "Connection Info:",
        value:
          "  •   Server Name: Rusty Operations - 3x | 1/2 Decay | (Shop|Events|Loot+|Clans) \n  •   Server IP: 199.127.61.3:28255",
      },
      {
        name: "Wipe Info:",
        value:
          "Our server does a __map and blueprint__ wipe on the __first Thursday of every month__ so as to stay on schedule with the Rust monthly updates.",
      },
      {
        name: "Admins:",
        value:
          "Our admins are there to help with __important issues__ on the server and are __as active as they can be__, please respect this. __Do not call admins for silly issues__ and respect that they __may be busy__, so please __do not demand things or complain__ if they cannot be there right away.",
      },
      {
        name: "Vote For Our Server:",
        value:
          "Every 24-hours you can vote for our server here to claim rewards in-game. Click [here](https://rust-servers.net/server/166243/). You can also use `/rust vote` to have the link sent to your DMs.",
      },
      {
        name: "Shortcut:",
        value:
          "You can get a join link to the server by typing `/rust` into any chat. <@813799178689708104> will DM you the link!",
      },
    ],
  },

  report_embed: {
    title: "Create a Support Ticket",
    description:
      "React with the relevant emoji to create a ticket and get in contact with the appropriate team!",
    color: 12743972,
    fields: [
      {
        name: process.env.DISCORD_EMOJI,
        value: "Report an issue with the\nDiscord server",
        inline: true,
      },
      {
        name: process.env.CONAN_EMOJI,
        value: "Report an issue with the\nConan server",
        inline: true,
      },
      {
        name: process.env.RUST_EMOJI,
        value: "Report an issue with the\nRust server",
        inline: true,
      },
      {
        name: process.env.FARMING_EMOJI,
        value: "Report an issue with the\nFarming Simulator server",
        inline: true,
      },
      {
        name: process.env.OTHER_EMOJI,
        value: "Report a different issue",
        inline: true,
      },
    ],
  },

  conan_role: {
    title: "Operation Exiles (Conan Exiles Server)",
    description:
      "Grab this role if you play on our Conan Exiles server in order to see it's related channels and show you are part of this server.",
    color: 14766914,
  },

  rust_role: {
    title: "Rusty Operations (Rust Server)",
    description:
      "Make sure to get this role if you play on our Rust server so that you can see the Rust channels and get pinged for server announcements and other Rusty things.",
    color: 13724201,
  },

  farming_role: {
    title: "Farming Operations (Farming Simulator 22 Server)",
    description:
      "Grab this role to join our amazing Farming server and to see it's related channels.",
    color: 16731689,
  },

  donations_embed: {
    title: "Donations!",
    description:
      "All donations are greatly appreciated and will go towards the upkeep, upgrade and expansion of our community servers. There are 2 ways in which you can donate:",
    color: 228607,
    image: {
      url: "https://media.discordapp.net/attachments/651470578741542936/813790022657638420/Operations_Logo.png",
    },
    fields: [
      {
        name: "Patreon:",
        value:
          "If you're feeling generous and would like to help us grow our community and be part of it along our journey then you can become a Patreon subscriber, starting at £3 per month. This helps us a lot with the server costs and in returns rewards you with additional benefits.\n\nBenefits include: Discord roles, server titles, additional in-game features and even custom features.\n\nYou can subscribe [here](https://www.patreon.com/opcentre)",
      },
      {
        name: "Donate:",
        value:
          "If you would like to make a one-time donation towards our community you can do so through PayPal. This will help us with the community server costs and would be really appreciated.\n\nDonations and server boosts will gain you the <@&810882948709613639> Discord role and VIP Minecraft title.\n\nYou can make a donation [here](https://paypal.me/pools/c/8quGTqBY1J)",
      },
    ],
  },
};
