import { useDispatch, useSelector } from "react-redux"
import { setActiveTabs } from "../redux/features/searchSlice"

const Tabs = () => {
    const tabs = ['photos', 'videos', 'GIF']
    const dispatch = useDispatch()
    const activeTab = useSelector((state) => state.search.activeTab)
    
    return (
        <div className="flex gap-2 sm:gap-4 md:gap-5 px-4 sm:px-8 md:px-10 pt-3 sm:pt-4 pb-0 bg-white dark:bg-[#0f172a] border-b border-gray-300 dark:border-slate-800 overflow-x-auto transition-colors duration-300 scrollbar-none">
            {tabs.map((elem, idx) => {
                return (
                    <button key={idx}
                        className={`${activeTab === elem
                            ? 'text-blue-700 dark:text-blue-400 border-blue-700 dark:border-blue-400 font-semibold'
                            : 'text-gray-600 dark:text-slate-400 border-transparent hover:text-slate-800 dark:hover:text-slate-200'
                        } border-b-2 transition-all duration-300 px-3 sm:px-5 pb-2.5 sm:pb-3 text-xs sm:text-sm uppercase cursor-pointer active:scale-95 transform translate-y-px whitespace-nowrap shrink-0`}
                        onClick={() => {
                            dispatch(setActiveTabs(elem))
                        }}
                    >
                        {elem}
                    </button>
                )
            })}
        </div>
    )
}

export default Tabs
