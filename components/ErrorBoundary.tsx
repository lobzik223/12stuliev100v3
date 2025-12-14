'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Log to debug console if it exists
    if (typeof window !== 'undefined') {
      console.error('Component Stack:', errorInfo.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            padding: '20px',
            margin: '20px',
            backgroundColor: '#fee',
            border: '2px solid #f88',
            borderRadius: '8px',
            color: '#333',
            fontFamily: 'monospace',
          }}
        >
          <h2 style={{ color: '#d00', marginBottom: '10px' }}>
            ⚠️ Something went wrong
          </h2>
          <details style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
            <summary style={{ cursor: 'pointer', marginBottom: '10px', fontWeight: 'bold' }}>
              Error Details
            </summary>
            <div style={{ marginTop: '10px' }}>
              <strong>Error:</strong>
              <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
                {this.state.error?.toString()}
              </pre>
            </div>
            {this.state.error?.stack && (
              <div style={{ marginTop: '10px' }}>
                <strong>Stack:</strong>
                <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto', fontSize: '10px' }}>
                  {this.state.error.stack}
                </pre>
              </div>
            )}
            {this.state.errorInfo?.componentStack && (
              <div style={{ marginTop: '10px' }}>
                <strong>Component Stack:</strong>
                <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto', fontSize: '10px' }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </details>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null, errorInfo: null });
              window.location.reload();
            }}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#d00',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
