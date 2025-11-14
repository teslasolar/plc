# 🎮 Conveyor Challenge Game

## Objective
Sort 100 products into 3 bins based on weight in under 60 seconds!

## Game Mechanics

```javascript
class ConveyorGame {
  constructor(plc) {
    this.plc = plc;
    this.score = 0;
    this.products = 100;
    this.timeLeft = 60;
  }

  setup() {
    // Spawn random products on conveyor
    setInterval(() => {
      const weight = Math.random() * 1000; // 0-1000g
      this.plc.io.AI[0] = weight;
      this.plc.io.DI[2] = true; // Product sensor
    }, 600); // Product every 600ms
  }

  checkSort() {
    const weight = this.plc.io.AI[0];
    // Light: <300g, Medium: 300-700g, Heavy: >700g
    if (weight < 300 && this.plc.io.DO[0]) this.score++;
    if (weight >= 300 && weight < 700 && this.plc.io.DO[1]) this.score++;
    if (weight >= 700 && this.plc.io.DO[2]) this.score++;
  }
}
```

## Player Challenge
Program the PLC to activate the correct bin output based on weight sensor!

**AI Build Time**: 5 minutes from concept to playable game!
