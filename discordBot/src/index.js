// Node.js specific constants
const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes for the Bot
const { Client, Collection, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const { discordToken } = process.env.DISCORD_TOKEN;

// Creates a folder path
const foldersPath = path.join(__dirname, 'commands');
// Read contents of the directory
const commandFolders = fs.readdirSync(foldersPath);

// Create a new client instance
// Ensures cache for guilds, channels and roles are populated and available for internal use.
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

// When client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log in to Discrd with your secret client's token.
client.login(discordToken);

client.commands = new Collection();

// Only command files get processed (scripts) ending with ".js" inside the commands/utility folder.
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported value
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
			console.log(`[WARNING] The command at ${filePath} is missing required "data" or "execute" property.`);
        }
    }
}

// ?
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command  matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                flags: MessageFlags.Ephemeral,
            });
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                flags: MessageFlags.Ephemeral,
            });
        }
    }
});