import { useDispatch } from "react-redux"
import { addCollection, addedToast } from "../redux/features/collectionSlice"
import { Bookmark } from "lucide-react"

const ResultCard = ({ item }) => {
    const dispatch = useDispatch()

    const addToCollection = (e, item) => {
        e.stopPropagation();
        dispatch(addCollection(item))
        dispatch(addedToast())
    }

    return (
        <div className="relative w-full h-56 sm:h-60 rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-sm shadow-black/20">
            <div className="h-full w-full">
                {item.type === 'photo' && (
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover object-center" />
                )}
                {item.type === 'video' && (
                    <video
                        loop
                        muted
                        playsInline
                        autoPlay
                        preload="none"
                        poster={item.thumbnail}
                        className="w-full h-full object-cover object-center"
                        src={item.src}
                    />
                )}
                {item.type === 'gif' && (
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover object-center" />
                )}
            </div>
            <div id="bottom" className="absolute bottom-0 left-0 w-full p-3 flex justify-end items-center bg-linear-to-t from-black/40 via-black/10 to-transparent">
                <button
                    onClick={(e) => addToCollection(e, item)}
                    className="bg-white/90 dark:bg-slate-800/90 text-black dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700 rounded-full p-2 cursor-pointer transition-transform active:scale-90 shadow-md shadow-black/20 flex items-center justify-center border border-transparent dark:border-white/10"
                    title="Save to collection"
                >
                    <Bookmark size={18} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    )
}

export default ResultCard
