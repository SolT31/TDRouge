import Phaser from 'phaser'

import tilemapData from '@/units/tilemapData'

import SpriteEnemy from '@/assets/enemy.png'
import SpriteTower from '@/assets/tower.png'
import SpriteDirt from '@/assets/dirt.png'

enum Direction {
  Left = 'left',
  Right = 'right'
}

let enemy: Phaser.GameObjects.Image
let circ: Phaser.GameObjects.Arc

let direction: Direction = Direction.Left
const enemies: Array<Phaser.GameObjects.Image> = []

const ENEMY_SPEED = 1

export default class Demo extends Phaser.Scene {
  constructor () {
    super('GameScene')
  }

  preload () {
    this.load.image('Dirt', SpriteDirt)

    this.load.image('tower', SpriteTower)
    this.load.image('enemy', SpriteEnemy)
  }

  create () {
    const { width, height } = this.sys.canvas

    const map = this.make.tilemap({ data: tilemapData(width, height, 64), tileWidth: 64, tileHeight: 64 })
    const tileSet = map.addTilesetImage('Dirt')
    map.createLayer(0, tileSet, 0, 0)

    this.add.image(width / 2, height / 2, 'tower')

    enemy = this.physics.add.image(100, 200, 'enemy')
    enemies.push(enemy)
    circ = this.add.circle(400, 300, 150).setStrokeStyle(2, 0xffff00)
  }

  update () {
    Phaser.Actions.SetBlendMode(enemies, 2)

    if (direction === Direction.Right && enemy.x + ENEMY_SPEED >= this.sys.canvas.width) {
      direction = Direction.Left
    }

    if (direction === Direction.Left && enemy.x - ENEMY_SPEED <= 0) {
      direction = Direction.Right
    }

    const offset = direction === Direction.Left ? -ENEMY_SPEED : ENEMY_SPEED
    enemy.setPosition(enemy.x + offset, enemy.y)

    const bodies = this.physics.overlapCirc(circ.x, circ.y, circ.radius, true, true)

    Phaser.Actions.SetBlendMode(bodies.map((body) => body.gameObject), 1)
  }
}
