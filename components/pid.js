// PID Controller Component
export class PID {
    constructor(kp = 1.0, ki = 0.1, kd = 0.01) {
        this.kp = kp; // Proportional gain
        this.ki = ki; // Integral gain
        this.kd = kd; // Derivative gain

        this.setpoint = 0;
        this.integral = 0;
        this.lastError = 0;
        this.output = 0;

        this.minOutput = 0;
        this.maxOutput = 100;
        this.enabled = true;

        this.lastUpdate = Date.now();
    }

    setTunings(kp, ki, kd) {
        this.kp = kp;
        this.ki = ki;
        this.kd = kd;
    }

    setLimits(min, max) {
        this.minOutput = min;
        this.maxOutput = max;
    }

    compute(processValue) {
        if (!this.enabled) return this.output;

        const now = Date.now();
        const dt = (now - this.lastUpdate) / 1000; // seconds
        this.lastUpdate = now;

        const error = this.setpoint - processValue;

        // Proportional
        const pTerm = this.kp * error;

        // Integral with anti-windup
        this.integral += error * dt;
        const iTerm = this.ki * this.integral;

        // Derivative
        const derivative = (error - this.lastError) / dt;
        const dTerm = this.kd * derivative;

        // Calculate output
        this.output = pTerm + iTerm + dTerm;

        // Clamp output
        if (this.output > this.maxOutput) {
            this.output = this.maxOutput;
            this.integral -= error * dt; // Anti-windup
        } else if (this.output < this.minOutput) {
            this.output = this.minOutput;
            this.integral -= error * dt; // Anti-windup
        }

        this.lastError = error;
        return this.output;
    }

    reset() {
        this.integral = 0;
        this.lastError = 0;
        this.output = 0;
        this.lastUpdate = Date.now();
    }

    getStats() {
        return {
            setpoint: this.setpoint,
            output: this.output,
            error: this.lastError,
            integral: this.integral,
            kp: this.kp,
            ki: this.ki,
            kd: this.kd
        };
    }
}

export class PIDManager {
    constructor() {
        this.controllers = new Map();
    }

    add(name, kp, ki, kd) {
        this.controllers.set(name, new PID(kp, ki, kd));
        return this.controllers.get(name);
    }

    get(name) {
        return this.controllers.get(name);
    }

    reset(name) {
        const pid = this.controllers.get(name);
        if (pid) pid.reset();
    }
}
