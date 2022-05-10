import { Scene, Physics, Math } from 'phaser'
import { Weapon } from './types'
import Tower from '@/units/Tower'

class FireBall extends Physics.Arcade.Image {
  #scene
  #currentEnemy = null

  constructor (scene: Scene, x: number, y: number) {
    super(scene, x, y, 'fireball')
    this.#scene = scene
    
    this.width = 20
    this.height = 20
    this.x = 100

    console.log(this)
  }

  fire (enemy, x, y) {
    this.#currentEnemy = enemy
    this.body.reset(x, y)

    const angle = Math.Angle.Between(this.x, this.y, enemy.x, enemy.y)
    this.setAngle(Math.RadToDeg(angle))

    this.setActive(true)
    this.setVisible(true)
  }

  preUpdate () {
    if (this.#currentEnemy) {
      const enemy = this.#currentEnemy

      const angle = Math.Angle.Between(this.body.x, this.body.y, enemy.x, enemy.y)
      this.setAngle(Math.RadToDeg(angle))
      this.#scene.physics.moveTo(this, enemy.x, enemy.y, 200)

      this.#scene.physics.overlap(this, enemy, () => {
        this.setActive(false)
        this.setVisible(false)
      })
    }
  }
}

class FireBalls extends Physics.Arcade.Group implements Weapon {
  #scene: Scene
  #tower: Tower

  fireRate = 300;
  nextFire = 0;

  constructor (scene: Scene, tower: Tower) {
    super(scene.physics.world, scene)
    this.#scene = scene
    this.#tower = tower

    this.createMultiple({
      frameQuantity: 5,
      key: 'fireball',
      active: false,
      visible: false,
      classType: FireBall
    })

    this.children.each(element => {
      const body = element.body as Physics.Arcade.Body
      const { x, y } = this.#tower
      body.setCircle(10, 0, 0)
      body.reset(x, y)
    })
  }

  fire (enemy) {
    if (this.#scene.time.now < this.nextFire) return
    this.nextFire = this.#scene.time.now + this.fireRate

    const bullet = this.getFirstDead(false)
    if (bullet) {
      const { x, y } = this.#tower
      bullet.fire(enemy, x, y)
    }
  }
}

export default FireBalls
