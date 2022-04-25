import { GameObjects, Scene } from 'phaser'

export default class Enemy {
  #scene: Scene
  #image: GameObjects.Image

  constructor (scene: Scene, x: number, y: number, sprite: string) {
    this.#scene = scene
    this.#image = this.#scene.add.image(x, y, sprite)
  }
}
