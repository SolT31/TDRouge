import { GameObjects, Scene } from 'phaser'
export default class Tower {
  #range: GameObjects.Arc
  #image: GameObjects.Image
  #scene: Scene

  constructor (scene: Scene, x: number, y: number, sprite: string) {
    this.#scene = scene
    this.#image = this.#scene.add.image(x, y, sprite)
    this.#range = this.#scene.add.circle(x, y, 200)

    this.geom = new Phaser.Geom.Circle(x, y, 200)
  }

  overlap (enemies) {
    console.log()

    this.#scene.physics.overlap(this.geom, enemies, () => {
      console.log('overlap')
    })

    // return this.#scene.physics
    //   .overlapCirc(this.#range.x, this.#range.y, this.#range.radius, false, false)
  }

  fire () {
    return this.#scene.physics.add.image(this.#image.x, this.#image.y, 'fireball')
  }

  get range () {
    return this.#range
  }

  get x () {
    return this.#image.x
  }

  set x (val) {
    this.#image.x = val
    this.#range.x = val
  }

  get y () {
    return this.#image.y
  }

  set y (val) {
    this.#image.x = val
    this.#range.x = val
  }
}
