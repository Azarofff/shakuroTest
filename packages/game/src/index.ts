import { animations } from '@game/assets/animations';
import * as Phaser from 'phaser';

import { LoadingScene, MainScene, OverlayScene } from './scenes';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Playable Ads',
  type: Phaser.CANVAS,
  parent: 'game',
  backgroundColor: '#080908',
  scale: {
    mode: Phaser.Scale.ScaleModes.NONE,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    autoRound: true,
  },
  canvasStyle: `display: block; width: 100%; height: 100%;`,
  callbacks: {
    postBoot: () => {
      window.sizeChanged();
    },
  },
  autoFocus: true,
  audio: {
    disableWebAudio: false,
  },
  scene: [LoadingScene, MainScene, OverlayScene],
};

window.sizeChanged = () => {
  if (window.game.isBooted) {
    setTimeout(() => {
      window.game.scale.resize(
        window.innerWidth * window.devicePixelRatio,
        window.innerHeight * window.devicePixelRatio,
      );

      window.game.canvas.setAttribute(
        'style',
        `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
      );
      window.game.canvas.setAttribute(
        'id',
        'can1',
      );
      
    }, 100);
  }
};


window.game = new Phaser.Game(gameConfig);

window.onorientationchange = () => {
  window.sizeChanged();
};

window.onresize = () => {
  window.sizeChanged();
};


