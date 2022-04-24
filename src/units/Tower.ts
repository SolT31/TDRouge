
import Phaser from 'phaser'

type Position = {
  x: number,
  y: number
}

class Tower {
  #position: Position
  #range: Phaser.GameObjects.Arc
  #sprite: Phaser.GameObjects.Arc

  constructor (scene: Phaser.Scene, x: number, y: number) {
    console.log(scene)

    this.#position = { x, y }

    // Разобраться почему не работает
    // this.#sprite = new Phaser.GameObjects.Arc(scene, x - 10, y - 10, 20, 0x6666ff)
    // scene.add.existing(this.#sprite)

    this.#sprite = scene.add.circle(x, y, 20, 0x6666ff)
    this.#range = scene.add.circle(x, y, 100)
    scene.add.circle(x, y, 20, 0x6666ff)

    console.log(this.#sprite)

    // scene.sys.displayList.add(this.#sprite)
    // scene.sys.updateList.add(this.#sprite)
  }

  intersecting (enemyArray: Array<Phaser.GameObjects.Shape>): Array<Phaser.GameObjects.Shape> {
    return enemyArray.filter(e => Phaser.Geom.Intersects.CircleToCircle(this.#range, e))
  }

  get x () {
    return this.#position.x
  }

  set x (val) {
    this.#position.x = val
  }

  get y () {
    return this.#position.y
  }

  set y (val) {
    this.#position.y = val
  }
}

export default Tower
