# 🚀 Allen-Bradley Quick Start

## Initialize PLC

```javascript
const plc_AB = new PLC('AB', 1);
plc_AB.init();
comms.register(plc_AB);
renderer.addPLC(plc_AB, [-2.5, 0, 0]);
```

## Add Logic

```javascript
plc_AB.addRung(
  'this.io.DI[0]',
  function() { this.io.DO[0] = true; }
);
```

## Start

```javascript
plc_AB.setState('EXECUTE');
setInterval(() => plc_AB.scan(), 10);
```
