// "use strict";
import { Command, CommandStore } from "@sapphire/framework";
import { ClickUp } from "../models/ClickUp";
import { EmbedBuilder, InteractionReplyOptions } from "discord.js";

export class ClickUpController {
  private servers: Map<string, ClickUp> = new Map<string, ClickUp>();

  /**
   * Create a new server mapping.
   * @param serverId The guild id
   */
  public addServer(serverId: string): void {
    this.servers.set(serverId, new ClickUp());
  }

  /**
   * Print out the application commands.
   * @param commands All bot commands
   * @returns Message embed
   */
  public help(commands: CommandStore): InteractionReplyOptions {
    const embed = new EmbedBuilder().setColor(0x274437).setTitle("All commands");
    let commandsString: string = "";
    commands.each((command: Command) => {
      commandsString += `/${command.name} - ${command.description}`;
      if (!Object.is(commands.last(), command)) {
        commandsString += "\n";
      }
    });
    embed.setDescription(commandsString);
    return { embeds: [embed] };
  }
}
