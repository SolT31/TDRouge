import { Scene, Physics, GameObjects } from 'phaser'
import FireBalls from '@/shells/FireBall'

type Options = {
  range?: number,
  Weapon?: typeof FireBalls
}

export class TowerObject extends Physics.Arcade.Image {
  constructor (scene: Scene, x: number, y: number, sprite: string) {
    super(scene, x, y, sprite)
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
  #weapon: FireBalls | undefined

  constructor (scene: Scene, x: number, y: number, sprite: string, opts: Options = {}) {
    super(scene, x, y)

    this.width = 300
    this.height = 300

    this.#object = new TowerObject(scene, 0, 0, sprite)
    this.#range = new Range(scene, 0, 0, 150)

    this.#weapon = new opts.Weapon(scene, this)

    this.add([this.#object, this.#range])
    scene.add.existing(this)

    console.log(this)
  }

  getCenter () {
    return {
      x: this.x,
      y: this.y
    }
  }

  observe (enemies) {
    this.scene.physics.overlap(enemies, this.#range, (enemy) => {
      this.#weapon?.fire(enemy)
    })
  }

  destroy (fromScene?: boolean): void {
    this.#weapon.destroy(true)
    super.destroy(fromScene)
  }
}
