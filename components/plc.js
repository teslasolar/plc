// PLC Core - PackML State Machine + ISA-95
import { VENDORS } from './vendors.js';

export class PLC {
    constructor(vendor, addr) {
        this.vendor = vendor;
        this.addr = addr;
        this.state = 'STOPPED';
        this.io = {
            DI: new Array(16).fill(false),
            DO: new Array(16).fill(false),
            AI: new Array(8).fill(0),
            AO: new Array(8).fill(0)
        };
        this.tags = {};
        this.scan = VENDORS[vendor].scan;
        this.program = [];
        this.isa95 = { L0: 'Field', L1: 'Control', L2: 'SCADA', L3: 'MES', L4: 'ERP' };
        this.scanCount = 0;
        this.lastScan = Date.now();

        VENDORS[vendor].tags.forEach(tag => this.tags[tag] = false);
    }

    init() {
        this.io.DI.fill(false);
        this.io.DO.fill(false);
        this.io.AI.fill(0);
        this.io.AO.fill(0);
    }

    setState(s) {
        const valid = ['STOPPED', 'STARTING', 'IDLE', 'EXECUTE', 'STOPPING', 'ABORTING', 'ABORTED', 'CLEARING', 'COMPLETE'];
        if (valid.includes(s)) this.state = s;
    }

    scan() {
        if (this.state !== 'EXECUTE') return;
        this.scanCount++;
        this.lastScan = Date.now();

        this.program.forEach(rung => {
            try {
                if (eval.call(this, rung.logic)) rung.output.call(this);
            } catch (e) { console.error('Rung error:', e); }
        });

        if (this.scanCount % 50 === 0) {
            const i = Math.floor(Math.random() * 8);
            this.io.DI[i] = !this.io.DI[i];
        }

        this.io.DO[0] = this.io.DI[0];
        this.io.DO[1] = this.io.DI[1];
    }

    addRung(logic, output) {
        this.program.push({ logic, output });
    }

    toggleInput(i) {
        this.io.DI[i] = !this.io.DI[i];
    }
}
