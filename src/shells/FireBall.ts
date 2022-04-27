import { Scene, Physics, Math } from 'phaser'
import { Weapon } from './types'

class FireBall extends Physics.Arcade.Image {
  #scene
  #currentEnemy = null

  constructor (scene: Scene, x: number, y: number) {
    super(scene, x, y, 'fireball')
    this.#scene = scene
  }

  fire (enemy) {
    this.#currentEnemy = enemy

    this.body.reset(400, 300)
    const angle = Math.Angle.Between(this.x, this.y, enemy.x, enemy.y)
    this.setAngle(Math.RadToDeg(angle))

    this.setActive(true)
    this.setVisible(true)
  }

  preUpdate () {
    if (this.#currentEnemy) {
      const enemy = this.#currentEnemy

      const angle = Math.Angle.Between(this.x, this.y, enemy.x, enemy.y)
      this.setAngle(Math.RadToDeg(angle))
      this.#scene.physics.moveToObject(this, enemy, 200)

      this.#scene.physics.overlap(this, enemy.gameObject, () => {
        this.setActive(false)
        this.setVisible(false)
      })
    }
  }
}

class FireBalls extends Physics.Arcade.Group implements Weapon {
  #scene: Scene
  fireRate = 300;
  nextFire = 0;

  constructor (scene: Scene) {
    super(scene.physics.world, scene)
    this.#scene = scene

    this.createMultiple({
      frameQuantity: 5,
      key: 'bullet',
      active: false,
      visible: false,
      classType: FireBall
    })
  }

  fire (enemy) {
    if (this.#scene.time.now < this.nextFire) return
    this.nextFire = this.#scene.time.now + this.fireRate

    const bullet = this.getFirstDead(false)
    if (bullet) bullet.fire(enemy)
  }
}

export default FireBalls
