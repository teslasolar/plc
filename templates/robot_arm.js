// 🤖 Robot Arm Template
function createRobotArm(scene, pos, color = 0xff6600) {
    const group = new THREE.Group();
    group.position.set(pos.x, pos.y, pos.z);

    // Base
    const baseGeo = new THREE.CylinderGeometry(2, 2.5, 1, 16);
    const baseMat = new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 30 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = 0.5;
    group.add(base);

    // Lower arm
    const lowerArmGeo = new THREE.BoxGeometry(0.8, 5, 0.8);
    const armMat = new THREE.MeshPhongMaterial({ color, shininess: 60 });
    const lowerArm = new THREE.Mesh(lowerArmGeo, armMat);
    lowerArm.position.y = 3.5;
    group.add(lowerArm);

    // Joint
    const jointGeo = new THREE.SphereGeometry(0.6, 16, 16);
    const joint = new THREE.Mesh(jointGeo, armMat);
    joint.position.y = 6;
    group.add(joint);

    // Upper arm
    const upperArm = new THREE.Mesh(new THREE.BoxGeometry(0.6, 4, 0.6), armMat);
    upperArm.position.y = 8.5;
    group.add(upperArm);

    // Gripper
    const gripperGeo = new THREE.BoxGeometry(1.2, 0.4, 0.3);
    const gripper = new THREE.Mesh(gripperGeo, armMat);
    gripper.position.y = 10.8;
    group.add(gripper);

    // Animation
    group.userData.animate = (time) => {
        base.rotation.y = Math.sin(time * 0.5) * 0.5;
        lowerArm.rotation.z = Math.sin(time * 0.3) * 0.3;
        upperArm.rotation.z = Math.sin(time * 0.4 + 1) * 0.2;
    };

    scene.add(group);
    return group;
}
