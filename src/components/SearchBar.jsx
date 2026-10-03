import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from '../redux/features/searchSlice'
import { Search, X } from "lucide-react";

const SearchBar = () => {
    const { query } = useSelector((store) => store.search);
    const [text, setText] = useState(query || '');
    const dispatch = useDispatch();

    useEffect(() => {
        setText(query || '');
    }, [query]);

    const submitHandler = (e) => {
        e.preventDefault()
        if (text.trim()) {
            dispatch(setQuery(text.trim()))
        }
    }
    const handleClear = () => {
        setText('');
        dispatch(setQuery(''));
    };

    return (
        <div className="bg-indigo-50 dark:bg-[#0f172a] text-black dark:text-slate-100 flex flex-col items-center w-full py-8 sm:py-12 md:py-14 px-4 sm:px-6 border-b border-transparent dark:border-slate-800 transition-colors duration-300">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold mb-2 text-center leading-tight text-slate-900 dark:text-slate-100">A world of inspiration. One Search.</h2>
            <p className="text-gray-400 dark:text-slate-500 text-xs sm:text-sm mb-4 sm:mb-6 text-center max-w-md">Discover the images, videos and GIFs that bring your ideas to life.</p>
            <form
                onSubmit={submitHandler}
                className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 sm:p-1.5 w-full max-w-xl md:max-w-2xl lg:max-w-3xl shadow-sm focus-within:border-indigo-400 dark:focus-within:border-indigo-500 transition-all"
            >
                <div className="pl-2.5 sm:pl-3 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Search size={20} strokeWidth={2.5} />
                </div>
                <input
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base text-black dark:text-slate-100 bg-transparent outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600 min-w-0"
                    type="text"
                    placeholder="Search anything..."
                />

                {text && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="p-1 mr-1 sm:mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0"
                    >
                        <X size={16} strokeWidth={2.5} />
                    </button>
                )}
                <button
                    type="submit"
                    className="bg-[#4f46e5] hover:bg-indigo-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-lg outline-none cursor-pointer active:scale-95 transition-all flex items-center justify-center whitespace-nowrap shrink-0"
                >
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchBar