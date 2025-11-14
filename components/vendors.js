// Vendor configuration registry
export const VENDORS = {
    AB: {
        name: 'Allen-Bradley',
        fullName: 'Logix5000',
        color: 0x0066cc,
        syntax: 'ladder',
        tags: ['Tag1', 'Tag2', 'ProductCount', 'ConveyorRun'],
        scan: 10
    },
    Siemens: {
        name: 'Siemens',
        fullName: 'S7-1500',
        color: 0x009999,
        syntax: 'stl',
        tags: ['DB1.DBX0.0', 'DB1.DBD4', 'M0.0', 'Q0.0'],
        scan: 20
    },
    Mitsu: {
        name: 'Mitsubishi',
        fullName: 'FX5U',
        color: 0xcc0000,
        syntax: 'ladder',
        tags: ['X0', 'Y0', 'M0', 'D0'],
        scan: 10
    }
};
