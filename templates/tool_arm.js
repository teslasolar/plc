// 🔧 Tool Arm Template
function createToolArm(scene, pos, toolType = 'drill') {
    const group = new THREE.Group();
    group.position.set(pos.x, pos.y, pos.z);

    // Base
    const baseGeo = new THREE.BoxGeometry(2, 0.5, 2);
    const baseMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    group.add(base);

    // Arm
    const armGeo = new THREE.CylinderGeometry(0.3, 0.4, 4, 12);
    const armMat = new THREE.MeshPhongMaterial({ color: 0x666666, shininess: 50 });
    const arm = new THREE.Mesh(armGeo, armMat);
    arm.position.y = 2.5;
    group.add(arm);

    // Tool head
    let tool;
    if (toolType === 'drill') {
        const drillGeo = new THREE.CylinderGeometry(0.1, 0.2, 1.5, 16);
        const drillMat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, metalness: 0.8 });
        tool = new THREE.Mesh(drillGeo, drillMat);
        tool.position.y = 5.5;
    } else if (toolType === 'welder') {
        const welderGeo = new THREE.ConeGeometry(0.3, 1, 8);
        const welderMat = new THREE.MeshPhongMaterial({ color: 0xff6600, emissive: 0xff3300 });
        tool = new THREE.Mesh(welderGeo, welderMat);
        tool.position.y = 5.3;
        tool.rotation.x = Math.PI;
    } else {
        const gripperGeo = new THREE.BoxGeometry(0.8, 0.3, 0.3);
        const gripperMat = new THREE.MeshPhongMaterial({ color: 0x888888 });
        tool = new THREE.Mesh(gripperGeo, gripperMat);
        tool.position.y = 5.5;
    }

    group.add(tool);

    // Animation
    group.userData.animate = (time) => {
        arm.rotation.y = Math.sin(time * 0.5) * 0.5;
        if (toolType === 'drill') {
            tool.rotation.y = time * 5;
        } else if (toolType === 'welder') {
            tool.material.emissiveIntensity = 0.5 + Math.sin(time * 10) * 0.5;
        }
    };

    scene.add(group);
    return group;
}
