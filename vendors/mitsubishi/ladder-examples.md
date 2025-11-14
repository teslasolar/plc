# ⚡ Mitsubishi Ladder Logic Examples

## Example 1: LD/OUT Instructions

```javascript
plc.addRung(
  'this.tags["X0"]',
  function() {
    this.tags["Y0"] = true;
    this.io.DO[0] = true;
  }
);
```

## Example 2: Data Register Manipulation

```javascript
plc.addRung(
  'this.tags["M0"]',
  function() {
    this.tags["D0"] = this.io.AI[0] * 100;
  }
);
```

## Example 3: High-Speed Counter

```javascript
let counter = 0;
plc.addRung(
  'this.tags["X1"]',
  function() {
    counter++;
    this.tags["D100"] = counter;
  }
);
```
