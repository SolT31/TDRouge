import Phaser from 'phaser'

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor (scene: Phaser.Scene, x: number, y: number, sprite: string) {
    super(scene, x, y, sprite)
    this.state = 'enemy'
    scene.physics.add.existing(this)
    scene.add.existing(this)
    this.body.setCircle(25, 10, 10)
  }
}
