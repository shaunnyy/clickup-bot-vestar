import axios from "axios";

/**
 * Class to handle actions performed on a Workspace.
 * It also provides static methods for interacting with the ClickUp API
 * to receive instances of itself.
 */
export class Workspace {
  private id: number = 0;
  private name: string = "";
  private color: string = "";
  private avatar: string | null = null;
  private members: Array<any> = Array<any>();

  /**
   * Get the id of this workspace.
   * @returns The workspace id
   */
  public getId(): number {
    return this.id;
  }

  /**
   * Get the name of this workspace.
   * @returns The workspace name
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Get the array of members in this workspace.
   * @returns All workspace members
   */
  public getMembers(): Array<any> {
    return this.members;
  }

  /**
   * Get the total number of members for this workspace.
   * @returns The members count
   */
  public getMembersCount(): number {
    return this.members.length;
  }

  /**
   * Find a workspace by id and return as a class instance.
   * @param workspaceId Id to search for Workspace
   * @returns The workspace instance if found
   */
  public static async find(workspaceId: number): Promise<Workspace | null> {
    let workspace: Workspace | null = null;
    // Search for workspace by id
    await axios
      .get("team/" + workspaceId)
      .then((response) => {
        // Cast retrieved anonymous object to a new Workspace class instance
        workspace = Object.assign(new Workspace(), response.data.team);
      })
      .catch(function (error) {
        console.log(error);
      });
    return workspace;
  }

  /**
   * Find all workspaces that the client is a member of.
   * @returns Array of Workspace instances
   */
  public static async all(): Promise<Array<Workspace>> {
    const workspaces: Array<Workspace> = Array<Workspace>();
    await axios
      .get("team")
      .then((response) => {
        response.data.teams.forEach((workspace: any) => {
          // Cast each anonymous object to a new Workspace class instance
          const newWorkspace = Object.assign(new Workspace(), workspace);
          // Add to return array
          workspaces.push(newWorkspace);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    return workspaces;
  }
}
