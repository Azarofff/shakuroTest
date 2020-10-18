import { EVENTS_NAME } from '../consts';

export class OverlayScene extends Phaser.Scene {
  private resizeHandler!: () => void;

  constructor() {
    super('overlay-scene');

    this.resizeHandler = () => {
      this.updateChildrensPosition();
    };
  }

  create(): void {
    this.updateChildrensPosition();
    this.game.scale.addListener(EVENTS_NAME.resize, this.resizeHandler);
  }

  private updateChildrensPosition(): void {
    const centerX = this.game.scale.width / 2;
    const centerY = this.game.scale.height / 2;
  }
}
