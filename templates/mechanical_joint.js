// 🔩 Mechanical Joint Template
function createMechanicalJoint(scene, pos, jointType = 'revolute', axis = 'y') {
    const group = new THREE.Group();
    group.position.set(pos.x, pos.y, pos.z);

    // Base mount
    const mountGeo = new THREE.BoxGeometry(1.5, 0.5, 1.5);
    const mountMat = new THREE.MeshPhongMaterial({ color: 0x444444 });
    const mount = new THREE.Mesh(mountGeo, mountMat);
    group.add(mount);

    // Joint assembly
    const joint = new THREE.Group();
    joint.position.y = 0.5;

    if (jointType === 'revolute') {
        // Rotating joint
        const axisGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 16);
        const axisMat = new THREE.MeshPhongMaterial({ color: 0x888888, metalness: 0.7 });
        const axisM = new THREE.Mesh(axisGeo, axisMat);
        axisM.rotation.z = Math.PI / 2;
        joint.add(axisM);

        const armGeo = new THREE.BoxGeometry(2, 0.5, 0.5);
        const armMat = new THREE.MeshPhongMaterial({ color: 0xff6600 });
        const arm = new THREE.Mesh(armGeo, armMat);
        arm.position.set(1, 0.3, 0);
        joint.add(arm);

        joint.userData.type = 'revolute';
    } else if (jointType === 'prismatic') {
        // Linear sliding joint
        const railGeo = new THREE.BoxGeometry(3, 0.3, 0.3);
        const railMat = new THREE.MeshPhongMaterial({ color: 0x666666 });
        const rail = new THREE.Mesh(railGeo, railMat);
        joint.add(rail);

        const sliderGeo = new THREE.BoxGeometry(0.8, 0.6, 0.6);
        const sliderMat = new THREE.MeshPhongMaterial({ color: 0x00ff88 });
        const slider = new THREE.Mesh(sliderGeo, sliderMat);
        slider.position.y = 0.3;
        joint.add(slider);

        joint.userData.type = 'prismatic';
        joint.userData.slider = slider;
    } else {
        // Ball joint
        const ballGeo = new THREE.SphereGeometry(0.6, 16, 16);
        const ballMat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, metalness: 0.8 });
        const ball = new THREE.Mesh(ballGeo, ballMat);
        joint.add(ball);

        const socketGeo = new THREE.SphereGeometry(0.7, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const socketMat = new THREE.MeshPhongMaterial({ color: 0x555555 });
        const socket = new THREE.Mesh(socketGeo, socketMat);
        joint.add(socket);

        joint.userData.type = 'ball';
        joint.userData.ball = ball;
    }

    group.add(joint);
    joint.userData.axis = axis;

    // Animation
    group.userData.animate = (time) => {
        if (joint.userData.type === 'revolute') {
            joint.rotation[axis] = time;
        } else if (joint.userData.type === 'prismatic') {
            joint.userData.slider.position.x = Math.sin(time) * 1.2;
        } else {
            joint.userData.ball.rotation.x = time * 0.5;
            joint.userData.ball.rotation.y = time * 0.3;
        }
    };

    scene.add(group);
    return group;
}
