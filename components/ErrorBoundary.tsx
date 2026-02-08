import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

/**
 * Standard React Error Boundary to catch runtime errors in the component tree.
 * Displays a friendly fallback UI instead of crashing the entire app.
 */
export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    private handleReload = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen w-full flex items-center justify-center bg-rose-50 p-4">
                    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-rose-100 text-center">
                        <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle className="w-8 h-8 text-rose-500" />
                        </div>

                        <h2 className="text-2xl font-bold text-slate-800 mb-2">
                            Something went wrong
                        </h2>

                        <p className="text-slate-600 mb-6">
                            We encountered an unexpected error. Don't worry, your proposal is safe.
                        </p>

                        <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left overflow-auto max-h-40 text-xs font-mono text-slate-500 border border-slate-200">
                            {this.state.error && this.state.error.toString()}
                        </div>

                        <button
                            onClick={this.handleReload}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-full transition-colors shadow-md hover:shadow-lg transform active:scale-95"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
