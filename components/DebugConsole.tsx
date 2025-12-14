'use client';

import { useEffect, useState } from 'react';

interface LogEntry {
  timestamp: number;
  type: 'error' | 'warn' | 'info' | 'network';
  message: string;
  stack?: string;
  userAgent?: string;
  url?: string;
}

export default function DebugConsole() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Check if debug mode is enabled
    if (typeof window === 'undefined') return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const debugParam = urlParams.get('debug');
    const debugStorage = localStorage.getItem('DEBUG');
    
    if (debugParam === '1' || debugStorage === '1') {
      setIsVisible(true);
      
      // Enable localStorage debug for future sessions
      if (debugParam === '1') {
        localStorage.setItem('DEBUG', '1');
      }
    }

    if (!isVisible && debugParam !== '1' && debugStorage !== '1') return;

    const addLog = (entry: LogEntry) => {
      setLogs(prev => [...prev.slice(-49), entry]); // Keep last 50
    };

    // Capture window.onerror
    const originalOnError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      addLog({
        timestamp: Date.now(),
        type: 'error',
        message: `${message} at ${source}:${lineno}:${colno}`,
        stack: error?.stack,
        userAgent: navigator.userAgent,
      });
      
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }
      return false;
    };

    // Capture unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      addLog({
        timestamp: Date.now(),
        type: 'error',
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        userAgent: navigator.userAgent,
      });
    };
    window.addEventListener('unhandledrejection', handleRejection);

    // Intercept console.error
    const originalError = console.error;
    console.error = (...args: any[]) => {
      addLog({
        timestamp: Date.now(),
        type: 'error',
        message: args.map(a => String(a)).join(' '),
        userAgent: navigator.userAgent,
      });
      originalError.apply(console, args);
    };

    // Intercept console.warn
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      addLog({
        timestamp: Date.now(),
        type: 'warn',
        message: args.map(a => String(a)).join(' '),
        userAgent: navigator.userAgent,
      });
      originalWarn.apply(console, args);
    };

    // Log device info on mount
    addLog({
      timestamp: Date.now(),
      type: 'info',
      message: `Device: ${navigator.userAgent}, Screen: ${window.screen.width}x${window.screen.height}, Viewport: ${window.innerWidth}x${window.innerHeight}, VisualViewport: ${window.visualViewport?.width}x${window.visualViewport?.height}`,
      userAgent: navigator.userAgent,
    });

    // Monitor image load failures
    const handleImageError = (e: Event) => {
      const img = e.target as HTMLImageElement;
      addLog({
        timestamp: Date.now(),
        type: 'network',
        message: `Image failed to load: ${img.src}`,
        url: img.src,
      });
    };
    
    // Listen to all image errors
    document.addEventListener('error', handleImageError, true);

    return () => {
      window.onerror = originalOnError;
      window.removeEventListener('unhandledrejection', handleRejection);
      console.error = originalError;
      console.warn = originalWarn;
      document.removeEventListener('error', handleImageError, true);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}`;
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999999,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        color: '#00ff00',
        fontFamily: 'monospace',
        fontSize: '10px',
        maxHeight: isMinimized ? '40px' : '300px',
        overflow: 'hidden',
        borderTop: '2px solid #00ff00',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px',
          backgroundColor: '#111',
          borderBottom: '1px solid #333',
          cursor: 'pointer',
        }}
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <span style={{ fontWeight: 'bold' }}>
          🐛 Debug Console ({logs.length} logs) {isMinimized ? '▲' : '▼'}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLogs([]);
          }}
          style={{
            background: '#ff4444',
            color: 'white',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '3px',
            fontSize: '10px',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      </div>

      {/* Logs */}
      {!isMinimized && (
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          {logs.slice().reverse().map((log, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: '4px',
                padding: '4px',
                backgroundColor: log.type === 'error' ? '#331111' : log.type === 'warn' ? '#332211' : '#111',
                borderLeft: `3px solid ${log.type === 'error' ? '#ff4444' : log.type === 'warn' ? '#ffaa44' : log.type === 'network' ? '#ff44ff' : '#44ff44'}`,
                wordBreak: 'break-word',
              }}
            >
              <div style={{ color: '#888', fontSize: '9px' }}>
                [{formatTime(log.timestamp)}] {log.type.toUpperCase()}
              </div>
              <div style={{ marginTop: '2px', color: log.type === 'error' ? '#ff8888' : log.type === 'warn' ? '#ffcc88' : '#88ff88' }}>
                {log.message}
              </div>
              {log.stack && (
                <details style={{ marginTop: '4px', fontSize: '9px', color: '#666' }}>
                  <summary style={{ cursor: 'pointer', color: '#aaa' }}>Stack trace</summary>
                  <pre style={{ marginTop: '2px', whiteSpace: 'pre-wrap', color: '#888' }}>
                    {log.stack}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
