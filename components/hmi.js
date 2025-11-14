// HMI - ISA-95 L2 SCADA Interface
import { VENDORS } from './vendors.js';

export class HMI {
    constructor(elementId) {
        this.el = document.getElementById(elementId);
    }

    update(plcs, comms) {
        let html = '<h3>📊 ISA-95 L2 SCADA</h3>';
        html += `<div style="font-size:9px;color:#666;">Protocol: ${comms.proto.toUpperCase()} | Traffic: ${comms.traffic} | Latency: ${comms.latency.toFixed(1)}ms</div>`;

        plcs.forEach(p => {
            const vendor = VENDORS[p.vendor];
            html += `
                <div class="plc-row vendor-${p.vendor}">
                    <div style="font-weight:bold;color:#00ffff;">${vendor.fullName} [${p.addr}]</div>
                    <div>State: <span class="state-${p.state}">${p.state}</span></div>
                    <div>Scan: ${p.scanCount} (${p.scan}ms)</div>
                    <div style="margin-top:5px;font-size:10px;">
                        <strong>Digital Inputs:</strong>
                        <div class="io-grid">
                            ${p.io.DI.slice(0, 8).map((v, i) =>
                                `<div class="io-bit ${v ? 'on' : ''}">${i}:${v ? '1' : '0'}</div>`
                            ).join('')}
                        </div>
                    </div>
                    <div style="margin-top:5px;font-size:10px;">
                        <strong>Digital Outputs:</strong>
                        <div class="io-grid">
                            ${p.io.DO.slice(0, 8).map((v, i) =>
                                `<div class="io-bit ${v ? 'on' : ''}">${i}:${v ? '1' : '0'}</div>`
                            ).join('')}
                        </div>
                    </div>
                </div>`;
        });

        this.el.innerHTML = html;
    }
}
