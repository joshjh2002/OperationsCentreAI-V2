const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rust-role")
    .setDescription("Displays Rust Roles Embed"),
  async execute(interaction, client) {
    if (
      (interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
        interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)) &&
      interaction.options.getBoolean("link") != true
    ) {
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("rust-button")
          .setLabel("Rusty Operations")
          .setStyle("PRIMARY")
          .setEmoji("<:Rust:721800980147994656>")
      );

      const embed = {
        title: "Rusty Operations (Rust Server)",
        description:
          "Make sure to get this role if you play on our Rust server so that you can see the Rust channels and get pinged for server announcements and other Rusty things.",
        color: 13724201,
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
