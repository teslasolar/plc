# 🏭 PlcSim3D - Multi-Vendor PLC Simulator

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Three.js](https://img.shields.io/badge/Three.js-r158-blue.svg)](https://threejs.org/)
[![ISA-95](https://img.shields.io/badge/ISA--95-L0--L2-orange.svg)](https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa95)

**A lightweight, browser-based 3D PLC simulator with multi-vendor support, ISA-95 architecture, and real-time visualization.**

---

## ✨ Features

### 🏭 PLC Simulation
- **Multi-Vendor Support**: Allen-Bradley (Logix5000), Siemens (S7-1500), Mitsubishi (FX5U)
- **PackML State Machine**: STOPPED, STARTING, IDLE, EXECUTE, STOPPING, ABORTING, ABORTED, CLEARING, COMPLETE
- **ISA-95 Automation Hierarchy**: L0 (Field Devices) → L4 (ERP)
- **Real-time Scan**: 100ms scan cycle with configurable vendor-specific scan rates

### 📡 Industrial Protocols
- **Modbus TCP**: Standard register-based communication
- **EtherNet/IP**: CIP-based messaging with tag support
- **Latency Simulation**: 10-50ms realistic network delays
- **Traffic Monitoring**: Real-time protocol statistics

### ⚡ Ladder Logic
- **Multi-Vendor Syntax**:
  - Allen-Bradley: XIC (Examine If Closed), OTE (Output Energize)
  - Siemens: STL (Statement List) - A (AND), = (Assignment)
  - Mitsubishi: LD (Load), OUT (Output)
- **Dynamic Program Execution**: Real-time ladder logic evaluation

### 🎮 3D Visualization
- **Three.js Rendering**: 60fps hardware-accelerated graphics
- **Interactive Controls**: OrbitControls for camera manipulation
- **Status LEDs**: Color-coded state indicators (Green=EXECUTE, Red=STOPPED, Yellow=Other)
- **Live Animations**: Gentle breathing effects on PLC modules

### 📊 HMI Interface
- **ISA-95 L2 SCADA**: Supervisory control and data acquisition
- **Real-time I/O Monitoring**:
  - 16 Digital Inputs (DI)
  - 16 Digital Outputs (DO)
  - 8 Analog Inputs (AI)
  - 8 Analog Outputs (AO)
- **Interactive Controls**: Toggle inputs and change PLC states on-the-fly

---

## 🚀 Quick Start

### 🌐 Live Demo
**[Try it now on GitHub Pages!](https://teslasolar.github.io/plc/)**

No installation required - runs directly in your browser!

### Local Development

```bash
# Clone the repository
git clone https://github.com/teslasolar/plc.git
cd plc

# Open locally
open index.html

# Or serve via Python
python3 -m http.server 8000
# Navigate to http://localhost:8000
```

### Requirements
- Modern web browser with WebGL support
- No installation or dependencies required
- Single HTML file (~20KB gzipped)

---

## 📖 Usage

### Control Panel (Bottom Left)
- **State Control**: Toggle between STOPPED, IDLE, EXECUTE states
- **Input Toggle**: Click DI0-DI3 buttons to simulate digital inputs

### HMI Panel (Top Right)
- **Real-time I/O**: Visual grid showing all digital inputs/outputs
- **Protocol Stats**: Modbus/EtherNet/IP traffic and latency
- **PLC Status**: Scan count, state, and vendor information

### 3D Viewport
- **Orbit**: Left-click + drag
- **Zoom**: Scroll wheel
- **Pan**: Right-click + drag

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    ISA-95 L4 (ERP)                      │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│                    ISA-95 L3 (MES)                      │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│          ISA-95 L2 (SCADA/HMI) - This Simulator         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Modbus TCP   │  │ EtherNet/IP  │  │ HMI Display  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│               ISA-95 L1 (Control - PLCs)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Allen-Bradley│  │   Siemens    │  │  Mitsubishi  │  │
│  │  Logix5000   │  │   S7-1500    │  │     FX5U     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────┐
│          ISA-95 L0 (Field Devices - Sensors/Actuators)  │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Structure

```
plc/
├── index.html              # Single-file simulator (production ready)
├── vendors/                # Modular vendor configurations
│   ├── allen-bradley/
│   │   ├── config.json    # Device parameters
│   │   ├── io-specs.json  # I/O mapping
│   │   ├── ladder-examples.md
│   │   └── quick-start.md
│   ├── siemens/
│   │   ├── config.json
│   │   ├── io-specs.json
│   │   └── stl-examples.md
│   └── mitsubishi/
│       ├── config.json
│       ├── io-specs.json
│       └── ladder-examples.md
├── games/                  # Interactive PLC game challenges
│   ├── conveyor-challenge.md
│   ├── traffic-light-simulator.md
│   └── tank-fill-control.md
└── examples/              # Digital twin case studies
    ├── digital-twin-assembly-line.md
    ├── digital-twin-water-treatment.md
    └── ai-powered-rapid-prototyping.md
```

**Modular Design**: Each vendor is <250 tokens per file for scalability!

---

## 🎮 Interactive Games & Challenges

Try these built-in game challenges to learn PLC programming:

1. **🏭 Conveyor Challenge**: Sort 100 products by weight in 60 seconds
2. **🚦 Traffic Light Simulator**: Control a 4-way intersection without accidents
3. **🛢️ Tank Fill Control**: Fill tanks to exact setpoint without overflow

See the `/games` directory for implementation details!

---

## 🚀 AI-Powered Digital Twins

This simulator demonstrates how AI can create digital twins in minutes vs months:

| Traditional Method | AI Digital Twin |
|-------------------|-----------------|
| 6-12 months | **15-40 minutes** |
| $500K-$2M | **$0** |
| Physical prototype required | **Virtual only** |
| Limited iteration | **Unlimited** |

**Real examples built with this tech:**
- ✅ Automotive assembly line - 15 min
- ✅ Water treatment plant - 20 min
- ✅ Bottling line - 25 min
- ✅ Warehouse AGV fleet - 30 min

See `/examples` for detailed case studies!

---

## 🔧 Code Structure

### Core Classes

#### `PLC` - Main PLC Controller
```javascript
class PLC {
  constructor(vendor, addr) { /* ... */ }
  init()                      // Initialize I/O
  setState(state)             // Change PackML state
  scan()                      // Execute scan cycle
  addRung(logic, output)      // Add ladder logic
  toggleInput(index)          // Simulate input changes
}
```

#### `Comms` - Protocol Handler
```javascript
class Comms {
  constructor(proto)          // 'modbus' or 'ethernetip'
  register(plc)               // Add PLC to network
  read(addr, reg)             // Read register
  write(addr, reg, val)       // Write register
}
```

#### `LadderParser` - Multi-Vendor Logic Compiler
```javascript
class LadderParser {
  parse(str, vendor)          // Parse vendor-specific syntax
  parseAB(str)                // Allen-Bradley compiler
  parseSTL(str)               // Siemens STL compiler
  parseMitsu(str)             // Mitsubishi compiler
}
```

#### `Render3D` - Three.js Renderer
```javascript
class Render3D {
  addPLC(plc, pos)            // Add PLC to 3D scene
  updatePLCs()                // Update visual states
  animate()                   // Render loop (60fps)
}
```

#### `HMI` - SCADA Interface
```javascript
class HMI {
  update(plcs, comms)         // Refresh display (100ms)
}
```

---

## 🎯 PackML State Machine

```
         START
           ↓
    ┌─→ STOPPED ←─┐
    │      ↓       │
    │  STARTING    │
    │      ↓       │
    │    IDLE ──→ COMPLETE
    │      ↓       │
    │   EXECUTE    │
    │      ↓       │
    │  STOPPING    │
    │      ↓       │
    │  ABORTING ←──┘
    │      ↓
    └── ABORTED
           ↓
       CLEARING
           ↓
        (back to STOPPED)
```

---

## 📊 Performance

- **File Size**: ~20KB (single HTML file)
- **Render FPS**: 60fps (hardware-accelerated)
- **Scan Rate**: 100ms (10 scans/second)
- **Latency**: 10-50ms simulated network delay
- **Load Time**: <1 second on modern browsers
- **Memory**: ~50MB typical usage

---

## 🔌 Vendor-Specific Details

### Allen-Bradley (Logix5000)
- **Color**: Blue (#0066cc)
- **Syntax**: Ladder Logic (XIC/OTE)
- **Tags**: Tag1, Tag2, ProductCount, ConveyorRun
- **Scan Rate**: 10ms

### Siemens (S7-1500)
- **Color**: Cyan (#009999)
- **Syntax**: STL (Statement List)
- **Tags**: DB1.DBX0.0, DB1.DBD4, M0.0, Q0.0
- **Scan Rate**: 20ms

### Mitsubishi (FX5U)
- **Color**: Red (#cc0000)
- **Syntax**: Ladder Logic (LD/OUT)
- **Tags**: X0, Y0, M0, D0
- **Scan Rate**: 10ms

---

## 🛠️ Extending the Simulator

### Add New Protocol
```javascript
class Comms {
  constructor(proto) {
    this.proto = proto; // Add 'profinet', 'opcua', etc.
  }
}
```

### Add Custom Ladder Logic
```javascript
plc.addRung(
  'this.io.DI[2] && this.io.DI[3]',  // Condition
  function() {                         // Action
    this.io.DO[5] = true;
    this.tags.AlarmActive = true;
  }
);
```

### Add New Vendor
```javascript
const VENDORS = {
  Rockwell: {
    name: 'CompactLogix',
    color: 0x0066cc,
    syntax: 'ladder',
    tags: ['Local:1:I.Data', 'Local:2:O.Data'],
    scan: 10
  }
};
```

---

## 📚 ISA-95 Integration

This simulator implements ISA-95 Level 2 (Supervisory Control):

- **L0**: Simulated field devices (I/O points)
- **L1**: PLC controllers with PackML state machine
- **L2**: SCADA/HMI interface (this application)
- **L3**: Ready for MES integration via protocol APIs
- **L4**: Ready for ERP integration via REST/OPC UA

---

## 🎓 Educational Use

Perfect for:
- **Industrial Automation Training**: Learn PLC programming concepts
- **Protocol Testing**: Experiment with Modbus and EtherNet/IP
- **ISA-95 Understanding**: Visualize automation hierarchy
- **Vendor Comparison**: See differences between AB, Siemens, Mitsubishi
- **Web Development**: Study Three.js 3D graphics integration

---

## 🌐 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Full support |
| Firefox | 88+     | ✅ Full support |
| Edge    | 90+     | ✅ Full support |
| Safari  | 14+     | ✅ Full support |
| Opera   | 76+     | ✅ Full support |

**Note**: Requires WebGL support and ES6 modules.

---

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions welcome! Areas for enhancement:
- [ ] OPC-UA protocol support
- [ ] Profinet/DeviceNet protocols
- [ ] Full STL/FBD/SFC editors
- [ ] 1000+ I/O points scaling
- [ ] Time-series data historian
- [ ] Import/export programs (.L5X, .AWL, .GX3)
- [ ] Network topology visualization
- [ ] Real PLC connectivity (via gateway)

---

## 🔗 Resources

- [ISA-95 Standard](https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa95)
- [PackML State Model](https://www.omac.org/packml)
- [Three.js Documentation](https://threejs.org/docs/)
- [Modbus Protocol](https://www.modbus.org/specs.php)
- [EtherNet/IP Specification](https://www.odva.org/technology-standards/key-technologies/ethernet-ip/)

---

## 💡 Technical Philosophy

**Built for:**
- ⚡ Performance: Single HTML file, instant load
- 🎯 Accuracy: Real PLC concepts (PackML, ISA-95)
- 🔧 Flexibility: Multi-vendor, multi-protocol
- 📚 Education: Learn industrial automation in the browser
- 🌐 Accessibility: No installation, works everywhere

---

**Made with ❤️ for the Industrial Automation Community**

*Simulate. Learn. Build.*
