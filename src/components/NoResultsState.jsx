import { useDispatch, useSelector } from "react-redux";
import { setQuery, setActiveTabs } from "../redux/features/searchSlice";
import { SearchX, RotateCcw, Lightbulb, Sparkles } from "lucide-react";

const ALTERNATIVE_SUGGESTIONS = [
    "Nature", "Aesthetic", "Minimalist", "City", "Ocean", "Abstract", "Technology"
];

const NoResultsState = () => {
    const dispatch = useDispatch();
    const { query, activeTab } = useSelector((store) => store.search);

    const handleClear = () => {
        dispatch(setQuery(""));
    };

    const handleTabSwitch = (newTab) => {
        dispatch(setActiveTabs(newTab));
    };

    const handleAlternativeClick = (tag) => {
        dispatch(setQuery(tag));
    };

    const tabs = [
        { id: "photos", label: "Photos" },
        { id: "videos", label: "Videos" },
        { id: "GIF", label: "GIFs" }
    ];
    const otherTabs = tabs.filter(t => t.id !== activeTab);

    return (
        <div className="w-full max-w-2xl mx-auto py-10 sm:py-16 px-4 flex flex-col items-center text-center">
            <div className="relative mb-6">
                <div className="absolute -inset-3 bg-rose-500/10 dark:bg-rose-500/20 rounded-full blur-lg animate-pulse" />
                <div className="relative w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-lg">
                    <SearchX size={38} className="text-slate-400 dark:text-slate-400" />
                </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                No Results Found
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-md">
                We couldn't find any <span className="font-semibold text-indigo-600 dark:text-indigo-400 uppercase text-xs">{activeTab}</span> matching <span className="font-semibold text-slate-800 dark:text-slate-200">"{query}"</span>.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                    onClick={handleClear}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
                >
                    <RotateCcw size={16} />
                    <span>Clear Search</span>
                </button>

                {otherTabs.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => handleTabSwitch(t.id)}
                        className="px-4 py-2.5 rounded-xl font-medium text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer active:scale-95"
                    >
                        Try in {t.label}
                    </button>
                ))}
            </div>

            <div className="mt-10 w-full p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 text-left">
                <div className="flex items-center gap-2 font-semibold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                    <Lightbulb size={15} className="text-amber-500" />
                    Helpful Search Tips
                </div>
                <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1.5 list-disc list-inside">
                    <li>Check your search for typos or spelling errors.</li>
                    <li>Try using simpler, broader keywords (e.g. <span className="font-medium">"forest"</span> instead of <span className="font-medium">"dark foggy misty pine forest"</span>).</li>
                    <li>Switch between Photos, Videos, and GIFs tabs above.</li>
                </ul>
            </div>

            <div className="mt-8 flex flex-col items-center">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1">
                    <Sparkles size={13} className="text-indigo-400" /> Or try something popular:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                    {ALTERNATIVE_SUGGESTIONS.map((tag, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAlternativeClick(tag)}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NoResultsState;
