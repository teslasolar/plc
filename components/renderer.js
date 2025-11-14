// 3D Renderer using Three.js
import { VENDORS } from './vendors.js';

export class Render3D {
    constructor(THREE, OrbitControls) {
        this.THREE = THREE;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);
        this.scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.body.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.camera.position.set(8, 6, 8);

        this.plcMeshes = [];
        this.clock = new THREE.Clock();
        this.fps = 60;

        this.addLights();
        this.addGrid();
        window.addEventListener('resize', () => this.onWindowResize());
    }

    addLights() {
        this.scene.add(new this.THREE.AmbientLight(0x404040, 0.5));
        const dir = new this.THREE.DirectionalLight(0xffffff, 0.8);
        dir.position.set(5, 10, 5);
        this.scene.add(dir);
    }

    addGrid() {
        this.scene.add(new this.THREE.GridHelper(20, 20, 0x00ff00, 0x003300));
        this.scene.add(new this.THREE.AxesHelper(5));
    }

    addPLC(plc, pos) {
        const vendor = VENDORS[plc.vendor];
        const geo = new this.THREE.BoxGeometry(1.2, 0.6, 0.4);
        const mat = new this.THREE.MeshPhongMaterial({ color: vendor.color, shininess: 30 });
        const mesh = new this.THREE.Mesh(geo, mat);

        const ledGeo = new this.THREE.SphereGeometry(0.05, 16, 16);
        const led = new this.THREE.Mesh(ledGeo, new this.THREE.MeshBasicMaterial({ color: 0xff0000 }));
        led.position.set(0.5, 0.2, 0.21);
        mesh.add(led);

        mesh.position.set(...pos);
        mesh.userData = { plc, led };
        this.scene.add(mesh);
        this.plcMeshes.push(mesh);
        return mesh;
    }

    updatePLCs() {
        this.plcMeshes.forEach(m => {
            const color = m.userData.plc.state === 'EXECUTE' ? 0x00ff00 : m.userData.plc.state === 'STOPPED' ? 0xff0000 : 0xffff00;
            m.userData.led.material.color.setHex(color);
            m.position.y = Math.sin(Date.now() * 0.001 + m.position.x) * 0.05;
        });
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.updatePLCs();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}
