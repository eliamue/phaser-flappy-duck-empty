import getSmoothedAngleFromVelocity from '../utils/getSmoothedAngleFromVelocity.js';
import getRandomNumber from '../utils/getRandomNumber.js';

const PLAYER_SPEED = 800;
const PLAYER_GRAVITY = 3000;
const PIPE_SPEED = 5;

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

    this.player.setDepth(2);
    this.ground.setDepth(1);

    const pipeContainerA = this.createPipeContainer(1520);
    const pipeContainerB = this.createPipeContainer(2080);

    this.pipeGroup = this.add.group();
    this.pipeGroup.add(pipeContainerA);
    this.pipeGroup.add(pipeContainerB);

    this.scoreText = this.add.text(480, 100, this.score, {
      fontSize: '8em',
      fontFamily: 'sans-serif',
    });

    this.anims.create({
      key: 'ground-move',
      frames: this.anims.generateFrameNumbers('ground', {
        frames: [0, 1, 2, 3, 4],
      }),
      frameRate: 60,
      repeat: -1,
    });
    this.anims.create({
      key: 'flap',
      frames: this.anims.generateFrameNumbers('dani-duck', {
        frames: [0, 1],
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.input.on('pointerdown', () => {
      if (!this.playingGame) {
        this.playingGame = true;
        this.player.setGravityY(PLAYER_GRAVITY);
      }
      if (this.playingGame && this.alive) {
        this.player.body.velocity.y = 0;
        this.player.body.velocity.y -= PLAYER_SPEED;
      }
    });
  }
  update() {

    if(this.playingGame && this.alive) {
      this.pipeGroup.getChildren().forEach((pipeContainer) => {
        pipeContainer.x -= PIPE_SPEED;

        if(pipeContainer.x < 0 - pipeContainer.list[0].width / 2) {
          pipeContainer.x = 960 + pipeContainer.list[0].width / 2;
          pipeContainer.y = 640 + getRandomNumber(325);
          pipeContainer.passed = false;
        }
      });
    }

    this.ground.play('ground-move', true);
    this.player.play('flap', true);
    this.player.setAngle(getSmoothedAngleFromVelocity(this.player));
    this.scoreText.text = this.score;

    if (this.player.y < 0 || this.player.y > 1280) {
      this.scene.start('GameOverScreen', { score: this.score });
    }
  }

  createPipeContainer(xPos) {
    const pipe1 = this.physics.add.sprite(0, 875, 'pipe');
    const pipe2 = this.physics.add.sprite(0, -875, 'pipe');

    pipe1.flipY = true;

    const pipeContainer = this.add.container(xPos, 640);
    pipeContainer.add([pipe1, pipe2]);

    this.physics.world.enable(pipeContainer);

    this.physics.add.overlap(
      pipeContainer,
      this.player,
      (pipeContainer, player) => {
        if (!pipeContainer.passed) {
          pipeContainer.passed = true;
          this.score += 1;
        }
      }
    );
    pipeContainer.list.forEach((pipe) => {
      this.physics.add.ocerlap(pipe, this.player, () => {
        if (this.alive) {
          this.alive = false;
          this.player.body.velocity.y = 0;
          this.ground.active = false;
        }
      });
    });
    return pipeContainer;
  }
}
