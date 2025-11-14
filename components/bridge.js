// HMI Bridge Component - Exposes PLC data to external systems
export class HMIBridge {
    constructor(plcs = []) {
        this.plcs = plcs;
        this.updateRate = 100; // ms
        this.lastUpdate = Date.now();
        this.subscribers = [];
        this.enabled = false;
    }

    start() {
        this.enabled = true;
        this.interval = setInterval(() => this.broadcast(), this.updateRate);
    }

    stop() {
        this.enabled = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        return () => {
            const index = this.subscribers.indexOf(callback);
            if (index > -1) this.subscribers.splice(index, 1);
        };
    }

    broadcast() {
        const data = this.getData();
        this.subscribers.forEach(cb => cb(data));
    }

    getData() {
        const now = Date.now();
        const dt = now - this.lastUpdate;
        this.lastUpdate = now;

        return {
            timestamp: now,
            deltaTime: dt,
            plcs: this.plcs.map(plc => ({
                id: plc.id || 'PLC1',
                vendor: plc.vendor,
                state: plc.state,
                scanCount: plc.scanCount,
                scanRate: plc.scan,
                io: {
                    DI: [...plc.io.DI],
                    DO: [...plc.io.DO],
                    AI: [...plc.io.AI],
                    AO: [...plc.io.AO]
                },
                tags: { ...plc.tags }
            }))
        };
    }

    // REST-like API methods
    getPlcState(plcId = 0) {
        const plc = this.plcs[plcId];
        if (!plc) return null;
        return {
            state: plc.state,
            scanCount: plc.scanCount,
            vendor: plc.vendor
        };
    }

    getIO(plcId = 0) {
        const plc = this.plcs[plcId];
        if (!plc) return null;
        return plc.io;
    }

    getTags(plcId = 0) {
        const plc = this.plcs[plcId];
        if (!plc) return null;
        return plc.tags;
    }

    getTag(plcId = 0, tagName) {
        const plc = this.plcs[plcId];
        if (!plc) return null;
        return plc.tags[tagName];
    }

    setTag(plcId = 0, tagName, value) {
        const plc = this.plcs[plcId];
        if (!plc) return false;
        plc.tags[tagName] = value;
        return true;
    }

    setIO(plcId = 0, type, index, value) {
        const plc = this.plcs[plcId];
        if (!plc || !plc.io[type]) return false;
        plc.io[type][index] = value;
        return true;
    }

    // WebSocket-style message handler
    handleMessage(msg) {
        const { action, plcId, data } = msg;

        switch (action) {
            case 'GET_STATE':
                return this.getPlcState(plcId);
            case 'GET_IO':
                return this.getIO(plcId);
            case 'GET_TAGS':
                return this.getTags(plcId);
            case 'GET_TAG':
                return this.getTag(plcId, data.tagName);
            case 'SET_TAG':
                return this.setTag(plcId, data.tagName, data.value);
            case 'SET_IO':
                return this.setIO(plcId, data.type, data.index, data.value);
            case 'GET_ALL':
                return this.getData();
            default:
                return { error: 'Unknown action' };
        }
    }

    // Export data in common formats
    exportOPC() {
        // OPC UA-like structure
        return this.plcs.map(plc => ({
            nodeId: `ns=2;s=PLC_${plc.id}`,
            browseName: `PLC_${plc.vendor}`,
            dataType: 'Object',
            children: {
                State: { value: plc.state, dataType: 'String' },
                ScanCount: { value: plc.scanCount, dataType: 'UInt32' },
                IO: {
                    DI: plc.io.DI.map((v, i) => ({ nodeId: `DI${i}`, value: v, dataType: 'Boolean' })),
                    DO: plc.io.DO.map((v, i) => ({ nodeId: `DO${i}`, value: v, dataType: 'Boolean' })),
                    AI: plc.io.AI.map((v, i) => ({ nodeId: `AI${i}`, value: v, dataType: 'Float' })),
                    AO: plc.io.AO.map((v, i) => ({ nodeId: `AO${i}`, value: v, dataType: 'Float' }))
                },
                Tags: Object.entries(plc.tags).map(([name, value]) => ({
                    nodeId: name,
                    value,
                    dataType: typeof value === 'boolean' ? 'Boolean' : 'Variant'
                }))
            }
        }));
    }

    exportModbus() {
        // Modbus register map
        return this.plcs.map((plc, plcIndex) => ({
            slaveId: plcIndex + 1,
            coils: plc.io.DO.map((v, i) => ({ address: i, value: v ? 1 : 0 })),
            discreteInputs: plc.io.DI.map((v, i) => ({ address: i, value: v ? 1 : 0 })),
            holdingRegisters: plc.io.AO.map((v, i) => ({ address: i, value: Math.round(v * 100) })),
            inputRegisters: plc.io.AI.map((v, i) => ({ address: i, value: Math.round(v * 100) }))
        }));
    }
}

// Message Queue for buffered communication
export class MessageQueue {
    constructor(maxSize = 1000) {
        this.queue = [];
        this.maxSize = maxSize;
    }

    push(message) {
        this.queue.push({
            timestamp: Date.now(),
            ...message
        });

        if (this.queue.length > this.maxSize) {
            this.queue.shift();
        }
    }

    pop() {
        return this.queue.shift();
    }

    peek() {
        return this.queue[0];
    }

    clear() {
        this.queue = [];
    }

    getAll() {
        return [...this.queue];
    }

    size() {
        return this.queue.length;
    }
}
