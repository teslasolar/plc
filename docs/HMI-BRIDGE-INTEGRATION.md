# HMI Bridge Integration Guide

The PlcSim3D HMI Bridge exposes real-time PLC data to external HMI systems through a simple JavaScript API.

## Quick Start

### 1. Access the Simulator

Open the simulator in a browser:
```
https://teslasolar.github.io/plc/simulator.html
```

### 2. Access the Bridge API

The bridge is exposed globally via `window.PlcAPI`:

```javascript
// Get all PLC data
const data = window.PlcAPI.getAllData();

// Subscribe to real-time updates (100ms)
window.PlcAPI.subscribe((data) => {
    console.log('PLC Update:', data);
});
```

## API Reference

### Get Data

```javascript
// Get all PLCs data
window.PlcAPI.getAllData()
// Returns: { timestamp, deltaTime, plcs: [...] }

// Get specific PLC state
window.PlcAPI.getPlc(0)
// Returns: { state, scanCount, vendor }

// Get IO data
window.PlcAPI.getIO(0)
// Returns: { DI: [...], DO: [...], AI: [...], AO: [...] }

// Get tag value
window.PlcAPI.getTag(0, 'Tag1')
// Returns: tag value (any type)
```

### Set Data

```javascript
// Set digital input
window.PlcAPI.setIO(0, 'DI', 0, true)

// Set tag value
window.PlcAPI.setTag(0, 'ProductCount', 100)
```

### Subscribe to Updates

```javascript
// Subscribe to real-time updates
const unsubscribe = window.PlcAPI.subscribe((data) => {
    console.log('Timestamp:', data.timestamp);
    console.log('PLCs:', data.plcs);

    data.plcs.forEach(plc => {
        console.log(`${plc.vendor}: ${plc.state}`);
        console.log('IO:', plc.io);
        console.log('Tags:', plc.tags);
    });
});

// Unsubscribe when done
unsubscribe();
```

### Export Formats

```javascript
// Export as OPC UA structure
const opcData = window.PlcAPI.exportOPC();

// Export as Modbus register map
const modbusData = window.PlcAPI.exportModbus();
```

## Data Structure

### getAllData() Response

```json
{
  "timestamp": 1234567890,
  "deltaTime": 100,
  "plcs": [
    {
      "id": "PLC1",
      "vendor": "AB",
      "state": "EXECUTE",
      "scanCount": 1234,
      "scanRate": 10,
      "io": {
        "DI": [false, false, true, ...],
        "DO": [false, true, false, ...],
        "AI": [0, 12.5, 100, ...],
        "AO": [0, 0, 0, ...]
      },
      "tags": {
        "Tag1": false,
        "ProductCount": 42,
        "ConveyorRun": true
      }
    }
  ]
}
```

### OPC UA Export

```json
[
  {
    "nodeId": "ns=2;s=PLC_PLC1",
    "browseName": "PLC_AB",
    "dataType": "Object",
    "children": {
      "State": { "value": "EXECUTE", "dataType": "String" },
      "ScanCount": { "value": 1234, "dataType": "UInt32" },
      "IO": {
        "DI": [{ "nodeId": "DI0", "value": false, "dataType": "Boolean" }, ...],
        "DO": [{ "nodeId": "DO0", "value": true, "dataType": "Boolean" }, ...],
        "AI": [{ "nodeId": "AI0", "value": 12.5, "dataType": "Float" }, ...],
        "AO": [{ "nodeId": "AO0", "value": 0, "dataType": "Float" }, ...]
      },
      "Tags": [
        { "nodeId": "Tag1", "value": false, "dataType": "Boolean" },
        { "nodeId": "ProductCount", "value": 42, "dataType": "Variant" }
      ]
    }
  }
]
```

### Modbus Export

```json
[
  {
    "slaveId": 1,
    "coils": [{ "address": 0, "value": 0 }, { "address": 1, "value": 1 }, ...],
    "discreteInputs": [{ "address": 0, "value": 0 }, ...],
    "holdingRegisters": [{ "address": 0, "value": 0 }, ...],
    "inputRegisters": [{ "address": 0, "value": 1250 }, ...]
  }
]
```

## Integration Examples

### React HMI

```javascript
import { useEffect, useState } from 'react';

function PlcMonitor() {
  const [plcData, setPlcData] = useState(null);

  useEffect(() => {
    // Access the simulator (must be in iframe or same origin)
    const simWindow = document.getElementById('simulator-iframe').contentWindow;

    // Subscribe to updates
    const unsubscribe = simWindow.PlcAPI.subscribe((data) => {
      setPlcData(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {plcData?.plcs.map(plc => (
        <div key={plc.id}>
          <h3>{plc.vendor} - {plc.state}</h3>
          <p>Scan: {plc.scanCount}</p>
        </div>
      ))}
    </div>
  );
}
```

### Vue HMI

```vue
<template>
  <div>
    <div v-for="plc in plcs" :key="plc.id">
      <h3>{{ plc.vendor }} - {{ plc.state }}</h3>
      <p>Scan Count: {{ plc.scanCount }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plcs: []
    };
  },
  mounted() {
    const simWindow = this.$refs.simulator.contentWindow;

    this.unsubscribe = simWindow.PlcAPI.subscribe((data) => {
      this.plcs = data.plcs;
    });
  },
  beforeUnmount() {
    this.unsubscribe?.();
  }
};
</script>
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <title>HMI Dashboard</title>
</head>
<body>
  <h1>PLC Monitor</h1>
  <div id="plc-list"></div>

  <!-- Embed simulator in iframe -->
  <iframe id="simulator"
          src="https://teslasolar.github.io/plc/simulator.html"
          style="display:none;"></iframe>

  <script>
    const iframe = document.getElementById('simulator');

    iframe.onload = () => {
      const api = iframe.contentWindow.PlcAPI;

      // Subscribe to updates
      api.subscribe((data) => {
        const html = data.plcs.map(plc => `
          <div>
            <h3>${plc.vendor}</h3>
            <p>State: ${plc.state}</p>
            <p>Scan: ${plc.scanCount}</p>
          </div>
        `).join('');

        document.getElementById('plc-list').innerHTML = html;
      });

      // Control PLCs
      document.getElementById('start-btn').onclick = () => {
        api.setTag(0, 'ConveyorRun', true);
      };
    };
  </script>
</body>
</html>
```

## Message Protocol

For advanced integration, use the raw message handler:

```javascript
// Access bridge directly
const bridge = window.plcBridge;

// Send message
const response = bridge.handleMessage({
  action: 'GET_STATE',
  plcId: 0
});

// Available actions:
// - GET_STATE: Get PLC state
// - GET_IO: Get IO data
// - GET_TAGS: Get all tags
// - GET_TAG: Get specific tag
// - SET_TAG: Set tag value
// - SET_IO: Set IO value
// - GET_ALL: Get all data
```

## WebSocket Example

For cross-origin communication, set up a WebSocket relay:

```javascript
// Server (Node.js)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// Connect to simulator
const simulator = // ... get simulator reference

simulator.PlcAPI.subscribe((data) => {
  // Broadcast to all clients
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
});

// Client (HMI)
const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (event) => {
  const plcData = JSON.parse(event.data);
  console.log('PLC Update:', plcData);
};
```

## Security Notes

- The bridge runs in the browser context
- For production, implement authentication
- Use HTTPS for external communication
- Validate all incoming data
- Implement rate limiting for write operations

## Performance

- Update rate: 100ms (10Hz)
- Typical latency: 10-50ms
- Maximum subscribers: Unlimited
- Data size: ~5KB per update (3 PLCs)

## Troubleshooting

### Bridge not available

```javascript
if (!window.PlcAPI) {
  console.error('Bridge not loaded. Wait for simulator to initialize.');

  // Wait for load
  setTimeout(() => {
    // Try again
  }, 1000);
}
```

### Cross-origin issues

Use iframe with `sandbox` attribute:

```html
<iframe src="..." sandbox="allow-scripts allow-same-origin"></iframe>
```

Or use WebSocket relay (recommended for production).

## Support

- GitHub: https://github.com/teslasolar/plc
- Issues: https://github.com/teslasolar/plc/issues
- Docs: https://teslasolar.github.io/plc/docs/
