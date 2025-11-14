// ⚡ Power Core Template
function createPowerCore(scene, pos, intensity = 1.0) {
    const group = new THREE.Group();
    group.position.set(pos.x, pos.y, pos.z);

    // Core sphere
    const coreGeo = new THREE.SphereGeometry(2, 32, 32);
    const coreMat = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        emissive: 0x0088ff,
        emissiveIntensity: intensity,
        shininess: 100,
        transparent: true,
        opacity: 0.8
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Inner glow
    const glowGeo = new THREE.SphereGeometry(1.5, 24, 24);
    const glowMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    group.add(glow);

    // Outer rings
    for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(2.5 + i * 0.5, 0.1, 8, 32);
        const ringMat = new THREE.MeshPhongMaterial({
            color: 0x00ffff,
            emissive: 0x00aaff,
            transparent: true,
            opacity: 0.6
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2 + (i * 0.3);
        group.add(ring);
        ring.userData.offset = i;
    }

    // Point light
    const light = new THREE.PointLight(0x00ffff, intensity * 2, 20);
    group.add(light);

    // Animation
    group.userData.animate = (time) => {
        core.rotation.y = time * 0.5;
        glow.scale.setScalar(1 + Math.sin(time * 2) * 0.1);

        group.children.forEach((child, idx) => {
            if (child.userData.offset !== undefined) {
                child.rotation.z = time + child.userData.offset;
            }
        });
    };

    scene.add(group);
    return group;
}
