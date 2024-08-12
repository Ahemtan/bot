const { SlashCommandBuilder } = require("discord.js");

let data = {
  content:
    "Unleash the Fun with Genie: Your Discord Playground Pal!\n\nCraving laughs, thrills, and good vibes in your Discord server? Say hello to Genie, \nyour friendly neighborhood entertainment genie! \nDitch the boredom and prepare for a whirlwind of fun with features like:",
  tts: false,
  embeds: [
    {
      id: 959167967,
      title: "Hello There,",
      description:
        "Developed by <@690531048098103317> !\nI'm a open sorce project. You can get me here! \nhttps://github.com/ahemtan/bot",
      color: 2326507,
      fields: [
        {
          id: 472281785,
          name: "**Meme master:**",
          value:
            "Summon hilarious memes on demand, from wholesome classics to the latest trends.",
        },
        {
          id: 608893643,
          name: "**Game on:** ",
          value:
            " Challenge your friends with interactive games, quizzes, and trivia nights.",
        },
        {
          id: 724530251,
          name: "**Get creative:**",
          value:
            "Unleash your inner artist with our image manipulation tools and meme generators.",
        },
        {
          id: 927221233,
          name: "**Story time:** ",
          value:
            "Dive into imaginative adventures with collaborative storytelling features.",
        },
      ],
    },
  ],
  components: [],
  actions: {},
  avatar_url:
    "https://cdn.discordapp.com/avatars/1032958576882352148/b8bf109a459dda1aacabf4fb7bcff878?size=512",
  username: "bOt",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("me")
    .setDescription("Everything about me! 😊"),
  async execute(interaction, client) {
    await interaction.reply(data);
  },
};
