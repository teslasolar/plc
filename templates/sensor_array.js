// 🛰️ Sensor Array Template
function createSensorArray(scene, pos, count = 6) {
    const group = new THREE.Group();
    group.position.set(pos.x, pos.y, pos.z);

    // Central hub
    const hubGeo = new THREE.CylinderGeometry(0.8, 1, 1.5, 8);
    const hubMat = new THREE.MeshPhongMaterial({ color: 0x444444, shininess: 50 });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    group.add(hub);

    // Create sensors in circle
    const sensors = [];
    const radius = 2;

    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;

        // Sensor arm
        const armGeo = new THREE.BoxGeometry(0.2, 0.2, 1.5);
        const armMat = new THREE.MeshPhongMaterial({ color: 0x666666 });
        const arm = new THREE.Mesh(armGeo, armMat);

        // Sensor head
        const headGeo = new THREE.SphereGeometry(0.3, 12, 12);
        const headMat = new THREE.MeshPhongMaterial({
            color: 0xff6600,
            emissive: 0xff3300,
            emissiveIntensity: 0.5
        });
        const head = new THREE.Mesh(headGeo, headMat);

        // Position
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        arm.position.set(x * 0.5, 0, z * 0.5);
        arm.rotation.y = angle;

        head.position.set(x, 0, z);

        group.add(arm);
        group.add(head);
        sensors.push({ arm, head, angle });
    }

    // Animation
    group.userData.animate = (time) => {
        hub.rotation.y = time * 0.3;

        sensors.forEach((sensor, idx) => {
            const pulse = Math.sin(time * 3 + idx) * 0.5 + 0.5;
            sensor.head.material.emissiveIntensity = pulse;
            sensor.head.scale.setScalar(1 + pulse * 0.1);
        });
    };

    scene.add(group);
    return group;
}
