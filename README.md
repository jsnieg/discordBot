# discordBot
Discord Bot in Node.js

## Requirements

- node
- discordjs (after npm is initialised)

## Setup / Usage

- `npm init`

> If running on Windows env you may need to change your Execution Policy with this command `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`.

- `npm install discord.js`

To install a Linter run:

- `npm install --save-dev eslint @eslint/js`

### Running with .env

Create `.env` under `env` directory and add your Bot's Token in new line `DISCORD_TOKEN=<your_token>`.

- `node --env-file=env/.env discordBot/src/index.js`