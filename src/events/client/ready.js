module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`${client.user.tag} is done cooking! 😏`);
        await client.application.commands.set(client.commandArray)
    }
}