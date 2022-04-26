const { SlashCommandBuilder } = require("@discordjs/builders");
const { report_embed } = require("../jsons/server-embeds");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Sends Ticket Embed"),
  async execute(interaction, client) {
    if (
      interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
      interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)
    ) {
      let msg = await interaction.reply({
        embeds: [report_embed],
        fetchReply: true,
      });
      msg.react(process.env.DISCORD_EMOJI);
      msg.react(process.env.CONAN_EMOJI);
      msg.react(process.env.RUST_EMOJI);
      msg.react(process.env.FARMING_EMOJI);
      msg.react(process.env.OTHER_EMOJI);
    } else {
      interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
  },
};
