import { useDispatch, useSelector } from "react-redux"
import CollectionCard from "../components/CollectionCard"
import EmptyCollectionState from "../components/EmptyCollectionState"
import { clearCollection, removeToast } from "../redux/features/collectionSlice"
import { Trash2 } from "lucide-react"

const CollectionPage = () => {
  const collection = useSelector(state => state.collection?.items || [])
  const dispatch = useDispatch()
  const clearAll = () => {
    dispatch(clearCollection())
    dispatch(removeToast())
  }

  return (
    <div className="overflow-auto px-4 sm:px-8 md:px-10 pb-12 bg-indigo-50/50 dark:bg-[#0b0f19] flex-1 transition-colors duration-300">
      {collection.length > 0 ? (
        <>
          <div className="flex justify-between items-center py-5 sm:py-6 gap-3 max-w-7xl mx-auto border-b border-indigo-100/80 dark:border-slate-800/80 mb-6">
            <div className="flex items-center gap-2.5">
              <h2 className="font-bold text-xl sm:text-2xl text-slate-800 dark:text-slate-100">
                Your Collection
              </h2>
              <span className="text-xs sm:text-sm font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                {collection.length} {collection.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 px-3.5 sm:px-4 py-1.5 sm:py-2 font-semibold text-xs sm:text-sm cursor-pointer text-white active:scale-95 transition-all duration-200 rounded-xl shadow-xs whitespace-nowrap"
            >
              <Trash2 size={16} />
              <span>Clear Collection</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-4 sm:gap-6 content-start max-w-7xl mx-auto">
            {collection.map((item, idx) => (
              <div key={item.id || idx} className="w-full flex justify-center">
                <CollectionCard item={item} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <EmptyCollectionState />
      )}
    </div>
  )
}

export default CollectionPage