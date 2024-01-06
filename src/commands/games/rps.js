const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ApplicationCommandOptionType,
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
        content: "You can't play with yourself.😢",
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
      content: `${targetUser}, you have been invited to play Rock Paper Scissors!, 
      by ${interaction.user}. CLick your choice to start playing!`,
      embeds: [embed],
      components: [row],
    });
  },
};
