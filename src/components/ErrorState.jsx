import { AlertCircle, RotateCcw } from "lucide-react";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/features/searchSlice";

const ErrorState = ({ message, onRetry }) => {
    const dispatch = useDispatch();
    return (
        <div className="w-full max-w-lg mx-auto py-12 px-4 flex flex-col items-center text-center">
            <div className="relative mb-5">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-center justify-center text-rose-500 shadow-sm">
                    <AlertCircle size={32} />
                </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                Failed to load results
            </h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                {message || "We encountered an error while fetching media. Please check your network or try again."}
            </p>

            <div className="mt-6 flex items-center gap-3">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all cursor-pointer active:scale-95"
                    >
                        <RotateCcw size={16} />
                        <span>Retry</span>
                    </button>
                )}
                <button
                    onClick={() => dispatch(setQuery(""))}
                    className="px-4 py-2.5 rounded-xl font-medium text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                >
                    Back to Explore
                </button>
            </div>
        </div>
    );
};

export default ErrorState;
