# 🤖 Discord Bot

A modular and scalable Discord bot built using [discord.js](https://discord.js.org/).  
It supports command and event handling, dotenv configuration, and code formatting via [Biome](https://biomejs.dev/).

---

## 📁 Project Structure

```

src
├── commands/      # Command definitions
│   └── ping.js
├── events/        # Discord event handlers
│   └── ready.js
├── functions/     # Utility functions (e.g., loader)
│   └── loadCommands.js
└── index.js       # Entry point

```

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js v18 or higher
- A Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications)
- [Bun](https://bun.sh/) (or use `npx` in place of `bunx`)

### 2. Installation

```bash
git clone https://github.com/ahemtan/your-repo-name.git
cd your-repo-name
npm install
```

### 3. Configuration

Create a `.env` file in the root of your project:

```env
DISCORD_TOKEN=your-bot-token-here
```

---

## 💻 Usage

### Run in Development Mode (auto-restarts on changes)

```bash
npm run dev
```

### Run in Production

```bash
npm start
```

---

## 🧹 Code Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting.

```bash
npm run lint
# or
npm run format
```

---

## 🧠 Example Files

### 🔹 `src/commands/ping.js`

```js
module.exports = {
  name: "ping",
  description: "Replies with Pong!",
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
```

---

### 🔹 `src/events/ready.js`

```js
module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);
  },
};
```

---

### 🔹 `src/functions/loadCommands.js`

```js
const fs = require("node:fs");
const path = require("node:path");

module.exports = (client) => {
  const commandsPath = path.join(__dirname, "../commands");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (command.name) {
      client.commands.set(command.name, command);
    }
  }
};
```

---

## 🧩 Dependencies

- [`discord.js`](https://discord.js.org/) — Main library for interacting with the Discord API.
- [`dotenv`](https://www.npmjs.com/package/dotenv) — Load environment variables from `.env`.
- [`axios`](https://www.npmjs.com/package/axios) — For making API requests (if needed).

### Dev Dependencies

- [`@biomejs/biome`](https://www.npmjs.com/package/@biomejs/biome) — Code formatter and linter.
- [`nodemon`](https://www.npmjs.com/package/nodemon) — Auto-restarts the bot in dev mode.

---

## 👤 Author

Made with ❤️ by [ahemtan](https://github.com/ahemtan)

---

## 📄 License

Licensed under the [ISC License](https://opensource.org/licenses/ISC)

---

```

---

Let me know if you'd like:

- Slash command support added
- Docker setup instructions
- A full working `index.js` example
- Make sure to add .env before running

Happy coding! 🚀
```
