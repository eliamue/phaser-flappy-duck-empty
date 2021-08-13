import { StartScene } from './scenes/start-screen.js';
import { GameScene } from './scenes/game-scene.js';
import { GameOverScene } from './scenes/game-over';

const config = {
  title: 'flappy duck',
  scale: {
    width: 960,
    height: 1280,
    mode: Phaser.Scale.FIT,
  },
  scene: [StartScene, GameScene, GameOverScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  pixelArt: true,
  autoCenter: true,
};

export class FlappyDuck extends Phaser.Game {
      cunstructor(config) {
            super(config) 
      })
}
