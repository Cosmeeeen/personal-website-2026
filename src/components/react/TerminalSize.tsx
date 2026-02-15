import React, { useState, useEffect, useRef } from 'react';

export default function TerminalSize() {
  const [size, setSize] = useState({ cols: 80, rows: 24 });
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // We observe the terminal window (the grandparent of this span)
    const terminalWindow = spanRef.current?.closest('#terminal-window');
    
    if (!terminalWindow) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        
        // Using common mono-font ratios
        const cols = Math.floor(width / 8.4); 
        const rows = Math.floor(height / 20);
        
        setSize({ cols, rows });
      }
    });

    resizeObserver.observe(terminalWindow);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <span ref={spanRef} className="tabular-nums">
      {size.cols}x{size.rows}
    </span>
  );
}
