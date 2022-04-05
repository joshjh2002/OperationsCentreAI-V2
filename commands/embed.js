module.exports = {
  name: "embed",
  description: "sends custom embed",
  execute(message, args, Discord) {
    if (
      message.member.roles.cache.has("697047262081056828") ||
      message.member.roles.cache.has("651471748214030408")
    ) {
      const title = args[0];
      const img = args[1];
      let col = parseInt(args[2]);

      let description = "";
      for (let i = 3; i < args.length; i++) {
        description += args[i] + " ";
      }

      if (col > 16777215) {
        col = 16777215;
      }

      let url = "";
      if (img != "null") {
        url = img;
      }
      const embed = {
        title: title,
        description: description,
        color: col,
        image: {
          url: url,
        },
      };
      message.channel.send({ embeds: [embed] });
      message.delete();
    } else {
      message.channel.send(
        "You do not have the right permissions to use this command."
      );
    }
  },
};
