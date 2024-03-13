import axios from "axios";
import { ClickUpObject } from "./ClickUpObject";

/**
 * Class to handle actions performed on a List.
 * It also provides static methods for interacting with the ClickUp API
 * to receive instances of itself.
 */
export class List extends ClickUpObject {
  protected orderIndex: number = 0;
  protected content: string = "";
  protected status: string | null = null;
  protected priority: string | null = null;
  protected assignee: number | null = null;
  protected task_count: number = 0;

  /**
   * Find a list by id and return as a class instance.
   * @param listId Id to search for List
   * @returns The list instance if found
   */
  public static async find(listId: number): Promise<List | null> {
    let list: List | null = null;
    // Search for list by id
    await axios
      .get("list/" + listId)
      .then((response) => {
        // Cast retrieved anonymous object to a new List class instance
        list = Object.assign(new List(), response.data.team);
      })
      .catch(function (error) {
        console.log(error);
      });
    return list;
  }

  /**
   * Find all lists in a folder.
   * @param folderId Id of the folder to retrieve from
   * @returns Array of List instances
   */
  public static async all(folderId: number): Promise<Array<List>> {
    const lists: Array<List> = Array<List>();
    await axios
      .get(`folder/${folderId}/list`)
      .then((response) => {
        response.data.lists.forEach((list: any) => {
          // Cast each anonymous object to a new List class instance
          const newList = Object.assign(new List(), list);
          // Add to return array
          lists.push(newList);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    return lists;
  }

  /**
   * Find all lists in a space.
   * @param listId Id of the space to retrieve from
   * @returns Array of List instances
   */
  public static async folderless(spaceId: number): Promise<Array<List>> {
    const lists: Array<List> = Array<List>();
    await axios
      .get(`space/${spaceId}/list`)
      .then((response) => {
        response.data.lists.forEach((list: any) => {
          // Cast each anonymous object to a new List class instance
          const newList = Object.assign(new List(), list);
          // Add to return array
          lists.push(newList);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    return lists;
  }
}
