import Phaser from 'phaser'

class Bullet extends Phaser.Physics.Arcade.Sprite {
  #scene
  #currentEnemy = null

  constructor (scene, x, y) {
    super(scene, x, y, 'fireball')
    this.#scene = scene
  }

  fire (enemy) {
    this.#currentEnemy = enemy

    this.body.reset(400, 300)
    this.setActive(true)
    this.setVisible(true)
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta)

    if (this.#currentEnemy) {
      const enemy = this.#currentEnemy

      const angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y)
      this.setAngle(Phaser.Math.RadToDeg(angle))
      this.#scene.physics.moveToObject(this, enemy, 100)

      this.#scene.physics.overlap(this, enemy, (a) => {
        this.setActive(false)
        this.setVisible(false)
      })
    }
  }
}

class Bullets extends Phaser.Physics.Arcade.Group {
  fireRate = 500;
  nextFire = 0;
  #time = 0

  constructor (scene) {
    super(scene.physics.world, scene)

    this.createMultiple({
      frameQuantity: 5,
      key: 'bullet',
      active: false,
      visible: false,
      classType: Bullet
    })
  }

  fireBullet (enemy, time) {
    if (time < this.nextFire) return
    this.nextFire = time + this.fireRate

    const bullet = this.getFirstDead(false)
    if (bullet) bullet.fire(enemy)
  }
}

export default Bullets
