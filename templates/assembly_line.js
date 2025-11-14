// 🏭 Assembly Line / Conveyor Template
function createAssemblyLine(scene, startPos, endPos, width = 1.0) {
    const group = new THREE.Group();

    // Calculate line parameters
    const length = Math.sqrt(
        Math.pow(endPos.x - startPos.x, 2) +
        Math.pow(endPos.z - startPos.z, 2)
    );

    const centerX = (startPos.x + endPos.x) / 2;
    const centerZ = (startPos.z + endPos.z) / 2;

    const angle = Math.atan2(endPos.z - startPos.z, endPos.x - startPos.x);

    group.position.set(centerX, startPos.y, centerZ);
    group.rotation.y = angle;

    // Conveyor belt
    const beltGeo = new THREE.BoxGeometry(length, 0.2, width);
    const beltMat = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 20 });
    const belt = new THREE.Mesh(beltGeo, beltMat);
    belt.position.y = 0.6;
    group.add(belt);

    // Rollers
    const rollerCount = Math.floor(length / 2);
    const rollers = [];

    for (let i = 0; i < rollerCount; i++) {
        const rollerGeo = new THREE.CylinderGeometry(0.15, 0.15, width * 1.1, 12);
        const rollerMat = new THREE.MeshPhongMaterial({ color: 0x666666, metalness: 0.5 });
        const roller = new THREE.Mesh(rollerGeo, rollerMat);

        roller.rotation.z = Math.PI / 2;
        roller.position.x = (i / rollerCount) * length - length / 2;
        roller.position.y = 0.4;

        group.add(roller);
        rollers.push(roller);
    }

    // Support legs
    const legPositions = [-length * 0.4, 0, length * 0.4];
    legPositions.forEach(x => {
        const legGeo = new THREE.BoxGeometry(0.3, 0.6, 0.3);
        const legMat = new THREE.MeshPhongMaterial({ color: 0x555555 });
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(x, 0, 0);
        group.add(leg);
    });

    // Animation
    group.userData.animate = (time) => {
        rollers.forEach((roller, idx) => {
            roller.rotation.y = time * 2 + idx * 0.1;
        });
    };

    scene.add(group);
    return group;
}
