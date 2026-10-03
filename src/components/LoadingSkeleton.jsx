import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const LoadingSkeleton = () => {
    const { query, activeTab } = useSelector((store) => store.search);

    return (
        <div className="w-full max-w-7xl mx-auto py-6">
            <div className="flex items-center justify-center gap-2 mb-8 text-sm font-medium text-slate-500 dark:text-slate-400">
                <Loader2 size={18} className="animate-spin text-indigo-600 dark:text-indigo-400" />
                <span>
                    Searching <span className="uppercase text-xs font-semibold text-indigo-600 dark:text-indigo-400">{activeTab}</span> for <span className="font-semibold text-slate-800 dark:text-slate-200">"{query}"</span>...
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 w-full">
                {Array.from({ length: 10 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="relative w-full h-56 sm:h-60 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800/60 animate-pulse border border-slate-200/50 dark:border-slate-800"
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 dark:via-slate-700/20 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
                        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-700/60" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingSkeleton;
