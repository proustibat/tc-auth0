import type { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    return (
        <div role="alert" className="p-4 bg-red-100 text-red-800 rounded">
            <p className="font-semibold">Something bad happened !</p>
            <pre className="text-sm whitespace-pre-wrap">{error.message}</pre>
            <button type="button" onClick={resetErrorBoundary} className="mt-2 px-4 py-2 bg-red-600 text-white rounded">
                Reload
            </button>
        </div>
    );
};

export default ErrorFallback;
