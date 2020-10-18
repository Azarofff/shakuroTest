declare const PLATFORM: string;

// Window Patching
interface Window {
  sizeChanged: () => void;
  game: Phaser.Game;
}

declare module '*.png' {
  const value: any;
  export = value;
}

type GameObject =
  | Phaser.GameObjects.Sprite
  | Phaser.GameObjects.Image
  | Phaser.GameObjects.Container;
