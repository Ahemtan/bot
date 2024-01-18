const {
	SlashCommandBuilder,
	EmbedBuilder,
	ComponentType,
	ActionRowBuilder,
	StringSelectMenuBuilder,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get the list of commands')
		.setDMPermission(false),
	async execute(interaction, client) {

		const {
			channel
		} = interaction;

		const emojis = {
			information: '📃',
			games: '🎮',
			entertainment: '📺',
			tools: '⚙️',
		}

		function getCommand(name) {
			const getCommandId = client.applications.command.cache
				.filter((cmd) => cmd.name === name)
				.map((cmd) => cmd.id);

			return getCommandId;
		}

		const directories = [
			...new Set(interaction.client.commands.map((cmd) => cmd.folder))
		]

		const formatString = (str) => {
			return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
		};

		const categories = directories.map((dir) => {
			const getCommands = client.commands
				.filter((cmd) => cmd.folder === dir)
				.map((cmd) => {
					return {
						name: cmd.data.name,
						description: cmd.data.description || "there is no description for this command",
					}
				});
			return {
				directory: formatString(dir),
				command: getCommands,
			}
		})

		const embed = new EmbedBuilder()
			.setTitle('List of commands')
			.setDescription('Here is a list of all the commands')
			.setAuthor({
				name: `${client.user.name}'s Commands`,
				iconURL: client.user.avatarURL()
			})
			.setTimestamp()
			.setColor('#0099ff')

		const components = (state) => [
			new ActionRowBuilder().addComponents(
				new StringSelectMenuBuilder()
				.setPlaceholder('Select a category')
				.setCustomId('help-menu')
				.addOptions(
					categories.map((cmd) => {
						return {
							label: cmd.directory,
							value: cmd.directory.toLowerCase(),
							description: `commands from ${cmd.directory} category.`,
							emoji: emojis[cmd.directory.toLowerCase()] || null,
						}
					})
				)
			)
		];

		const initialMessage = await interaction.reply({
			embeds: [embed],
			components: components(false),
		})

		const filter = (interaction) => {
			interaction.user.id === interaction.member.id;
		}

		const collector = channel.createMessageComponentCollector({
			filter,
			ComponentType: ComponentType.StringSelect,
		})

		collector.on('collect', (interaction) => {
			const [directory] = values;

			const category = categories.find((x) => x.directory.toLowerCase() === directory);

			const categoryEmbed = new EmbedBuilder()
				.setTitle(`${emojis[directory.toLowerCase()] || null} ${formatString(directory)} commands`)
				.setDescription(`A list of all commands categorized under ${directory}`)
				.setColor('Random')
				.addFields(
					category.command.map((cmd) => {
						return {
							name: `</${cmd.name}: ${getCommand(cmd.name)}>`,
							value: `\`${cmd.description}\``,
							inline: true,
						}
					})
				)

			interaction.update({
				embeds: [categoryEmbed],
			});
		})

		collector.on('end', () => {
			initialMessage.edit({
				components: components(true),
			});
		})

	},
};