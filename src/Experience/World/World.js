import Experience from '../Experience.js';
import Base from './Base.js';

export default class World {
  constructor() {
    this.experience = new Experience();

    this.base = new Base();
  }

  update() {}
}
