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
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold text-slate-900">Something went wrong</h1>
          <p className="max-w-sm text-slate-500">
            The page hit an unexpected error. Your progress in this session may be lost, but you can
            head back and start fresh.
          </p>
          <button
            onClick={this.handleReset}
            className="mt-2 rounded-xl bg-brand-600 px-5 py-2.5 font-medium text-white transition hover:bg-brand-700"
          >
            Back to home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
