const { SlashCommandBuilder } = require("@discordjs/builders");
const { conan_embed } = require("../jsons/server-embeds");
const { sendLink } = require("../tools");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("conan")
    .setDescription("Sends Conan Embed and Link")
    .addBooleanOption((option) =>
      option
        .setName("link")
        .setDescription("Do you want the link?")
        .setRequired(false)
    ),
  async execute(interaction, client) {
    if (
      (interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
        interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)) &&
      interaction.options.getBoolean("link") != true
    ) {
      interaction.reply({ embeds: [conan_embed] });
    } else {
      if (
        interaction.options.getBoolean("link") ||
        !(
          interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
          interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)
        )
      ) {
        sendLink(
          interaction,
          client,
          process.env.CONAN_ADMIN_CHANNEL,
          process.env.CONAN_LINK
        );
      } else {
        interaction.reply({
          content: "You do not have permission to use this command.",
          ephemeral: true,
        });
      }
    }
  },
};
