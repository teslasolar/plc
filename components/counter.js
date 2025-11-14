// Counter Component - CTU, CTD
export class Counter {
    constructor(type = 'CTU', preset = 100) {
        this.type = type; // CTU or CTD
        this.preset = preset;
        this.acc = 0; // accumulated count
        this.done = false;
        this.lastInput = false;
    }

    count(input, reset = false) {
        if (reset) {
            this.reset();
            return this.done;
        }

        // Edge detection - count on rising edge
        if (input && !this.lastInput) {
            if (this.type === 'CTU') {
                this.acc = Math.min(this.acc + 1, this.preset);
                this.done = this.acc >= this.preset;
            } else if (this.type === 'CTD') {
                this.acc = Math.max(this.acc - 1, 0);
                this.done = this.acc <= 0;
            }
        }

        this.lastInput = input;
        return this.done;
    }

    reset() {
        this.acc = this.type === 'CTU' ? 0 : this.preset;
        this.done = false;
        this.lastInput = false;
    }

    getPercent() {
        return (this.acc / this.preset) * 100;
    }
}

export class CounterManager {
    constructor() {
        this.counters = new Map();
    }

    add(name, type, preset) {
        this.counters.set(name, new Counter(type, preset));
        return this.counters.get(name);
    }

    get(name) {
        return this.counters.get(name);
    }

    reset(name) {
        const counter = this.counters.get(name);
        if (counter) counter.reset();
    }
}
