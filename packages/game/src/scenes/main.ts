import { EVENTS_NAME } from '../consts';
import { Enemy } from '../classes/enemy';
import { Button } from '../classes/button';
import { on } from 'process';

export class MainScene extends Phaser.Scene {
  private background!: Phaser.GameObjects.Image;
  private sceneContainer!: Phaser.GameObjects.Container;
  private enemy!: Enemy;
  private attackBtn!: Button;
  private newBtn!: Button;
  private logo!: Button;
  private resizeHandler: () => void;
  constructor() {
    super('main-scene');

    this.resizeHandler = () => {
      this.resize();
      this.changePositions();
    };
    
    
  }

  create(): void {
    this.sceneContainer = this.add.container(this.game.scale.width / 2, 0);
    this.background = this.add.image(0, 0, 'background');
    this.initEnemy();
    this.logoDef(this.scale.orientation);
    this.initAttackButton();
    this.initNewButton();
    this.sceneContainer.add([this.background, this.enemy, this.attackBtn, this.newBtn, this.logo]);
    this.resize();
    this.changePositions();
    this.initEvents();
  }

  // Initializations

  private initEnemy(): void {
    this.enemy = new Enemy({ scene: this, x: 0, y: 0, frame: "argock" }).setScale(2);
  }
  
  
  

  private logoDef(orientation:any) {
    if (orientation === Phaser.Scale.PORTRAIT) {
    this.logo = new Button({ scene: this, x: 0, y: -(window.innerHeight) + 16, frame: 'logo' });
    
  }
  else if (orientation === Phaser.Scale.LANDSCAPE) {
      this.logo = new Button({ scene: this, x: -(window.innerWidth) + 16, y: -(window.innerHeight) + 16, frame: 'logo' });
  }
}


  private initAttackButton(): void {
    this.attackBtn = new Button({
      scene: this,
      x: 0,
      y: this.enemy.getBounds().bottom,
      frame: 'btn-attack', isPulsed: false
    });
    let enem = this.enemy;
    
    window.game.canvas.addEventListener("click", function (event) {
      let x = event.pageX;
      let y = event.pageY;
      let xLower = 0.4 * window.innerWidth;
      let xHigher = 0.6 * window.innerWidth;
      let yLower = 2 / 3 * window.innerHeight;
      let yHigher = 0.75 * window.innerHeight;
      
      
      if (x >= xLower && x <= xHigher && y >= yLower && y <= yHigher) {
          enem.attacksThePlayer();
        } 
        console.log("clicked!", x, y);
      });

      this.attackBtn.on('click', () => {
      this.enemy.attacksThePlayer();  
    });
  }

   

  private initNewButton(): void {
    this.newBtn = new Button({
      scene: this,
      x: window.innerWidth - 16,
      y: window.innerHeight - 16,
      frame: 'btn-play-now', isPulsed: true
    });
        
    window.game.canvas.addEventListener("click", (event) => {
      let x = event.pageX;
      let y = event.pageY;
      let xLower = window.innerWidth - this.newBtn.getBounds().width - 16;
      let xHigher = window.innerWidth - 16;
      let yLower = window.innerHeight - this.newBtn.getBounds().height - 16;
      let yHigher = window.innerHeight - 16;


      if (x >= xLower && x <= xHigher && y >= yLower && y <= yHigher) {
        window.location.assign("http://play.google.com/store/apps/");
      }
      
    });
  }

  private initEvents(): void {
    this.game.scale.addListener(EVENTS_NAME.resize, this.resizeHandler);
  }

  // Resize

  private resize(): void {
    this.updateSceneContainerSize();
  }

  private updateSceneContainerSize() {
    const scaleX = this.game.scale.width / this.background.width;
    const scaleY = this.game.scale.height / this.background.height;
    const scale = Math.max(scaleX, scaleY);
    this.sceneContainer.setScale(scale);
  }

  private changePositions(): void {
    this.sceneContainer.setPosition(this.game.scale.width / 2, this.game.scale.height / 2);
  }
  

}
