# 🔧 Vendor Template Guide

## Adding a New PLC Vendor to the Simulator

This guide shows how to add new PLC vendors using our modular template system.

### File Structure (< 250 tokens each)

```
vendors/
└── your-vendor/
    ├── config.json          # Core device parameters
    ├── io-specs.json        # I/O configuration & mapping
    ├── examples.md          # Programming examples
    └── quick-start.md       # Getting started guide
```

---

## 1. config.json Template

```json
{
  "vendor": "SHORT_CODE",
  "name": "Vendor Name",
  "fullName": "Model Series Name",
  "series": "Specific Model",
  "color": "#HEXCOLOR",
  "colorHex": "0xHEXCOLOR",
  "manufacturer": "Company Name",
  "country": "Country",
  "syntax": "ladder|stl|fbd",
  "scanRate": 10,
  "scanRateUnit": "ms"
}
```

**Example: Omron**
```json
{
  "vendor": "Omron",
  "name": "Omron",
  "fullName": "NJ-Series Controller",
  "series": "NJ501-1500",
  "color": "#ff6600",
  "colorHex": "0xff6600",
  "manufacturer": "Omron Corporation",
  "country": "Japan",
  "syntax": "ladder",
  "scanRate": 10,
  "scanRateUnit": "ms"
}
```

---

## 2. io-specs.json Template

```json
{
  "digitalInputs": 16,
  "digitalOutputs": 16,
  "analogInputs": 8,
  "analogOutputs": 8,
  "maxIOPoints": 10000,
  "voltage": "24VDC",
  "mapping": {
    "DI": {
      "0": "InputName0",
      "1": "InputName1"
    },
    "DO": {
      "0": "OutputName0",
      "1": "OutputName1"
    }
  }
}
```

---

## 3. examples.md Template

```markdown
# ⚡ Vendor Name Examples

## Example 1: Basic Control

\`\`\`javascript
plc.addRung(
  'this.io.DI[0]',
  function() {
    this.io.DO[0] = true;
  }
);
\`\`\`

## Example 2: Advanced Logic

\`\`\`javascript
// Your vendor-specific code
\`\`\`
```

---

## 4. Integration Steps

### Step 1: Add to VENDORS Object (index.html)

```javascript
const VENDORS = {
  // Existing vendors...
  YourVendor: {
    name: 'YourVendor',
    fullName: 'Model Name',
    color: 0xff6600,
    syntax: 'ladder',
    tags: ['Tag1', 'Tag2'],
    scan: 10
  }
};
```

### Step 2: Update Render3D

```javascript
// Add color mapping for 3D visualization
const material = new THREE.MeshPhongMaterial({
  color: VENDORS[plc.vendor].color
});
```

### Step 3: Add Parser (if custom syntax)

```javascript
class LadderParser {
  parseYourVendor(str) {
    // Custom parsing logic
    return transformedCode;
  }
}
```

---

## 5. Quick Start Template

```markdown
# 🚀 Vendor Name Quick Start

## Initialize

\`\`\`javascript
const plc = new PLC('VENDOR_CODE', 1);
plc.init();
\`\`\`

## Add Logic

\`\`\`javascript
plc.addRung('condition', function() { /* action */ });
\`\`\`

## Run

\`\`\`javascript
plc.setState('EXECUTE');
\`\`\`
```

---

## Real Example: Adding Schneider Electric

### vendors/schneider/config.json
```json
{
  "vendor": "Schneider",
  "name": "Schneider Electric",
  "fullName": "Modicon M580",
  "series": "M580-CPU",
  "color": "#00a651",
  "colorHex": "0x00a651",
  "manufacturer": "Schneider Electric",
  "country": "France",
  "syntax": "ladder",
  "scanRate": 15,
  "scanRateUnit": "ms"
}
```

### vendors/schneider/io-specs.json
```json
{
  "digitalInputs": 16,
  "digitalOutputs": 16,
  "analogInputs": 8,
  "analogOutputs": 8,
  "maxIOPoints": 32000,
  "voltage": "24VDC",
  "mapping": {
    "DI": { "0": "%I0.0", "1": "%I0.1" },
    "DO": { "0": "%Q0.0", "1": "%Q0.1" }
  }
}
```

---

## Key Principles

1. **< 250 tokens per file**: Keep files small and focused
2. **JSON for data**: Use JSON for config/specs
3. **MD for docs**: Use Markdown for examples/guides
4. **Consistent naming**: Follow existing patterns
5. **Real specs**: Use actual vendor specifications

---

## Testing Your Vendor

```javascript
// Test in browser console
const testPLC = new PLC('YourVendor', 99);
testPLC.init();
testPLC.setState('EXECUTE');
console.log(testPLC);
```

---

**🎓 Pro Tip**: Study existing vendor files before creating your own!
