import { Scene, Physics, GameObjects } from 'phaser'
import { Weapon } from '../shells/types'

type Options = {
  range?: number,
  weapon?: Weapon
}

export class TowerObject extends Physics.Arcade.Image {
  constructor (scene: Scene, x: number, y: number, sprite: string) {
    super(scene, x, y, sprite)
    this.state = 'enemy'
    scene.physics.add.existing(this)
    scene.add.existing(this)
    this.body.setCircle(32, 0, 0)
  }
}

export class Range extends GameObjects.Zone {
  constructor (scene: Scene, x: number, y: number, radius: number) {
    super(scene, x, y, radius * 2, radius * 2)
    this.body = new Physics.Arcade.Body(scene.physics.world, this)
    this.body.setCircle(radius)
    scene.physics.add.existing(this)
  }
}

export default class Tower extends GameObjects.Container {
  #object: TowerObject
  #range: Range
  #weapon: Weapon | undefined

  constructor (scene: Scene, x: number, y: number, sprite: string, opts: Options = {}) {
    super(scene, x, y)

    this.#object = new TowerObject(scene, x, y, sprite)
    this.#range = new Range(scene, x, y, 150)
    this.#weapon = opts.weapon

    this.add([this.#object, this.#range])
    scene.add.existing(this)
  }

  observe (enemies) {
    this.scene.physics.overlap(enemies, this.#range, (enemy) => {
      // console.log(enemy)
      this.#weapon?.fire(enemy)
    })
  }
}
