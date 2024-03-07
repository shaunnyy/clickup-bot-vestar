declare module "@sapphire/framework" {
  interface Preconditions {
    InVoiceChannel: never;
    HasServer: never;
    IsPlaying: never;
  }
}

declare module "@sapphire/pieces" {
  interface Container {
    controller: ClickUpController;
  }
}

export default undefined;
