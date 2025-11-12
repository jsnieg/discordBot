// Require the necessary discord.js classes for the Bot
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { discordToken } = process.env.DISCORD_TOKEN;

// Create a new client instance
// Ensures cache for guilds, channels and roles are populated and available for internal use.
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// When client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discrd with your secret client's token.
client.login(discordToken);