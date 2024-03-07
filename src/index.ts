"use strict";
import { SapphireClient, container } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import config from "./config.json";
import { ClickUpController } from "./controllers/ClickUpController";
import axios from "axios";

// Create the clickup object
container.controller = new ClickUpController();

// Set axios defaults
axios.defaults.headers.common["Authorization"] = config.clickupToken;
axios.defaults.baseURL = config.clickupEndpoint;

// Initiate the Sapphire client
const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates],
});

// Login the bot
client.login(config.token);
