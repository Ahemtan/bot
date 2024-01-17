const {
    SlashCommandBuilder,
    Embed,
    EmbedBuilder
} = require("discord.js");

const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Gimme meme!!'),
    async execute(interaction, client) {

        const respond = await axios(`https://www.reddit.com/r/memes/random/.json`, {
            timeout: 10000,
        })

        const data = respond.data[0].data.children[0].data

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(`${data.title}`)
            .setImage(`${data.url}`)
            .setURL(`https://www.reddit.com${data.permalink}`)
            .setFooter({
                text: data.author
            })

        await interaction.reply({
            embeds: [embed]
        });
    },
};