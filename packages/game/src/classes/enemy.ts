import { animations } from "@game/assets/animations";

type EnemyConfig = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  frame?: string;
};

export class Enemy extends Phaser.GameObjects.Container {
  enemy!: Phaser.GameObjects.Sprite;
  spritesheet: string;
  frame: string;

  getDamageTween!: Phaser.Tweens.Timeline;
  attacksThePlayerTween!: Phaser.Tweens.Tween;

  constructor({ scene, x, y, frame = 'argock' }: EnemyConfig) {
    super(scene, x, y);
    scene.add.existing(this).setName('enemy');

    this.spritesheet = 'animations';
    this.frame = `a-${frame}-attack`;
    
      this.enemy = scene.add
        .sprite(0, 0, this.spritesheet, `${this.frame}-0`)
        .setScale(1)
        .setOrigin(0.5);
    super.add(this.enemy);
    
    

    // Animations
    
    scene.anims.create({
      key: `${this.frame}-attacksThePlayer`,
      duration: 200,
      frames: this.scene.anims.generateFrameNames('animations', {
        prefix: `${this.frame}-`,
        start: 0,
        end: 14,
      }),
      frameRate: 20,
      repeat: 0,
    });
    
   
  }

  public attacksThePlayer(callback?: () => void) {
    console.log('1');
    this.enemy.anims.play(`${this.frame}-attacksThePlayer`);
    
    if (callback) {
      const delay = this.scene.anims.get(`${this.frame}-attacksThePlayer`).duration / 3;  
      console.log('0');
      this.scene.time.delayedCall(delay, callback);
    }
  };
}
