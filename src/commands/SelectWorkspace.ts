import { ApplyOptions } from "@sapphire/decorators";
import { ChatInputCommand, Command, CommandStore, container } from "@sapphire/framework";
import { Message } from "discord.js";

@ApplyOptions<Command.Options>({
  description: "Show available bot commands.",
  preconditions: ["HasServer"],
})
export class SelectWorkspaceCommand extends Command {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder //
        .setName(this.name)
        .setDescription(this.description)
    );
  }

  /**
   * Add a new task to the provided space.
   * @param interaction The slash command interaction
   */
  public async chatInputRun(interaction: Command.ChatInputCommandInteraction): Promise<void> {
    await interaction.deferReply();
    await container.controller.selectWorkspace(interaction);
  }
}
