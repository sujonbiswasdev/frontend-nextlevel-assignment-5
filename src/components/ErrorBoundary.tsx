// components/ErrorBoundary.tsx
"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("🔥 Error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="w-full flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            
            <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 max-w-md w-full border border-red-100 dark:border-red-900/40">
              
              <div className="text-5xl mb-4">⚠️</div>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Something went wrong
              </h2>

              <p className="text-gray-500 text-sm mb-6">
                We couldn’t load this content. Please try again.
              </p>

              <button
                onClick={this.handleReset}
                className="w-full py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-all"
              >
                🔄 Try Again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}