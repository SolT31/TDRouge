
import { Physics } from 'phaser'

export interface Weapon {
  fire: (enemy: Physics.Arcade.Body) => void
}
