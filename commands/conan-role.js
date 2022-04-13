const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("conan-role")
    .setDescription("Displays Conan Roles Embed"),
  async execute(interaction, client) {
    if (
      (interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
        interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)) &&
      interaction.options.getBoolean("link") != true
    ) {
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("conan-button")
          .setLabel("Operation Exiles")
          .setStyle("PRIMARY")
          .setEmoji("<:ConanExiles:884739183543988284>")
      );

      const embed = {
        title: "Operation Exiles (Conan Exiles Server)",
        description:
          "Grab this role if you play on our Conan Exiles server in order to see it's related channels and show you are part of this server.",
        color: 3246160,
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
