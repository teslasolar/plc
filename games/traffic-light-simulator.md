# 🚦 Traffic Light Simulator Game

## Objective
Control a 4-way intersection without causing accidents!

## Setup

```javascript
const trafficGame = {
  intersections: [
    { name: 'North', sensor: 'DI[0]', light: 'DO[0-2]' },
    { name: 'South', sensor: 'DI[1]', light: 'DO[3-5]' },
    { name: 'East', sensor: 'DI[2]', light: 'DO[6-8]' },
    { name: 'West', sensor: 'DI[3]', light: 'DO[9-11]' }
  ],
  rules: {
    greenTime: 15000, // 15s
    yellowTime: 3000, // 3s
    redTime: 5000     // 5s
  }
};
```

## Challenge
Program sequencer to prevent North+East going green simultaneously!

**Learning**: State machines, timers, safety interlocks

**AI Build**: 10 minutes for full intersection logic!
