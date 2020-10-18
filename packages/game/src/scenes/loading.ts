/* eslint-disable @typescript-eslint/no-var-requires */
import { bg } from '@game/assets/bg';

import { spritesheet as atlasSprites } from '@game/assets/spritesheet';
import atlasJSON from '@game/assets/sprites/spritesheet.json';

import { animations as animsSprites } from '@game/assets/animations';
import animsJSON from '@game/assets/sprites/animations.json';

export class LoadingScene extends Phaser.Scene {
  private isDecodedAll = true;
  private isTexturesLoaded = false;

  constructor() {
    super('loading-scene');
  }

  create(): void {
    // eslint-disable-next-line prefer-const
    let texturesQueue = [bg, atlasSprites, animsSprites];

    this.game.textures.addBase64('background', bg);

    const sprImg = new Image();
    sprImg.src = atlasSprites;
    sprImg.onload = () => {
      this.game.textures.addAtlasJSONHash('spritesheet', sprImg, atlasJSON);
    };

    const animImg = new Image();
    animImg.src = animsSprites;
    animImg.onload = () => {
      this.game.textures.addAtlasJSONHash('animations', animImg, animsJSON);
    };

    this.game.textures.on('addtexture', () => {
      if (texturesQueue.length <= 1) {
        this.isTexturesLoaded = true;
        this.checkLoading();
      } else {
        texturesQueue.length--;
      }
    });
  }

  private startScenes(): void {
    this.scene.start('main-scene');
    this.scene.start('overlay-scene').bringToTop('overlay-scene');

    this.scene.bringToTop('overlay-scene');
  }

  private checkLoading(): void {
    if (this.isTexturesLoaded && this.isDecodedAll) {
      this.startScenes();
    }
  }
}
