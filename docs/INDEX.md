# 📚 PlcSim3D Documentation Index

## 🚀 Quick Links

- **[Live Demo](https://teslasolar.github.io/plc/)** - Try it now!
- **[Main README](../README.md)** - Project overview
- **[Vendor Template](VENDOR-TEMPLATE.md)** - Add new vendors

---

## 🏭 Vendor Profiles

### Allen-Bradley (Rockwell Automation)
- [Config](../vendors/allen-bradley/config.json)
- [I/O Specs](../vendors/allen-bradley/io-specs.json)
- [Ladder Examples](../vendors/allen-bradley/ladder-examples.md)
- [Quick Start](../vendors/allen-bradley/quick-start.md)

### Siemens
- [Config](../vendors/siemens/config.json)
- [I/O Specs](../vendors/siemens/io-specs.json)
- [STL Examples](../vendors/siemens/stl-examples.md)

### Mitsubishi Electric
- [Config](../vendors/mitsubishi/config.json)
- [I/O Specs](../vendors/mitsubishi/io-specs.json)
- [Ladder Examples](../vendors/mitsubishi/ladder-examples.md)

---

## 🎮 Games & Challenges

- [Conveyor Challenge](../games/conveyor-challenge.md) - Product sorting game
- [Traffic Light Simulator](../games/traffic-light-simulator.md) - Intersection control
- [Tank Fill Control](../games/tank-fill-control.md) - Level control challenge

---

## 🚀 Digital Twin Examples

- [Assembly Line](../examples/digital-twin-assembly-line.md) - Automotive case study
- [Water Treatment](../examples/digital-twin-water-treatment.md) - Municipal plant
- [AI Rapid Prototyping](../examples/ai-powered-rapid-prototyping.md) - Speed comparison

---

## 📖 Architecture

### Core Components
- **PLC Core**: PackML state machine, ISA-95 integration
- **Communications**: Modbus TCP, EtherNet/IP protocols
- **3D Renderer**: Three.js visualization engine
- **HMI**: Real-time SCADA interface
- **Ladder Parser**: Multi-vendor logic compiler

### File Structure
```
plc/
├── index.html              # Main simulator
├── vendors/                # Vendor configs (modular)
├── games/                  # Interactive challenges
├── examples/              # Digital twin demos
└── docs/                  # Documentation
```

---

## 🔧 Development

### Adding Features
1. Fork the repository
2. Create feature branch
3. Follow <250 token file rule
4. Test in browser
5. Submit PR

### Modular Design Benefits
- ✅ Easy to maintain
- ✅ Scalable architecture
- ✅ Fast loading
- ✅ Version control friendly
- ✅ AI-friendly (small context)

---

## 📊 Performance Targets

- HTML file: < 5MB
- Render: 60fps
- Scan: 100ms
- Load: < 1s
- Files: < 250 tokens each

---

## 🌐 Deployment

### GitHub Pages
```bash
git push origin main
# Enable Pages in repo settings
# Point to root directory
```

### Local Testing
```bash
python3 -m http.server 8000
open http://localhost:8000
```

---

## 🎓 Learning Resources

- ISA-95: [Standard](https://www.isa.org/standards-and-publications/isa-standards/isa-standards-committees/isa95)
- PackML: [Specification](https://www.omac.org/packml)
- Three.js: [Docs](https://threejs.org/docs/)
- Modbus: [Protocol Spec](https://www.modbus.org/specs.php)

---

**Built with ❤️ using AI | Prototype time: 40 minutes**
