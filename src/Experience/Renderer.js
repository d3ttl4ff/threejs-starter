import * as THREE from 'three';
import Experience from './Experience.js';

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.canvas = this.experience.canvas;
    this.debug = this.experience.debug;

    // Options
    if (this.debug.active) {
      this.rendererTweaks = this.debug.ui.pages[0].addFolder({
        title: 'Renderer Tweaks',
        expanded: false,
      });
    }
    this.debugObject = {};

    this.setIntance();
  }

  setIntance() {
    // Debug parameters
    this.debugObject.clearColor = '#05070f';

    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setClearColor(this.debugObject.clearColor);
    this.instance.setPixelRatio(this.sizes.pixelRatio);

    // Debug
    if (this.debug.active) {
      this.rendererTweaks
        .addBinding(this.debugObject, 'clearColor')
        .on('change', () => {
          this.instance.setClearColor(this.debugObject.clearColor);
        });
    }
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
