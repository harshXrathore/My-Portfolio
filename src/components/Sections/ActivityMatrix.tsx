import React, { useMemo } from 'react';
import { Tooltip } from 'antd';
import { Activity } from 'lucide-react';

const TEXT_SECURITY_INTEGRITY_LOGS_MATRIX = 'SECURITY_INTEGRITY_LOGS_MATRIX';
const TEXT_STANDBY = 'STANDBY';
const TEXT_SCAN_NOMINAL = 'SCAN_NOMINAL';
const TEXT_PATCHED_VULN = 'PATCHED_VULN';
const TEXT_THREAT_BLOCKED = 'THREAT_BLOCKED';
const TEXT_SUN = 'SUN';
const TEXT_TUE = 'TUE';
const TEXT_THU = 'THU';
const TEXT_SAT = 'SAT';
const TEXT_THREAT_NEUTRALIZED = 'THREAT_NEUTRALIZED';
const TEXT_SYSTEM_PATCHED = 'SYSTEM_PATCHED';
const TEXT_NOMINAL_COMPLIANT = 'NOMINAL_COMPLIANT';
const TEXT_ATTACK_SOURCE = 'ATTACK_SOURCE: ';

interface LogCell {
  state: 0 | 1 | 2 | 3; // 0: standby, 1: nominal test, 2: patched vuln, 3: threat blocked
  date: string;
  time: string;
  log: string;
  ip?: string;
}

export const ActivityMatrix: React.FC = () => {
  // Generate a mock dataset for 7 rows x 24 columns = 168 audits
  const matrixData: LogCell[][] = useMemo(() => {
    const rows = 7;
    const cols = 24;
    const data: LogCell[][] = [];

    const mockLogs = [
      { log: 'System audit: WAF compliance checked.', state: 1 as const },
      { log: 'Port scan blocked on local gateway.', state: 3 as const, ip: '198.51.100.22' },
      { log: 'SQL Injection payload neutralized by filter.', state: 3 as const, ip: '203.0.113.142' },
      { log: 'IDOR vulnerability patched on route /api/v1/user.', state: 2 as const },
      { log: 'XSS filtering applied to contact forms.', state: 2 as const },
      { log: 'Nominal penetration test scan completed.', state: 1 as const },
      { log: 'Wireshark telemetry node reporting nominal.', state: 1 as const },
      { log: 'SSL certificate verification completed.', state: 1 as const },
      { log: 'Brute-force vector blocked by Fail2Ban.', state: 3 as const, ip: '185.190.140.9' }
    ];

    const now = new Date();

    for (let r = 0; r < rows; r++) {
      const rowData: LogCell[] = [];
      for (let c = 0; c < cols; c++) {
        // Deterministic but random-looking distribution
        const indexValue = (r * 13 + c * 7) % 100;
        let stateVal: 0 | 1 | 2 | 3 = 0;
        
        if (indexValue > 92) stateVal = 3;      // 3: Threat Blocked (Red)
        else if (indexValue > 83) stateVal = 2; // 2: Patched Vuln (Purple)
        else if (indexValue > 52) stateVal = 1; // 1: Nominal Scan (Cyan)
        
        // Date offset back in time
        const dayDiff = (cols - 1 - c) * 7 + (rows - 1 - r);
        const cellDate = new Date(now.getTime() - dayDiff * 24 * 60 * 60 * 1000);
        const dateStr = cellDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        let timeStr = `${String(Math.floor(Math.random() * 12 + 1)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`;
        
        let cellLog = 'Telemetry: System standby mode. Monitoring ports.';
        let cellIp = undefined;
        
        if (stateVal > 0) {
          const logIndex = (r * 5 + c * 3) % mockLogs.length;
          const logTemplate = mockLogs.at(logIndex)!;
          cellLog = logTemplate.log;
          cellIp = logTemplate.ip;
        }

        rowData.push({
          state: stateVal,
          date: dateStr,
          time: timeStr,
          log: cellLog,
          ip: cellIp
        });
      }
      data.push(rowData);
    }
    return data;
  }, []);

  const getCellColor = (state: number) => {
    switch (state) {
      case 3: // Threat Blocked
        return 'bg-rose-500/80 shadow-[0_0_8px_#f43f5e] hover:bg-rose-400 border border-rose-400/20';
      case 2: // Patched Vuln
        return 'bg-purple-500/70 shadow-[0_0_6px_#a855f7] hover:bg-purple-400 border border-purple-400/20';
      case 1: // Nominal Scan
        return 'bg-cyan-500/50 shadow-[0_0_5px_#06b6d4] hover:bg-cyan-400 border border-cyan-400/20';
      default: // Standby
        return 'bg-slate-900/60 hover:bg-slate-800 border border-slate-950';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800/40">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <h4 className="font-cyber font-bold text-xs text-white tracking-widest uppercase">
            {TEXT_SECURITY_INTEGRITY_LOGS_MATRIX}
          </h4>
        </div>
        
        {/* Legends */}
        <div className="flex flex-wrap items-center gap-4 font-mono text-[9px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-slate-900 border border-slate-950" />
            {TEXT_STANDBY}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-cyan-500/50 border border-cyan-400/20 shadow-[0_0_5px_#06b6d4]" />
            {TEXT_SCAN_NOMINAL}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-purple-500/70 border border-purple-400/20 shadow-[0_0_6px_#a855f7]" />
            {TEXT_PATCHED_VULN}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-rose-500/80 border border-rose-400/20 shadow-[0_0_8px_#f43f5e]" />
            {TEXT_THREAT_BLOCKED}
          </span>
        </div>
      </div>

      {/* Grid Container */}
      <div 
        className="p-5 rounded-2xl overflow-x-auto no-scrollbar"
        style={{
          background: 'rgba(2, 6, 23, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.03)',
        }}
      >
        <div className="flex gap-2 min-w-[550px] justify-between">
          {/* Days side labels */}
          <div className="flex flex-col justify-between font-mono text-[9px] text-slate-600 select-none pb-0.5">
            <span>{TEXT_SUN}</span>
            <span>{TEXT_TUE}</span>
            <span>{TEXT_THU}</span>
            <span>{TEXT_SAT}</span>
          </div>

          {/* Matrix Columns */}
          <div className="flex-1 grid grid-cols-24 gap-1.5">
            {Array.from({ length: 24 }).map((_, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-1.5">
                {Array.from({ length: 7 }).map((_, rowIdx) => {
                  const row = matrixData.at(rowIdx)!;
                  const cell = row.at(colIdx)!;
                  const stateClass = getCellColor(cell.state);

                  // Tooltip custom details
                  const tooltipContent = (
                    <div className="font-mono text-[10px] space-y-1.5 p-1 select-none leading-relaxed text-left">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-1 gap-4">
                        <span className="text-slate-500 text-[8px]">{cell.date} | {cell.time}</span>
                        <span className={`font-bold text-[8px] px-1.5 py-0.5 rounded ${
                          cell.state === 3 ? 'text-rose-400 bg-rose-950/30' :
                          cell.state === 2 ? 'text-purple-400 bg-purple-950/30' :
                          cell.state === 1 ? 'text-cyan-400 bg-cyan-950/30' : 'text-slate-500 bg-slate-950'
                        }`}>
                          {cell.state === 3 ? TEXT_THREAT_NEUTRALIZED :
                           cell.state === 2 ? TEXT_SYSTEM_PATCHED :
                           cell.state === 1 ? TEXT_NOMINAL_COMPLIANT : TEXT_STANDBY}
                        </span>
                      </div>
                      <p className="text-slate-200 text-xs">{cell.log}</p>
                      {cell.ip && (
                        <div className="text-[9px] text-cyan-500/80">
                          {TEXT_ATTACK_SOURCE}<span className="underline">{cell.ip}</span>
                        </div>
                      )}
                    </div>
                  );

                  return (
                    <Tooltip
                      key={rowIdx}
                      title={tooltipContent}
                      color="#040712"
                      overlayInnerStyle={{
                        border: '1px solid rgba(6,182,212,0.2)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.6)',
                        borderRadius: '8px'
                      }}
                    >
                      <div
                        className={`w-full aspect-square rounded-[4px] cursor-pointer transition-all duration-300 ${stateClass}`}
                      />
                    </Tooltip>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
