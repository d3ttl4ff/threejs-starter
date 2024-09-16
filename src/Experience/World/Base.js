import * as THREE from 'three';
import Experience from '../Experience';

export default class Base {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setMesh();
  }

  setMesh() {
    this.mesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 5),
      new THREE.MeshBasicMaterial({ color: '#ffffff' })
    );
    this.scene.add(this.mesh);
  }
}
