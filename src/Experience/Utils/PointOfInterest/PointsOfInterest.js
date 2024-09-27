import * as THREE from 'three';
import Experience from '../../Experience';

export default class PointsOfInterest {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setPoints();
    this.createPoints();
  }

  setPoints() {
    this.rayCaster = new THREE.Raycaster();
    this.points = [
      {
        position: new THREE.Vector3(1.55, 0.3, -0.6),
        element: null,
        context:
          'Front and top screen with HUD aggregating terrain and battle informations.',
      },
      {
        position: new THREE.Vector3(0.5, 0.8, -1.6),
        element: null,
        context:
          'Ventilation with air purifier and detection of environment toxicity.',
      },
      {
        position: new THREE.Vector3(1.6, -1.3, -0.7),
        element: null,
        context:
          'Cameras supporting night vision and heat vision with automatic adjustment.',
      },
    ];
  }

  createPoints() {
    for (let i = 0; i < this.points.length; i++) {
      if (!document.querySelector(`point`)) {
        const pointELement = document.createElement('div');
        pointELement.classList.add('point');
        pointELement.classList.add(`point-${i}`);
        document.body.appendChild(pointELement);

        const dotElement = document.createElement('div');
        dotElement.classList.add('dot');
        pointELement.appendChild(dotElement);

        const labelElement = document.createElement('div');
        labelElement.classList.add('label');
        pointELement.appendChild(labelElement);

        const largeLabelElement = document.createElement('div');
        largeLabelElement.classList.add('large-label');
        pointELement.appendChild(largeLabelElement);

        const textElement = document.createElement('div');
        textElement.classList.add('text');
        textElement.innerHTML = this.points[i].context;
        pointELement.appendChild(textElement);

        // Assign the elements to points array
        this.points[i].element = pointELement;
      }
    }

    for (const point of this.points) {
      point.element.addEventListener('mouseenter', () => {
        point.element.classList.add('hovered');
      });

      point.element.addEventListener('mouseleave', () => {
        point.element.classList.remove('hovered');
      });
    }
  }

  update() {
    // Go through each point
    for (const point of this.points) {
      const screenPosition = point.position.clone();
      screenPosition.project(this.camera.instance);

      this.rayCaster.setFromCamera(screenPosition, this.camera.instance);
      const intersects = this.rayCaster.intersectObjects(
        this.scene.children,
        true
      );

      if (intersects.length === 0) {
        point.element.classList.add('visible');
      } else {
        const intersectionDistance = intersects[0].distance;
        const pointDistance = point.position.distanceTo(
          this.camera.instance.position
        );

        if (intersectionDistance < pointDistance) {
          point.element.classList.remove('visible');
        } else {
          point.element.classList.add('visible');
        }
      }

      const translateX = screenPosition.x * this.sizes.width * 0.5;
      const translateY = -screenPosition.y * this.sizes.height * 0.5;
      point.element.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
  }
}
