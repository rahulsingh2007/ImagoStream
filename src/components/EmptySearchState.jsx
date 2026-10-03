import { useDispatch } from "react-redux";
import { setQuery, setActiveTabs } from "../redux/features/searchSlice";
import { Sparkles, Compass, Camera, Film, Flame, Search, ArrowUpRight } from "lucide-react";

const SUGGESTIONS = [
    { label: "🏔️ Nature", query: "Nature", tab: "photos" },
    { label: "🏙️ Cyberpunk", query: "Cyberpunk City", tab: "photos" },
    { label: "🌌 Deep Space", query: "Galaxy Space", tab: "photos" },
    { label: "⚡ Neon Aesthetic", query: "Neon Aesthetic", tab: "photos" },
    { label: "🎬 Cinematic", query: "Cinematic Drone", tab: "videos" },
    { label: "🐾 Cute Animals", query: "Cute Animals", tab: "photos" },
    { label: "🎨 3D Abstract", query: "3D Abstract", tab: "photos" },
    { label: "🔥 Trending GIFs", query: "Celebration", tab: "GIF" },
];

const MEDIA_TYPES = [
    {
        title: "High-Res Photos",
        desc: "Over 5M+ crisp photographs for design, wallpapers, and social media.",
        icon: Camera,
        tab: "photos",
        defaultQuery: "Landscape Wallpaper",
        badge: "Photos",
        gradient: "from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20",
        borderHover: "hover:border-blue-400 dark:hover:border-blue-500",
        iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
        title: "Cinematic Videos",
        desc: "Smooth HD and 4K stock footage ready for backgrounds and edits.",
        icon: Film,
        tab: "videos",
        defaultQuery: "Ocean Waves",
        badge: "Videos",
        gradient: "from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20",
        borderHover: "hover:border-purple-400 dark:hover:border-purple-500",
        iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
        title: "Expressive GIFs",
        desc: "Trending animations, funny memes, and reactions for every moment.",
        icon: Sparkles,
        tab: "GIF",
        defaultQuery: "Cat Vibes",
        badge: "GIFs",
        gradient: "from-amber-500/10 to-rose-500/10 dark:from-amber-500/20 dark:to-rose-500/20",
        borderHover: "hover:border-rose-400 dark:hover:border-rose-500",
        iconColor: "text-rose-600 dark:text-rose-400",
    },
];

const EmptySearchState = () => {
    const dispatch = useDispatch();

    const handleSelectTag = (query, tab = "photos") => {
        dispatch(setActiveTabs(tab));
        dispatch(setQuery(query));
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-8 sm:py-12 px-4 flex flex-col items-center">
            <div className="relative mb-6 flex items-center justify-center">
                <div className="absolute -inset-4 bg-linear-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-linear-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-950/60 dark:to-purple-950/60 border border-indigo-200/60 dark:border-indigo-500/30 flex items-center justify-center shadow-xl shadow-indigo-500/10">
                    <Compass size={40} className="text-indigo-600 dark:text-indigo-400 animate-[spin_12s_linear_infinite]" />
                    <div className="absolute -top-1.5 -right-1.5 p-1.5 rounded-xl bg-indigo-600 text-white shadow-md">
                        <Sparkles size={14} />
                    </div>
                </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 text-center tracking-tight">
                Start Your Visual Journey
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400 text-center max-w-lg leading-relaxed">
                Explore millions of high-resolution photos, cinematic videos, and trending animated GIFs. Type a search above or click a topic to begin.
            </p>

            <div className="mt-8 w-full flex flex-col items-center">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
                    <Flame size={14} className="text-orange-500" />
                    Popular Searches
                </div>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-3xl">
                    {SUGGESTIONS.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSelectTag(item.query, item.tab)}
                            className="group flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 hover:shadow-md hover:shadow-indigo-500/10 transition-all duration-200 cursor-pointer active:scale-95"
                        >
                            <span>{item.label}</span>
                            <Search size={12} className="opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-indigo-500" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                {MEDIA_TYPES.map((media, idx) => {
                    const IconComponent = media.icon;
                    return (
                        <div
                            key={idx}
                            onClick={() => handleSelectTag(media.defaultQuery, media.tab)}
                            className={`group relative p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xs shadow-xs ${media.borderHover} hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden`}
                        >
                            <div className={`absolute inset-0 bg-linear-to-br ${media.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                            <div>
                                <div className="flex items-center justify-between mb-3.5">
                                    <div className={`w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${media.iconColor} shadow-inner`}>
                                        <IconComponent size={20} />
                                    </div>
                                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                        {media.badge}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-base sm:text-lg text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                                    {media.title}
                                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </h3>
                                <p className="mt-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                    {media.desc}
                                </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-medium text-indigo-600 dark:text-indigo-400">
                                <span>Explore {media.badge}</span>
                                <span className="text-slate-400 dark:text-slate-500 group-hover:translate-x-0.5 transition-transform">→</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EmptySearchState;
