import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-orbit',
  standalone: true,
  templateUrl: './orbit.component.html',
  styleUrls: ['./orbit.component.scss']
})
export class OrbitComponent implements OnInit, AfterViewInit {

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scene = new THREE.Scene();

      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.z = 20;

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const container = document.getElementById('container');
      if (container) {
        container.appendChild(this.renderer.domElement);

        this.renderer.setSize(container.clientWidth, container.clientHeight);

        const horizontalPoints = [
          new THREE.Vector3(-10, 0, 0),
          new THREE.Vector3(10, 0, 0)
        ];
        const horizontalGeometry = new THREE.BufferGeometry().setFromPoints(horizontalPoints);
        const horizontalMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        const horizontalLine = new THREE.Line(horizontalGeometry, horizontalMaterial);

        const verticalPoints = [
          new THREE.Vector3(0, -10, 0),
          new THREE.Vector3(0, 10, 0)
        ];
        const verticalGeometry = new THREE.BufferGeometry().setFromPoints(verticalPoints);
        const verticalMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
        const verticalLine = new THREE.Line(verticalGeometry, verticalMaterial);

        this.scene.add(horizontalLine);
        this.scene.add(verticalLine);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;

        this.controls.minDistance = 2;
        this.controls.maxDistance = 8;

        const animate = () => {
          requestAnimationFrame(animate);

          this.controls.update();

          this.renderer.render(this.scene, this.camera);
        };

        animate();

        window.addEventListener('resize', () => {
          if (container) {
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            this.camera.aspect = container.clientWidth / container.clientHeight;
            this.camera.updateProjectionMatrix();
          }
        });
      }
    }
  }
}
