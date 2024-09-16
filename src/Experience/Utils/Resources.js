import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { gsap } from 'gsap';
import EventEmitter from './EventEmitter.js';
import Overlay from './Overlay.js';

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    // Options
    this.sources = sources;
    this.overlay = new Overlay();

    // Setup
    this.items = {};

    this.setLoadingManager();
    this.setLoaders();
    this.startLoading();
  }

  setLoadingManager() {
    const loadingBarElement = document.querySelector('.loading-bar');
    this.loadingManager = new THREE.LoadingManager(
      // Loaded
      () => {
        window.setTimeout(() => {
          // Animate overlay
          gsap.to(this.overlay.material.uniforms.uAlpha, {
            duration: 3,
            value: 0,
            delay: 1,
          });

          // Update loadingBarElement
          loadingBarElement.classList.add('ended');
          loadingBarElement.style.transform = '';

          this.trigger('ready');
        }, 500);
      },

      // Progress
      (itemUrl, itemLoaded, itemsTotal) => {
        // Calculate the progress and update the loadingBarElement
        const progressRatio = itemLoaded / itemsTotal;
        loadingBarElement.style.transform = `scaleX${progressRatio}`;
      }
    );
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader(this.loadingManager);
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(
      this.loadingManager
    );
  }

  startLoading() {
    // Load each source
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
  }
}

