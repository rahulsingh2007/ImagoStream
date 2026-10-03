import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQuery, setActiveTabs } from "../redux/features/searchSlice";
import { Bookmark, Compass, Sparkles, Image, Heart, ArrowRight } from "lucide-react";

const EmptyCollectionState = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleExplore = (tab = "photos", query = "") => {
        dispatch(setActiveTabs(tab));
        if (query) {
            dispatch(setQuery(query));
        }
        navigate("/");
    };

    return (
        <div className="w-full max-w-4xl mx-auto py-12 sm:py-16 px-4 flex flex-col items-center text-center">
            <div className="relative mb-6">
                <div className="absolute -inset-4 bg-linear-to-tr from-indigo-500/25 via-pink-500/20 to-purple-500/25 rounded-full blur-xl animate-pulse" />
                <div className="relative w-22 h-22 sm:w-26 sm:h-26 rounded-3xl bg-linear-to-tr from-white via-indigo-50/50 to-purple-50/50 dark:from-slate-800 dark:via-indigo-950/40 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-500/30 flex items-center justify-center shadow-xl shadow-indigo-500/10">
                    <Bookmark size={44} className="text-indigo-600 dark:text-indigo-400 fill-indigo-600/15 dark:fill-indigo-400/20" strokeWidth={1.75} />
                    <div className="absolute -top-1 -right-1 p-2 rounded-xl bg-pink-500 text-white shadow-md">
                        <Heart size={15} fill="currentColor" />
                    </div>
                </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                Your Collection is Empty
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
                Save your favorite photos, videos, and GIFs while browsing. Click the bookmark icon on any media card to collect and organize your inspirations here.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                    onClick={() => handleExplore("photos")}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/30 transition-all cursor-pointer active:scale-95 group"
                >
                    <Compass size={18} className="group-hover:rotate-45 transition-transform" />
                    <span>Explore Media</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="mt-12 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                    onClick={() => handleExplore("photos", "Nature")}
                    className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xs text-left shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group"
                >
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                        <Image size={18} />
                    </div>
                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">STEP 1</div>
                    <h4 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        Discover Visuals
                    </h4>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Search across millions of Unsplash photos, Pexels clips, and GIPHY animations.
                    </p>
                </div>

                <div
                    onClick={() => handleExplore("videos", "Ocean")}
                    className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xs text-left shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group"
                >
                    <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3">
                        <Bookmark size={18} />
                    </div>
                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">STEP 2</div>
                    <h4 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        One-Click Bookmark
                    </h4>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Hover over any card and click the bookmark button to pin it to your library.
                    </p>
                </div>

                <div
                    onClick={() => handleExplore("GIF", "Happy")}
                    className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xs text-left shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group"
                >
                    <div className="w-9 h-9 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-3">
                        <Sparkles size={18} />
                    </div>
                    <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">STEP 3</div>
                    <h4 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        Revisit Anytime
                    </h4>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Your saved items persist securely on your browser so you never lose an idea.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmptyCollectionState;
