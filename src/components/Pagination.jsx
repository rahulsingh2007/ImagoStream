import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/features/searchSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
    const dispatch = useDispatch();
    const { page, hasMore } = useSelector((store) => store.search);

    const handlePrev = () => {
        if (page <= 1) return;
        dispatch(setPage(page - 1));
    };

    const handleNext = () => {
        if (!hasMore) return;
        dispatch(setPage(page + 1));
    };

    const isFirstPage = page <= 1;

    return (
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-8 mb-4 select-none">

            <button
                onClick={handlePrev}
                disabled={isFirstPage}
                title="Previous page"
                className={`
                    flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5
                    rounded-xl font-semibold text-xs sm:text-sm
                    border transition-all duration-200
                    ${isFirstPage
                        ? 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm cursor-pointer active:scale-95'
                    }
                `}              
            >
                <ChevronLeft size={16} strokeWidth={2.5} />
                <span>Prev</span>
            </button>

            <div className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-indigo-600 dark:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-sm shadow-indigo-500/30 min-w-12 justify-center">
                <span>{page}</span>
            </div>

            <button
                onClick={handleNext}
                disabled={!hasMore}
                title="Next page"
                className={`
                    flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5
                    rounded-xl font-semibold text-xs sm:text-sm
                    border transition-all duration-200
                    ${!hasMore
                        ? 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-sm cursor-pointer active:scale-95'
                    }
                `}
            >
                <span>Next</span>
                <ChevronRight size={16} strokeWidth={2.5} />
            </button>

        </div>
    );
};

export default Pagination;
