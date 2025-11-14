# 🏭 3D Factory Templates

Modular Three.js templates for industrial automation visualization.

## 📦 Available Templates

### 🤖 Robot Arm (`robot_arm.js`)
```javascript
createRobotArm(scene, {x:0, y:0, z:0}, 0xff6600)
```
- 6-axis industrial robot
- Animated joints
- Customizable color

### 📹 Camera (`camera.js`)
```javascript
createCamera(scene, {x:10, y:5, z:0}, {x:0, y:0, z:0})
```
- Security camera with mount
- LED indicator
- Tracks target position

### 🔧 Tool Arm (`tool_arm.js`)
```javascript
createToolArm(scene, {x:0, y:0, z:0}, 'drill')
```
Types: `'drill'` | `'welder'` | `'gripper'`

### ⚡ Power Core (`power_core.js`)
```javascript
createPowerCore(scene, {x:0, y:10, z:0}, 1.0)
```
- Animated energy sphere
- Rotating rings
- Point light emission

### 🛰️ Sensor Array (`sensor_array.js`)
```javascript
createSensorArray(scene, {x:0, y:5, z:0}, 8)
```
- Configurable sensor count
- Pulsing indicators
- Radial arrangement

### 🏭 Assembly Line (`assembly_line.js`)
```javascript
createAssemblyLine(scene, {x:-10,y:0,z:0}, {x:10,y:0,z:0}, 1.5)
```
- Conveyor belt with rollers
- Adjustable width/length
- Animated movement

### 💡 Hologram (`hologram_projector.js`)
```javascript
createHologramProjector(scene, {x:0, y:0, z:0}, 'data')
```
Types: `'data'` | `'planet'` | `'text'`

### 🔩 Joint (`mechanical_joint.js`)
```javascript
createMechanicalJoint(scene, {x:0, y:0, z:0}, 'revolute', 'y')
```
Types: `'revolute'` | `'prismatic'` | `'ball'`

## 🎮 Usage

```javascript
// Import Three.js
import * as THREE from 'three';

// Load templates
const scene = new THREE.Scene();

// Create objects
const robot = createRobotArm(scene, {x:-5, y:0, z:0}, 0xff6600);
const sensor = createSensorArray(scene, {x:5, y:0, z:0}, 6);

// Animate in loop
function animate(time) {
    robot.userData.animate(time);
    sensor.userData.animate(time);
}
```

## ⚙️ Features

- **< 250 tokens** per template
- **Animated** - each has `.userData.animate(time)`
- **Customizable** - colors, sizes, types
- **Modular** - easy to combine

---

**Build time**: 20 minutes with AI!
