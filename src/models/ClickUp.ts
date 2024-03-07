import { Command } from "@sapphire/framework";
import { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder } from "discord.js";
import { Workspace } from "./Workspace";

/**
 * Class to handle all interactions with the ClickUp API.
 */
export class ClickUp {
  private workspace: Workspace | null = null;

  /**
   * Set the workspace for this server.
   * @param workspace The selected workspace
   */
  private async setWorkspace(workspace: Workspace): Promise<void> {
    this.workspace = workspace;
  }

  /**
   * Search for and select from top 5 search query results.
   * @param select Select message element
   * @param searchString Search query
   * @returns Updated select message element
   */
  private async getWorkspaceOptions(select: StringSelectMenuBuilder): Promise<StringSelectMenuBuilder> {
    // Get all client workspaces
    const workspaces: Array<Workspace> = await Workspace.all();

    workspaces.forEach((workspace: Workspace) => {
      // Add each workspace as a dropdown option on select menu
      const title: string = workspace.getName(),
        description: string = workspace.getMembersCount() + " members",
        value: string = workspace.getId().toString();
      select.addOptions(new StringSelectMenuOptionBuilder().setLabel(title).setDescription(description).setValue(value));
    });
    return select;
  }

  /**
   * Set the workspace for this server.
   * @param interaction The current slash command interaction
   * @returns Interaction response message
   */
  public async selectWorkspace(interaction: Command.ChatInputCommandInteraction): Promise<void> {
    // Prepare workspaces select menu
    let select = new StringSelectMenuBuilder().setCustomId("workspace").setPlaceholder("Make a selection!");
    // Add all workspaces as options on the select menu
    select = await this.getWorkspaceOptions(select);

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
    const response = await interaction.editReply({
      content: "Which Workspace?",
      components: [row],
    });

    // Only allow the user that made the request to select the workspace
    const filter = (i: { user: { id: string } }) => i.user.id === interaction.user.id;
    try {
      // Allow 5 minutes to retrieve the select reponse
      const confirmation = await response.awaitMessageComponent({ filter, time: 300_000 });
      if (confirmation instanceof StringSelectMenuInteraction && confirmation.customId === "workspace") {
        // The correct select response was received
        const workspaceId: number = parseInt(confirmation.values[0]);
        // Get the workspace instance
        const workspace: Workspace | null = await Workspace.find(workspaceId);
        let message;
        if (workspace) {
          // Set the server workspace
          await this.setWorkspace(workspace);
          message = "Workspace set";
        } else {
          // Workspace was not returned from the API
          message = "Workspace not found";
        }
        // Update the message with outcome
        await confirmation.update({ content: message, components: [] });
      }
    } catch (e) {
      // No selection was made within the time limit
      await response.edit({ content: "Confirmation not received within 5 minutes.", components: [] });
    }
  }
}
