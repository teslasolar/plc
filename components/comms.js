// Industrial Protocol Communications (Modbus/EtherNet-IP)
export class Comms {
    constructor(proto) {
        this.proto = proto; // 'modbus' or 'ethernetip'
        this.nodes = new Map();
        this.traffic = 0;
        this.latency = 0;
    }

    register(plc) {
        this.nodes.set(plc.addr, plc);
    }

    read(addr, reg) {
        this.traffic++;
        this.latency = Math.random() * 40 + 10;

        const plc = this.nodes.get(addr);
        if (!plc) return null;

        return this.proto === 'modbus'
            ? (plc.tags[reg] || plc.io.DI[reg])
            : plc.tags[reg];
    }

    write(addr, reg, val) {
        this.traffic++;
        this.latency = Math.random() * 40 + 10;

        const plc = this.nodes.get(addr);
        if (!plc) return false;

        if (this.proto === 'modbus') {
            plc.io.DO[reg] = val;
        } else {
            plc.tags[reg] = val;
        }
        return true;
    }
}
