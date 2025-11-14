// 💡 Hologram Projector Template
function createHologramProjector(scene, pos, holoType = 'data') {
    const group = new THREE.Group();
    group.position.set(pos.x, pos.y, pos.z);

    // Base platform
    const baseGeo = new THREE.CylinderGeometry(1, 1.2, 0.3, 16);
    const baseMat = new THREE.MeshPhongMaterial({ color: 0x222222, shininess: 60 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    group.add(base);

    // Projector ring
    const ringGeo = new THREE.TorusGeometry(0.8, 0.1, 8, 16);
    const ringMat = new THREE.MeshPhongMaterial({ color: 0x00ffff, emissive: 0x00aaff });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = 0.2;
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    // Hologram content
    let holo;
    const holoMat = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.6,
        wireframe: true
    });

    if (holoType === 'data') {
        holo = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2, 1.5), holoMat);
    } else if (holoType === 'planet') {
        holo = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), holoMat);
    } else {
        holo = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.3, 64, 8), holoMat);
    }

    holo.position.y = 3;
    group.add(holo);

    // Particles
    const particles = new THREE.Points(
        new THREE.BufferGeometry().setFromPoints(
            Array.from({length: 50}, () =>
                new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    Math.random() * 4 + 1,
                    (Math.random() - 0.5) * 2
                )
            )
        ),
        new THREE.PointsMaterial({ color: 0x00ffff, size: 0.05 })
    );
    group.add(particles);

    // Animation
    group.userData.animate = (time) => {
        ring.rotation.z = time;
        holo.rotation.y = time * 0.5;
        holo.position.y = 3 + Math.sin(time) * 0.2;
        particles.rotation.y = time * 0.2;
    };

    scene.add(group);
    return group;
}
