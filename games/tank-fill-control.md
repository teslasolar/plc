# 🛢️ Tank Fill Control Game

## Objective
Fill 10 tanks to exact setpoint without overflow!

## Mechanics

```javascript
const tankGame = {
  tank: { level: 0, capacity: 1000, setpoint: 750 },

  update() {
    if (plc.io.DO[0]) this.tank.level += 10; // Fill valve
    if (plc.io.DO[1]) this.tank.level -= 5;  // Drain valve

    plc.io.AI[0] = this.tank.level; // Level sensor

    // Check win condition
    if (Math.abs(this.tank.level - this.tank.setpoint) < 5) {
      this.score++;
    }
  }
};
```

## PLC Challenge
Use analog input to control pump and achieve ±5 accuracy!

**Skills**: PID control, analog I/O, process control

**AI Prototype Time**: 7 minutes!
