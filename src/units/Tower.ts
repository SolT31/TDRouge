import { Scene, Physics } from 'phaser'
import { Weapon } from '../shells/types'

type Options = {
  range?: number,
  weapon?: Weapon
}

export default class Tower extends Physics.Arcade.Image {
  #weapon: Weapon | null = null
  #scene: Scene
  #range: number

  constructor (scene: Scene, x: number, y: number, { range = 200, weapon }: Options) {
    super(scene, x, y, 'tower')

    this.#range = range
    this.#scene = scene
    this.#weapon = weapon || null
  }

  overlap () {
    const bodies = this.#scene.physics.overlapCirc(this.x, this.y, this.#range, true, true)

    const enemiesBodies = bodies.filter((e: Physics.Arcade.Body) => {
      return e.gameObject.state === 'enemy'
    })

    if (this.#weapon && enemiesBodies.length) {
      this.#weapon.fire(enemiesBodies[0])
    }
  }
}
