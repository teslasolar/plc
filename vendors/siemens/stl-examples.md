# ⚡ Siemens STL/LAD Examples

## Example 1: Basic Motor Control (STL)

```javascript
plc.addRung(
  'this.tags["I0.0"] && this.tags["M0.0"]',
  function() {
    this.tags["Q0.0"] = true;
    this.io.DO[0] = true;
  }
);
```

## Example 2: Data Block Access

```javascript
plc.addRung(
  'this.tags["DB1.DBX0.0"]',
  function() {
    this.tags["DB1.DBD4"] = this.io.AI[0];
  }
);
```

## Example 3: Network Communication

```javascript
plc.addRung(
  'this.tags["M0.1"]',
  function() {
    comms.write(2, 'DB1.DBD4', this.tags["Setpoint"]);
  }
);
```
