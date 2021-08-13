import { getScore, returnScore } from '../utils/localStorage.js';

export class GameOverScreen extends Phaser.Scene {
  constructor() {
    super({
      key: 'GameOverScreen',
    });
  }
  init(params) {
    this.score = params.score;
    setScore(this.score);

    const oldHighScore = returnScore();
    if (this.score > oldHighScore) {
      setScore(this.score);
    }

    this.highScore = returnScore();
  }
  create() {
    this.add
      .text(480, 100, 'GAME OVER', { fontSize: '10em', fontFamily: 'serif' })
      .setOrigin(0.5);
    this.add
      .text(480, 250, `Your Score: ${this.score}`, {
        fontSize: '10em',
        fontFamily: 'serif',
      })
      .setOrigin(0.5);
    this.add
      .text(480, 500, '-Click to play again-', {
        fontSize: '10em',
        fontFamily: 'serif',
      })
      .setOrigin(0.5);

    this.input.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}
