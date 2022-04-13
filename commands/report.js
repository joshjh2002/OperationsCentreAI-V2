const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Sends Ticket Embed"),
  async execute(interaction, client) {
    if (
      interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
      interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)
    ) {
      const embed = {
        title: "Create a Support Ticket",
        description:
          "React with the relevant emoji to create a ticket and get in contact with the appropriate team!",
        color: 12743972,
        fields: [
          {
            name: "<:discord_logo:947544355533652048>",
            value: "Report an issue with the\nDiscord server",
            inline: true,
          },
          {
            name: "<:ConanExiles:884739183543988284>",
            value: "Report an issue with the\nConan server",
            inline: true,
          },
          {
            name: "<:Rust:721800980147994656>",
            value: "Report an issue with the\nRust server",
            inline: true,
          },
          {
            name: "☑️",
            value: "Report a different issue",
            inline: false,
          },
        ],
      };
      let msg = await interaction.reply({ embeds: [embed], fetchReply: true });
      msg.react("<:discord_logo:947544355533652048>");
      msg.react("<:ConanExiles:884739183543988284>");
      msg.react("<:Rust:721800980147994656>");
      msg.react("☑");
    } else {
      interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
  },
};
