/**
 * Class to provide shared properties and methods on a ClickUp model.
 */
export class ClickUpObject {
  protected id: number = 0;
  protected name: string = "";

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
}
