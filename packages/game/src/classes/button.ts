import { EVENTS_NAME } from '../consts';

type ButtonConfig = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  frame: string;
  isPulsed?: boolean;
};

export class Button extends Phaser.GameObjects.Sprite {
  pulsedTween?: Phaser.Tweens.Tween;
  isPulsed: boolean;

  resize: () => void;

  constructor({ scene, x, y, frame = 'btn-attack', isPulsed = false }: ButtonConfig) {
    super(scene, x, y, 'spritesheet', frame);
    scene.add.existing(this);

    this.isPulsed = isPulsed;
    this.initTween();

    this.resize = () => {
      this.pulsedTween && this.pulsedTween.remove();
      this.initTween();
    };

    this.scene.game.scale.addListener(EVENTS_NAME.resize, this.resize);
  }

  initTween(): void {
    this.pulsedTween = this.scene.tweens.add({
      targets: [this],
      scale: this.scene.game.scale.isLandscape ? '+=0.05' : '+=0.1',
      paused: !this.isPulsed,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
  }

  
}
