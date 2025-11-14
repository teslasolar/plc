// Alarm System Component
export class Alarm {
    constructor(name, condition, severity = 'WARNING') {
        this.name = name;
        this.condition = condition; // function that returns true/false
        this.severity = severity; // CRITICAL, WARNING, INFO
        this.active = false;
        this.acknowledged = false;
        this.timestamp = null;
        this.count = 0;
        this.message = '';
    }

    check() {
        const isTriggered = this.condition();

        if (isTriggered && !this.active) {
            this.activate();
        } else if (!isTriggered && this.active) {
            this.deactivate();
        }

        return this.active;
    }

    activate() {
        this.active = true;
        this.acknowledged = false;
        this.timestamp = new Date();
        this.count++;
    }

    deactivate() {
        this.active = false;
    }

    acknowledge() {
        if (this.active) {
            this.acknowledged = true;
        }
    }
}

export class AlarmSystem {
    constructor() {
        this.alarms = new Map();
        this.history = [];
        this.maxHistory = 1000;
        this.callbacks = [];
    }

    add(name, condition, severity = 'WARNING', message = '') {
        const alarm = new Alarm(name, condition, severity);
        alarm.message = message;
        this.alarms.set(name, alarm);
        return alarm;
    }

    remove(name) {
        this.alarms.delete(name);
    }

    scan() {
        this.alarms.forEach((alarm, name) => {
            const wasActive = alarm.active;
            alarm.check();

            // Log state changes
            if (alarm.active && !wasActive) {
                this.logEvent(name, 'ACTIVATED', alarm);
                this.notify(alarm, 'ACTIVATED');
            } else if (!alarm.active && wasActive) {
                this.logEvent(name, 'CLEARED', alarm);
                this.notify(alarm, 'CLEARED');
            }
        });
    }

    logEvent(name, event, alarm) {
        const entry = {
            timestamp: new Date(),
            name,
            event,
            severity: alarm.severity,
            message: alarm.message,
            count: alarm.count
        };

        this.history.unshift(entry);
        if (this.history.length > this.maxHistory) {
            this.history.pop();
        }
    }

    getActive() {
        return Array.from(this.alarms.values()).filter(a => a.active);
    }

    getUnacknowledged() {
        return Array.from(this.alarms.values()).filter(a => a.active && !a.acknowledged);
    }

    acknowledgeAll() {
        this.alarms.forEach(alarm => alarm.acknowledge());
    }

    acknowledge(name) {
        const alarm = this.alarms.get(name);
        if (alarm) alarm.acknowledge();
    }

    getHistory(limit = 100) {
        return this.history.slice(0, limit);
    }

    onAlarm(callback) {
        this.callbacks.push(callback);
    }

    notify(alarm, event) {
        this.callbacks.forEach(cb => cb(alarm, event));
    }

    getSummary() {
        const active = this.getActive();
        return {
            total: this.alarms.size,
            active: active.length,
            unacknowledged: this.getUnacknowledged().length,
            critical: active.filter(a => a.severity === 'CRITICAL').length,
            warning: active.filter(a => a.severity === 'WARNING').length,
            info: active.filter(a => a.severity === 'INFO').length
        };
    }
}
