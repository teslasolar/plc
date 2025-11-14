// 📹 Security Camera Template
function createCamera(scene, pos, lookAt) {
    const group = new THREE.Group();
    group.position.set(pos.x, pos.y, pos.z);

    // Mount
    const mountGeo = new THREE.CylinderGeometry(0.3, 0.3, 2, 8);
    const mountMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const mount = new THREE.Mesh(mountGeo, mountMat);
    mount.rotation.x = Math.PI / 2;
    group.add(mount);

    // Camera body
    const bodyGeo = new THREE.BoxGeometry(1.2, 0.8, 1.5);
    const bodyMat = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 40 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(0, 0, -1.5);
    group.add(body);

    // Lens
    const lensGeo = new THREE.CylinderGeometry(0.4, 0.3, 0.6, 16);
    const lensMat = new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 90 });
    const lens = new THREE.Mesh(lensGeo, lensMat);
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, 0, -2.3);
    group.add(lens);

    // LED indicator
    const ledGeo = new THREE.SphereGeometry(0.1, 8, 8);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(0.4, 0.3, -0.8);
    group.add(led);

    // Look at target
    group.lookAt(lookAt.x, lookAt.y, lookAt.z);

    // Animation
    group.userData.animate = (time) => {
        group.rotation.y = Math.sin(time * 0.2) * 0.3;
        led.material.opacity = 0.5 + Math.sin(time * 5) * 0.5;
    };

    scene.add(group);
    return group;
}
