# 🔵 Allen-Bradley (Rockwell Automation)

## Device Profile: Logix5000 Series

### 📊 Hardware Specifications

```json
{
  "vendor": "AB",
  "name": "Allen-Bradley",
  "fullName": "Logix5000 Controller",
  "series": "ControlLogix 5580",
  "color": "#0066cc",
  "colorHex": 0x0066cc,
  "manufacturer": "Rockwell Automation",
  "country": "USA"
}
```

### ⚙️ Controller Parameters

```json
{
  "cpu": {
    "processor": "1756-L85E",
    "memory": "10 MB User Memory",
    "speed": "1 GHz Dual-Core",
    "scanRate": 10,
    "scanRateUnit": "ms"
  },
  "io": {
    "digitalInputs": 16,
    "digitalOutputs": 16,
    "analogInputs": 8,
    "analogOutputs": 8,
    "maxIOPoints": 128000,
    "voltage": "24VDC"
  },
  "communication": {
    "ethernet": ["EtherNet/IP", "Modbus TCP"],
    "serial": ["DF1", "DH485"],
    "backplane": "ControlLogix Backplane",
    "speed": "1 Gbps Ethernet"
  }
}
```

### 🔧 Programming Specifications

```json
{
  "syntax": "ladder",
  "languages": [
    "Ladder Logic (LD)",
    "Function Block Diagram (FBD)",
    "Structured Text (ST)",
    "Sequential Function Chart (SFC)"
  ],
  "software": {
    "name": "Studio 5000 Logix Designer",
    "version": "v35+",
    "fileFormat": ".ACD, .L5X"
  },
  "tags": [
    "Tag1",
    "Tag2",
    "ProductCount",
    "ConveyorRun",
    "MotorSpeed",
    "Temperature"
  ],
  "dataTypes": [
    "BOOL",
    "SINT",
    "INT",
    "DINT",
    "REAL",
    "STRING",
    "TIMER",
    "COUNTER"
  ]
}
```

### 💾 PackML State Machine

```json
{
  "states": [
    "STOPPED",
    "STARTING",
    "IDLE",
    "EXECUTE",
    "STOPPING",
    "ABORTING",
    "ABORTED",
    "CLEARING",
    "COMPLETE"
  ],
  "defaultState": "STOPPED",
  "executeState": "EXECUTE"
}
```

### 📡 Network Configuration

```json
{
  "protocols": {
    "ethernetIP": {
      "enabled": true,
      "port": 2222,
      "cip": true,
      "implicit": "Class 1 Real-Time",
      "explicit": "Class 3 Non-Real-Time"
    },
    "modbusTCP": {
      "enabled": true,
      "port": 502,
      "unitID": 1,
      "registers": "40001-49999"
    }
  },
  "ipAddress": "192.168.1.10",
  "subnet": "255.255.255.0",
  "gateway": "192.168.1.1"
}
```

### ⚡ Ladder Logic Examples

#### Example 1: Simple Start/Stop Circuit
```ladder
|                                                                    |
|  XIC(StartButton)      XIC(RunPermissive)      OTE(MotorRun)      |
|------] [---------------] [--------------------( )------------------|
|                                                                    |
|  XIC(StopButton)                               OTU(MotorRun)      |
|------] [-----------------------------------------------( )---------|
```

**JavaScript Implementation:**
```javascript
plc.addRung(
  'this.tags["StartButton"] && this.tags["RunPermissive"]',
  function() {
    this.tags["MotorRun"] = true;
    this.io.DO[0] = true;
  }
);

plc.addRung(
  'this.tags["StopButton"]',
  function() {
    this.tags["MotorRun"] = false;
    this.io.DO[0] = false;
  }
);
```

#### Example 2: Conveyor Control with Product Counter
```ladder
|                                                                    |
|  XIC(ConveyorStart)    XIC(ProductSensor)      CTU(ProductCount)  |
|------] [---------------] [--------------------[CTU]--------------  |
|                                                PRE: 100            |
|                                                                    |
|  XIC(ProductCount.DN)                          OTE(BatchComplete) |
|------] [-----------------------------------------------( )---------|
```

**JavaScript Implementation:**
```javascript
let productCount = 0;

plc.addRung(
  'this.tags["ConveyorStart"] && this.io.DI[2]',
  function() {
    productCount++;
    this.tags["ProductCount"] = productCount;
    if (productCount >= 100) {
      this.tags["BatchComplete"] = true;
    }
  }
);
```

### 🎮 3D Rendering Parameters

```json
{
  "visual": {
    "geometry": {
      "type": "BoxGeometry",
      "width": 1.2,
      "height": 0.6,
      "depth": 0.4
    },
    "material": {
      "type": "MeshPhongMaterial",
      "color": 0x0066cc,
      "shininess": 30,
      "specular": 0x222222
    },
    "label": {
      "text": "Allen-Bradley",
      "font": "bold 24px monospace",
      "color": "#0f0",
      "background": "#000"
    },
    "led": {
      "geometry": "SphereGeometry",
      "radius": 0.05,
      "position": [0.5, 0.2, 0.21],
      "states": {
        "EXECUTE": 0x00ff00,
        "STOPPED": 0xff0000,
        "default": 0xffff00
      }
    }
  }
}
```

### 🔌 I/O Mapping

```json
{
  "digitalInputs": {
    "DI0": "StartButton",
    "DI1": "StopButton",
    "DI2": "ProductSensor",
    "DI3": "EmergencyStop",
    "DI4": "HighLevel",
    "DI5": "LowLevel",
    "DI6": "DoorClosed",
    "DI7": "SafetyMat"
  },
  "digitalOutputs": {
    "DO0": "MotorRun",
    "DO1": "ConveyorRun",
    "DO2": "AlarmLight",
    "DO3": "SolenoidValve",
    "DO4": "Heater",
    "DO5": "Pump",
    "DO6": "Fan",
    "DO7": "Buzzer"
  },
  "analogInputs": {
    "AI0": "Temperature (4-20mA)",
    "AI1": "Pressure (0-10V)",
    "AI2": "FlowRate (4-20mA)",
    "AI3": "Level (0-10V)"
  },
  "analogOutputs": {
    "AO0": "VFD_Speed (4-20mA)",
    "AO1": "ValvePosition (0-10V)",
    "AO2": "Setpoint (4-20mA)"
  }
}
```

### 🏭 ISA-95 Integration

```json
{
  "level": "L1",
  "role": "Control",
  "interfaces": {
    "L0_FieldDevices": ["Sensors", "Actuators", "I/O Modules"],
    "L2_SCADA": ["FactoryTalk View SE", "Ignition", "WinCC"],
    "L3_MES": ["FactoryTalk ProductionCentre", "SAP ME"],
    "protocols": ["EtherNet/IP", "OPC UA", "MQTT"]
  }
}
```

### 📈 Performance Characteristics

```json
{
  "performance": {
    "scanTime": {
      "min": 1,
      "typical": 10,
      "max": 250,
      "unit": "ms"
    },
    "latency": {
      "ethernetIP": "1-10 ms",
      "modbus": "10-50 ms"
    },
    "reliability": {
      "mtbf": "50 years",
      "operatingTemp": "-20°C to 60°C",
      "redundancy": "Supported (1756-RM2)"
    }
  }
}
```

### 🎯 Use Cases & Applications

```json
{
  "industries": [
    "Automotive Manufacturing",
    "Food & Beverage",
    "Pharmaceutical",
    "Oil & Gas",
    "Mining",
    "Water/Wastewater"
  ],
  "applications": [
    "Assembly Lines",
    "Conveyor Control",
    "Batch Processing",
    "Motion Control",
    "Safety Systems (GuardLogix)",
    "Process Control"
  ]
}
```

### 🔐 Security Features

```json
{
  "security": {
    "authentication": true,
    "encryption": "TLS 1.2",
    "userRoles": ["Administrator", "Engineer", "Operator"],
    "changeDetection": "CIP Security",
    "firmwareSigning": true
  }
}
```

### 🚀 Quick Start Code

```javascript
// Create Allen-Bradley PLC Instance
const plc_AB = new PLC('AB', 1);
plc_AB.init();

// Configure networking
comms.register(plc_AB);

// Add to 3D scene
renderer.addPLC(plc_AB, [-2.5, 0, 0]);

// Program simple logic
plc_AB.addRung(
  'this.io.DI[0]',  // Start button
  function() {
    this.io.DO[0] = true;  // Motor output
    this.tags["ConveyorRun"] = true;
  }
);

// Set to running state
plc_AB.setState('EXECUTE');

// Start scan cycle
setInterval(() => plc_AB.scan(), 10);
```

### 📚 Additional Resources

- **Manual**: [Logix5000 Programming Manual](https://literature.rockwellautomation.com/idc/groups/literature/documents/pm/1756-pm001_-en-p.pdf)
- **Protocol**: [EtherNet/IP Specification](https://www.odva.org/)
- **Training**: [Rockwell Automation University](https://www.rockwellautomation.com/en-us/support/training.html)
- **Community**: [PLCTALK Forum](https://www.plctalk.net/)

---

**🎓 Pro Tip**: Allen-Bradley PLCs dominate North American manufacturing. Master this platform and you'll have access to 60%+ of industrial automation jobs!

**⚡ Fun Fact**: The Logix5000 series can execute over 1 million ladder logic instructions per second!
