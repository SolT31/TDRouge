import Phaser from 'phaser'

import tilemapData from '@/units/tilemapData'

import SpriteEnemy from '@/assets/enemy.png'
import SpriteTower from '@/assets/tower.png'
import SpriteDirt from '@/assets/dirt.png'
import SpriteFireball from '@/assets/fireball.png'

enum Direction {
  Left = 'left',
  Right = 'right'
}

let enemy: Phaser.GameObjects.Image
let circ: Phaser.GameObjects.Arc

let direction: Direction = Direction.Right
const enemies: Array<Phaser.GameObjects.Image> = []
const bullets: Array<Phaser.GameObjects.Image> = []

const ENEMY_SPEED = 1

export default class Demo extends Phaser.Scene {
  fireRate = 1000;
  nextFire = 0;
  pause = false

  constructor () {
    super('GameScene')
  }

  preload () {
    this.load.image('Dirt', SpriteDirt)

    this.load.image('tower', SpriteTower)
    this.load.image('enemy', SpriteEnemy)
    this.load.image('fireball', SpriteFireball)
  }

  create () {
    const { width, height } = this.sys.canvas

    const map = this.make.tilemap({ data: tilemapData(width, height, 64), tileWidth: 64, tileHeight: 64 })
    const tileSet = map.addTilesetImage('Dirt')
    map.createLayer(0, tileSet, 0, 0)

    this.add.image(width / 2, height / 2, 'tower')

    enemy = this.physics.add.image(100, 200, 'enemy')
    enemy.state = 'enemy'

    enemies.push(enemy)
    circ = this.add.circle(400, 300, 150).setStrokeStyle(2, 0xffff00)

    console.log(enemy)
  }

  fire (time: number, enemy) {
    if (time < this.nextFire) return
    this.nextFire = time + this.fireRate

    const { width, height } = this.sys.canvas
    const fireBall = this.physics.add.image(width / 2, height / 2, 'fireball')
    bullets.push(fireBall)

    // console.log(enemy.x, fireBall.x)

    const angle = Phaser.Math.Angle.Between(fireBall.x, fireBall.y, enemy.x, enemy.y)

    // console.log(angle)

    fireBall.setAngle(Phaser.Math.RadToDeg(angle))
    this.physics.moveToObject(fireBall, enemy, 300)

    //
    // console.log(enemy)
    // console.log(fireBall)
    // Phaser.Math.Angle.Between(10, 10, 0, 0)

    // fireBall.setVelocity(0, 0)
  }

  update (time: number) {
    if (this.pause) return

    if (direction === Direction.Right && enemy.x + ENEMY_SPEED >= this.sys.canvas.width) {
      direction = Direction.Left
    }

    if (direction === Direction.Left && enemy.x - ENEMY_SPEED <= 0) {
      direction = Direction.Right
    }

    const offset = direction === Direction.Left ? -ENEMY_SPEED : ENEMY_SPEED
    enemy.setPosition(enemy.x + offset, enemy.y)

    const bodies = this.physics.overlapCirc(circ.x, circ.y, circ.radius, true, true)

    const enemiesBodies = bodies.filter(e => e.gameObject.state === 'enemy')

    // if (bodies.length) {
    //   this.pause = true
    //   console.log(bodies[0])
    // }

    if (enemiesBodies.length) {
      this.fire(time, enemiesBodies[0])
    }
  }
}
