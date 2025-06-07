const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Gimme meme!!"),
  async execute(interaction, client) {
    const res = await axios("https://meme-api.com/gimme", {
      timeout: 10000,
    });

    const data = res.data;

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(`${data.title}`)
      .setImage(`${data.preview[3]}`)
      .setURL(data.postLink)
      .setFooter({
        text: data.author,
      });

    await interaction.reply({
      embeds: [embed],
    });
  },
};
