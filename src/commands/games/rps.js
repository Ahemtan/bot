const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} = require("discord.js");

const choices = [
  { name: "Rock", emoji: "🪨", beats: "Scissors" },
  { name: "Paper", emoji: "📄", beats: "Rock" },
  { name: "Scissors", emoji: "✂️", beats: "Paper" },
];
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Play rock paper scissor with friend!")
    .addUserOption((option) =>
      option.setName("user").setDescription("The opponent").setRequired(true)
    ),

  async execute(interaction, client) {
    const targetUser = interaction.options.getUser("user");

    if (interaction.user.id === targetUser.id) {
      interaction.reply({
        content: "You can't play with yourself. 😢",
        ephemeral: true,
      });
      return;
    }

    if (targetUser.bot) {
      interaction.reply({
        content: "You can't play with bot. 🤖",
        ephemeral: true,
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle("Rock Paper Scissors")
      .setDescription(`${targetUser}'s turn.`)
      .setColor("Random")
      .setTimestamp(new Date());

    const buttons = choices.map((choice) => {
      return new ButtonBuilder()
        .setCustomId(choice.name)
        .setLabel(choice.name)
        .setStyle(ButtonStyle.Primary)
        .setEmoji(choice.emoji);
    });

    const row = new ActionRowBuilder().addComponents(buttons);

    const reply = await interaction.reply({
      content: `${targetUser}, you have been invited to play Rock Paper Scissors!,\n by ${interaction.user}. CLick your choice to start playing!`,
      embeds: [embed],
      components: [row],
    });

    const targetUserInteraction = await reply
      .awaitMessageComponent({
        filter: (i) => i.user.id == targetUser.id,
        time: 30_000,
      })
      .catch(async (error) => {
        embed.setDescription(`${targetUser} did not respond in time.😢`);
        await reply.edit({ embeds: [embed], components: [] });
        return;
      });

    if(!targetUserInteraction) return;

    const targetUserChoice = choices.find(
      (choice) => choice.name === targetUserInteraction.customId,
    );

    await targetUserInteraction.reply({
      content: `You picked ${targetUserChoice.name + targetUserChoice.emoji}`,
      ephemeral: true
    });

    embed.setDescription(`It's ${interaction.user}'s turn`);

    await reply.edit({
      content: `${interaction.user} it's your turn!`
    });

    const initialUserInteraction = await reply
      .awaitMessageComponent({
        filter: (i) => i.user.id == interaction.user.id,
        time: 30_000,
      })
      .catch(async (error) => {
        embed.setDescription(`${interaction.user} did not respond in time.😢`);
        await reply.edit({ embeds: [embed], components: [] });
        return;
      });

    if(!initialUserInteraction) return;

    const initialUserChoice = choices.find(
      (choice) => choice.name === initialUserInteraction.customId
    );

    let result;

    if(targetUserChoice.beats === initialUserChoice.name) {
      result = `${targetUser} won 🎉🥳`;
    }

    if(initialUserChoice.beats === targetUserChoice.name) {
      result = `${interaction.user} won 🎉🥳`;
    }

    if(targetUserChoice.name = initialUserChoice.name) {
      result = "It was a tie! 😲"
    }

    embed.setDescription(
      `${targetUser} picked ${targetUserChoice.name + targetUserChoice.emoji}\n
        ${interaction.user} picked ${initialUserChoice.name + initialUserChoice.emoji} \n\n
        ${result}
      `
    )

    reply.edit({ embeds: [embed], components: [] });

  },
};
