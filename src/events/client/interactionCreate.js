module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);

      if (!command) return await interaction.reply({
        content: "No commands found! 😔",
        ephemeral: true,
      });;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: "There was an error while executing this command! 😪",
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: "There was an error while executing this command! 😪",
            ephemeral: true,
          });
        }
      }
    }
  },
};
