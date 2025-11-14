// Timer Component - TON, TOF, RTO
export class Timer {
    constructor(type = 'TON', preset = 1000) {
        this.type = type; // TON, TOF, RTO
        this.preset = preset; // milliseconds
        this.acc = 0; // accumulated time
        this.enabled = false;
        this.done = false;
        this.timing = false;
        this.lastUpdate = Date.now();
    }

    update(input) {
        const now = Date.now();
        const dt = now - this.lastUpdate;
        this.lastUpdate = now;

        if (this.type === 'TON') {
            // Timer On Delay
            if (input) {
                this.timing = true;
                this.acc = Math.min(this.acc + dt, this.preset);
                this.done = this.acc >= this.preset;
            } else {
                this.reset();
            }
        } else if (this.type === 'TOF') {
            // Timer Off Delay
            if (!input) {
                this.timing = true;
                this.acc = Math.min(this.acc + dt, this.preset);
                this.done = this.acc >= this.preset;
            } else {
                this.reset();
            }
        } else if (this.type === 'RTO') {
            // Retentive Timer
            if (input) {
                this.timing = true;
                this.acc = Math.min(this.acc + dt, this.preset);
                this.done = this.acc >= this.preset;
            } else {
                this.timing = false;
            }
        }

        return this.done;
    }

    reset() {
        this.acc = 0;
        this.done = false;
        this.timing = false;
    }

    getPercent() {
        return (this.acc / this.preset) * 100;
    }
}

export class TimerManager {
    constructor() {
        this.timers = new Map();
    }

    add(name, type, preset) {
        this.timers.set(name, new Timer(type, preset));
        return this.timers.get(name);
    }

    get(name) {
        return this.timers.get(name);
    }

    update() {
        this.timers.forEach(timer => {
            if (timer.enabled) timer.update(timer.enabled);
        });
    }

    reset(name) {
        const timer = this.timers.get(name);
        if (timer) timer.reset();
    }
}
