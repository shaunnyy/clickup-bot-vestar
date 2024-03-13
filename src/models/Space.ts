import axios from "axios";
import { ClickUpObject } from "./ClickUpObject";
import { List } from "./List";

/**
 * Class to handle actions performed on a Space.
 * It also provides static methods for interacting with the ClickUp API
 * to receive instances of itself.
 */
export class Space extends ClickUpObject {
  protected color: string = "";
  protected private: boolean = false;
  protected avatar: string | null = null;
  protected lists: Array<List> = Array<List>();

  /**
   * Find a space by id and return as a class instance.
   * @param spaceId Id to search for Space
   * @returns The space instance if found
   */
  public static async find(spaceId: number): Promise<Space | null> {
    let space: Space | null = null;
    // Search for space by id
    await axios
      .get("space/" + spaceId)
      .then((response) => {
        // Cast retrieved anonymous object to a new Space class instance
        space = Object.assign(new Space(), response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return space;
  }

  /**
   * Find all spaces in a workspace.
   * @param workspaceId Id of the workspace to retrieve from
   * @returns Array of Space instances
   */
  public static async all(workspaceId: number): Promise<Array<Space>> {
    const spaces: Array<Space> = Array<Space>();
    await axios
      .get(`team/${workspaceId}/space`)
      .then((response) => {
        response.data.spaces.forEach((space: any) => {
          // Cast each anonymous object to a new Space class instance
          const newSpace = Object.assign(new Space(), space);
          // Add to return array
          spaces.push(newSpace);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    return spaces;
  }

  /**
   * Return all lists in this space.
   * @returns Array of List instances
   */
  public async getLists(): Promise<Array<List>> {
    if (!this.lists.length) {
      // If lists array has not already been populated then retrieve from api
      this.lists = await List.folderless(this.id);
    }
    return this.lists;
  }
}
