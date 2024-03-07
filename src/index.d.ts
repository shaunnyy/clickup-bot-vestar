declare module "@sapphire/framework" {
  interface Preconditions {
    HasServer: never;
  }
}

declare module "@sapphire/pieces" {
  interface Container {
    controller: ClickUpController;
  }
}

export default undefined;
