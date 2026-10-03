import { useDispatch } from "react-redux"
import { removeCollection, removeToast } from "../redux/features/collectionSlice"
import { Trash } from "lucide-react"

const CollectionCard = ({ item }) => {
    const dispatch = useDispatch()
    
    const removeFromCollection = (e, item) => {
        e.stopPropagation(); 
        dispatch(removeCollection(item))
        dispatch(removeToast())
    }

    return (
        <div className="relative w-full h-48 sm:h-56 md:h-60 rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-300 shadow-sm shadow-black/20">
            <div className="h-full w-full">
                {item.type === 'photo' && (
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover object-center" />
                )}
                {item.type === 'video' && (
                    <video autoPlay loop muted className="w-full h-full object-cover object-center" src={item.src} />
                )}
                {item.type === 'gif' && (
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover object-center" />
                )}
            </div>
            <div id="bottom" className="absolute bottom-0 left-0 w-full p-3 flex justify-end items-center bg-linear-to-t from-black/40 via-black/10 to-transparent">
                <button
                    onClick={(e) => removeFromCollection(e, item)}
                    className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full cursor-pointer transition-transform active:scale-90 shadow-md shadow-black/30 flex items-center justify-center"
                    title="Remove from collection"
                >
                    <Trash size={18} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    )
}

export default CollectionCard
