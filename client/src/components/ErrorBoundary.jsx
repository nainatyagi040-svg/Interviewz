import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Last line of defense: if any child throws during render, show a friendly
 * fallback instead of a blank white screen or a broken React tree.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('Uncaught UI error:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.assign('/');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center"
          style={{ background: '#05060f' }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full text-[#ffcf8f]"
            style={{
              background: 'rgba(255,180,90,0.12)',
              border: '1px solid rgba(255,180,90,0.28)',
            }}
          >
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold text-[#d8ecf8]">Something went wrong</h1>
          <p className="max-w-sm text-[#9da7ba]">
            The page hit an unexpected error. Your progress in this session may be lost, but you can
            head back and start fresh.
          </p>
          <button
            onClick={this.handleReset}
            className="mt-2 rounded-full px-5 py-2.5 font-medium text-white transition-all duration-300 hover:brightness-110"
            style={{
              background: '#663af3',
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.22), 0 8px 24px rgba(102,58,243,0.45)',
            }}
          >
            Back to home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
