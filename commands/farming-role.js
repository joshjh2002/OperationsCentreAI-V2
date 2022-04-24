const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("farming-role")
    .setDescription("Displays Farming Simulator Roles Embed"),
  async execute(interaction, client) {
    if (
      interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
      interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)
    ) {
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("farming-button")
          .setLabel("Farming Operations")
          .setStyle("PRIMARY")
          .setEmoji("<:farming:965900831629127740>")
      );

      const embed = {
        title: "Farming Operations (Farming Simulator 22 Server)",
        description:
          "Grab this role to join our amazing Farming server and to see it's related channels.",
        color: 16731689,
      };

      interaction.reply({ embeds: [embed], components: [row] });
    } else {
      interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
  },
};
