// Data Historian Component
export class Tag {
    constructor(name, getter, sampleRate = 1000) {
        this.name = name;
        this.getter = getter; // function to get current value
        this.sampleRate = sampleRate; // milliseconds
        this.data = [];
        this.maxPoints = 1000;
        this.lastSample = 0;
        this.stats = { min: Infinity, max: -Infinity, avg: 0 };
    }

    sample() {
        const now = Date.now();
        if (now - this.lastSample < this.sampleRate) return;

        const value = this.getter();
        const point = { timestamp: now, value };

        this.data.push(point);
        if (this.data.length > this.maxPoints) {
            this.data.shift();
        }

        this.updateStats();
        this.lastSample = now;
    }

    updateStats() {
        if (this.data.length === 0) return;

        this.stats.min = Math.min(...this.data.map(p => p.value));
        this.stats.max = Math.max(...this.data.map(p => p.value));
        this.stats.avg = this.data.reduce((sum, p) => sum + p.value, 0) / this.data.length;
    }

    getData(startTime, endTime) {
        if (!startTime) return this.data;
        return this.data.filter(p => p.timestamp >= startTime && p.timestamp <= endTime);
    }

    clear() {
        this.data = [];
        this.stats = { min: Infinity, max: -Infinity, avg: 0 };
    }
}

export class Historian {
    constructor() {
        this.tags = new Map();
        this.running = false;
        this.interval = null;
    }

    addTag(name, getter, sampleRate = 1000) {
        const tag = new Tag(name, getter, sampleRate);
        this.tags.set(name, tag);
        return tag;
    }

    removeTag(name) {
        this.tags.delete(name);
    }

    start() {
        if (this.running) return;
        this.running = true;

        this.interval = setInterval(() => {
            this.tags.forEach(tag => tag.sample());
        }, 100); // Check every 100ms
    }

    stop() {
        if (!this.running) return;
        this.running = false;
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    getTag(name) {
        return this.tags.get(name);
    }

    getData(tagName, startTime, endTime) {
        const tag = this.tags.get(tagName);
        if (!tag) return [];
        return tag.getData(startTime, endTime);
    }

    getStats(tagName) {
        const tag = this.tags.get(tagName);
        if (!tag) return null;
        return tag.stats;
    }

    exportCSV(tagNames = []) {
        const tags = tagNames.length > 0
            ? tagNames.map(n => this.tags.get(n)).filter(t => t)
            : Array.from(this.tags.values());

        if (tags.length === 0) return '';

        // Header
        let csv = 'Timestamp,' + tags.map(t => t.name).join(',') + '\n';

        // Find all unique timestamps
        const timestamps = new Set();
        tags.forEach(tag => tag.data.forEach(p => timestamps.add(p.timestamp)));

        const sorted = Array.from(timestamps).sort((a, b) => a - b);

        // Build rows
        sorted.forEach(ts => {
            const values = tags.map(tag => {
                const point = tag.data.find(p => p.timestamp === ts);
                return point ? point.value : '';
            });
            csv += ts + ',' + values.join(',') + '\n';
        });

        return csv;
    }

    clearAll() {
        this.tags.forEach(tag => tag.clear());
    }
}
