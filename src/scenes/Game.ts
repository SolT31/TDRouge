import Phaser from 'phaser'

import tilemapData from '@/utils/tilemapData'

import SpriteEnemy from '@/assets/enemy.png'
import SpriteDirt from '@/assets/dirt1.png.preview.jpg'
import SpriteFireball from '@/assets/fireball.png'
import SpriteTower from '@/assets/tower.png'

import Tower from '@/units/Tower'

import FireBalls from '@/shells/FireBall'

enum Direction {
  Left = 'left',
  Right = 'right'
}

let enemy: Phaser.GameObjects.Image

let tower: Tower
let direction: Direction = Direction.Right
const enemies: Array<Phaser.GameObjects.Image> = []

const ENEMY_SPEED = 3

export default class Demo extends Phaser.Scene {
  pause = false
  fireBall: Phaser.GameObjects.Image | null = null
  bullets: Phaser.Physics.Arcade.Group | null = null

  constructor () {
    super('GameScene')
  }

  preload () {
    this.load.image('tower', SpriteTower)
    this.load.image('Dirt', SpriteDirt)
    this.load.image('enemy', SpriteEnemy)
    this.load.image('fireball', SpriteFireball)
  }

  create () {
    const { width, height } = this.sys.canvas

    const map = this.make.tilemap({ data: tilemapData(width, height, 256), tileWidth: 512, tileHeight: 512 })
    const tileSet = map.addTilesetImage('Dirt')
    map.createLayer(0, tileSet, 0, 0)

    tower = new Tower(this, width / 2, height / 2, {
      weapon: new FireBalls(this)
    })
    this.add.existing(tower)

    enemy = this.physics.add.image(100, 100, 'enemy')
    enemy.state = 'enemy'

    enemies.push(enemy)
  }

  update () {
    if (this.pause) return

    if (direction === Direction.Right && enemy.x + ENEMY_SPEED >= this.sys.canvas.width) {
      direction = Direction.Left
    }

    if (direction === Direction.Left && enemy.x - ENEMY_SPEED <= 0) {
      direction = Direction.Right
    }

    const offset = direction === Direction.Left ? -ENEMY_SPEED : ENEMY_SPEED
    enemy.setPosition(enemy.x + offset, enemy.y)

    tower.overlap()
  }
}
