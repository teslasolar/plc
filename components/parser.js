// Multi-vendor Ladder Logic Parser
export class LadderParser {
    parse(str, vendor) {
        if (vendor === 'AB') return this.parseAB(str);
        if (vendor === 'Siemens') return this.parseSTL(str);
        return this.parseMitsu(str);
    }

    parseAB(str) {
        // Allen-Bradley: XIC (Examine If Closed), OTE (Output Energize)
        return str
            .replace(/XIC\((\w+)\)/g, 'this.tags["$1"]')
            .replace(/OTE\((\w+)\)/g, '() => this.tags["$1"] = true');
    }

    parseSTL(str) {
        // Siemens STL: A (AND), = (Assignment)
        return str
            .replace(/A\s+(\w+)/g, 'this.tags["$1"]')
            .replace(/=\s+(\w+)/g, '() => this.tags["$1"] = true');
    }

    parseMitsu(str) {
        // Mitsubishi: LD (Load), OUT (Output)
        return str
            .replace(/LD\s+(\w+)/g, 'this.tags["$1"]')
            .replace(/OUT\s+(\w+)/g, '() => this.tags["$1"] = true');
    }
}
