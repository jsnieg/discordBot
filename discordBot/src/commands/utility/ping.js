const { SlashCommandBuilder } = require('discord.js');

// "data" property provides command definition.
// "execute" method contains the functionality to run from event handler when command is used.
module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};