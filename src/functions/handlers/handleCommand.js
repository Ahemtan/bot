const {
  REST,
  Routes
} = require('discord.js');
const fs = require("fs");

module.exports = (client) => {
  const {
    commandArray
  } = client

  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const {
        commands,
        commandArray
      } = client;

      for (const file of commandFiles) {

        const command = require(`../../commands/${folder}/${file}`);

        const porpoties = {
          folder,
          ...command
        }

        commands.set(command.data.name, porpoties);
        commandArray.push(command.data.toJSON());

      }
    }

    const clientId = "1032958576882352148";
    const guildId = "1002584943064531024";

    const rest = new REST({
      version: "10"
    }).setToken(process.env.TOKEN);

    (async () => {
      try {
        console.log(`Started refreshing ${client.commandArray.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
          Routes.applicationGuildCommands(clientId, guildId), {
            body: client.commandArray
          },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
      } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
      }
    })();
  };
};