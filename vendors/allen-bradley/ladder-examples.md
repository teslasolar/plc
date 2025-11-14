# ⚡ Allen-Bradley Ladder Logic Examples

## Example 1: Start/Stop Circuit

```javascript
plc.addRung(
  'this.io.DI[0] && this.tags["RunPermissive"]',
  function() {
    this.io.DO[0] = true;
    this.tags["MotorRun"] = true;
  }
);

plc.addRung(
  'this.io.DI[1]',
  function() {
    this.io.DO[0] = false;
    this.tags["MotorRun"] = false;
  }
);
```

## Example 2: Conveyor with Counter

```javascript
let count = 0;
plc.addRung(
  'this.io.DI[2]',
  function() {
    count++;
    this.tags["ProductCount"] = count;
    if (count >= 100) this.tags["BatchDone"] = true;
  }
);
```

## Example 3: Timer

```javascript
let timer = 0;
plc.addRung(
  'this.io.DI[0]',
  function() {
    timer += this.scan;
    if (timer >= 5000) this.io.DO[1] = true;
  }
);
```
