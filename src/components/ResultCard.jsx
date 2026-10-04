import { useDispatch } from "react-redux"
import { addCollection, addedToast } from "../redux/features/collectionSlice"
import { Bookmark, Download, Loader2 } from "lucide-react"
import { useState } from "react"
import { trackUnsplashDownload } from "../API/mediaApi"

const ResultCard = ({ item }) => {
    const dispatch = useDispatch()
    const [isDownloading, setIsDownloading] = useState(false)

    const addToCollection = (e, item) => {
        e.stopPropagation();
        dispatch(addCollection(item))
        dispatch(addedToast())
    }
    const downloadMedia = async (e) => {
        e.stopPropagation(); // Stops any card click behaviors
        if (isDownloading) return;
        setIsDownloading(true);
        try {
            // 1. Unsplash requirement: hit their download tracking URL
            if (item.provider === "unsplash" && item.downloadLocation) {
                await trackUnsplashDownload(item.downloadLocation);
            }
            // Target the highest quality asset URL available
            const executionUrl = item.downloadUrl || item.src;
            // 2. Stream the asset data as binary Blob to bypass raw browser tabs
            const response = await fetch(executionUrl);
            const blob = await response.blob();
            // 3. Form a clean local document target link
            const localBlobUrl = window.URL.createObjectURL(blob);
            const hiddenLink = document.createElement("a");
            hiddenLink.href = localBlobUrl;
            // Generate file extension cleanly
            const fileExtension = item.type === "video" ? "mp4" : item.type === "gif" ? "gif" : "jpg";
            hiddenLink.download = `${item.provider || "media"}-${item.id || "download"}.${fileExtension}`;
            document.body.appendChild(hiddenLink);
            hiddenLink.click();
            // Cleanup references
            document.body.removeChild(hiddenLink);
            window.URL.revokeObjectURL(localBlobUrl);
        } catch (error) {
            console.error("Local file extraction failed:", error);
            // Fallback safe measure: Open source file directly if network streams fail
            window.open(item.downloadUrl || item.src, "_blank");
        } finally {
            setIsDownloading(false);
        }
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
            <div className="absolute top-0 left-0 w-full p-3 flex justify-end items-center">
                <button
                    onClick={downloadMedia}
                    disabled={isDownloading}
                    className="bg-white/90 dark:bg-slate-800/90 text-black dark:text-slate-100 hover:bg-white dark:hover:bg-slate-700 rounded-full p-2 cursor-pointer transition-transform active:scale-90 shadow-md shadow-black/20 flex items-center justify-center border border-transparent dark:border-white/10 disabled:opacity-50"
                    title={isDownloading ? "Downloading..." : "Download file"}
                >
                    {isDownloading ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <Download size={18} strokeWidth={2.5} />
                    )}
                </button>
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
