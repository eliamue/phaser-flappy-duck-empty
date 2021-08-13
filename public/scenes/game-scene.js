import getSmoothedAngleFromVelocity from '../utils/getSmoothedAngleFromVelocity.js';
import getRandomNumber from '../utils/getRandomNumber.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameScene',
    });
  }
  init() {
    this.player;
    this.scoreText;
    this.pipeGroup;
    this.ground;
    this.playingGame = false;
    this.alive = true;
    this.score = 0;
  }
  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.spritesheet('ground', 'assets/ground-spritesheet.png', {
      frameWidth: 960,
    });
    this.load.spritesheet('dani-duck', 'assets/dani-duck-spritesheet.png', {
      frameWidth: 130,
      frameHeight: 130,
    });
  }
  create() {
    this.background = this.add.image(480, 640, 'background');
    this.ground = this.add.sprite(480, 1220, 'ground');
    this.player = this.physics.add.sprite(480, 640, 'dani-duck');
    this.anims.create({
      key: 'ground-move',
      frames: this.anims.generateFrameNumbers('ground', {
        frames: [0, 1, 2, 3, 4]
      }),
      frameRate: 60,
      repeat: -1
    });
    this.anims.create({
      key: 'flap',
      frames: this.anims.generateFrameNumbers('dani-duck', {
        frames: [0, 1],
      }),
      frameRate: 5,
      repeat: -1,
    });
  }
  update() {
    this.player.play('flap', true);
  }
}
