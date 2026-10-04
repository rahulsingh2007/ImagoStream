import { useDispatch } from "react-redux"
import { addCollection, addedToast, downloadToast } from "../redux/features/collectionSlice"
import { Bookmark, Download, Loader2 } from "lucide-react"
import { useState } from "react"
import { trackUnsplashDownload } from "../API/mediaApi"

const ResultCard = ({ item }) => {
    const dispatch = useDispatch()
    const [isDownloading, setIsDownloading] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const addToCollection = (e, item) => {
        e.stopPropagation();
        dispatch(addCollection(item))
        dispatch(addedToast())
    }
    const downloadFromCollection = (e) => {
        e.stopPropagation();
        dispatch(downloadToast())
    }

    const downloadMedia = async (e) => {
        e.stopPropagation();
        if (isDownloading) return;
        setIsDownloading(true);
        try {
            if (item.provider === "unsplash" && item.downloadLocation) {
                await trackUnsplashDownload(item.downloadLocation);
            }
            const executionUrl = item.downloadUrl || item.src;
            const response = await fetch(executionUrl);
            const blob = await response.blob();
            const localBlobUrl = window.URL.createObjectURL(blob);
            const hiddenLink = document.createElement("a");
            hiddenLink.href = localBlobUrl;

            const fileExtension = item.type === "video" ? "mp4" : item.type === "gif" ? "gif" : "jpg";
            hiddenLink.download = `${item.provider || "media"}-${item.id || "download"}.${fileExtension}`;
            document.body.appendChild(hiddenLink);
            hiddenLink.click();
            document.body.removeChild(hiddenLink);
            window.URL.revokeObjectURL(localBlobUrl);
        } catch (error) {
            console.error("Local file extraction failed:", error);
            window.open(item.downloadUrl || item.src, "_blank");
        } finally {
            setIsDownloading(false);
        }
    }

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full h-56 sm:h-60 rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform will-change-transform duration-200 shadow-sm shadow-black/20"
        >
            <div className="h-full w-full bg-slate-100 dark:bg-slate-900 isolation-auto">
                {item.type === 'photo' && (
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover object-center" />
                )}

                {item.type === 'video' && (
                    !isHovered ? (
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-full object-cover object-center"
                        />
                    ) : (
                        <video
                            key={item.src}
                            loop
                            muted
                            playsInline
                            autoPlay
                            preload="auto"
                            poster={item.thumbnail}
                            className="w-full h-full object-cover object-center transform-[translateZ(0)]"
                            src={item.src}
                        />
                    )
                )}

                {item.type === 'gif' && (
                    <img
                        src={isHovered ? item.src : item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover object-center"
                    />
                )}
            </div>

            <div className="absolute bottom-0 right-0 w-full p-1 flex justify-start items-center z-10 capitalize">
                <p className="text-xs text-black bg-white rounded px-1">{item.type}</p>
            </div>

            <div className="absolute top-0 left-0 w-full p-3 flex justify-end items-center z-10">
                <button
                    onClick={(e) => {
                        downloadMedia(e);
                        downloadFromCollection(e);
                    }}
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

            <div id="bottom" className="absolute bottom-0 left-0 w-full p-3 flex justify-end items-center bg-linear-to-t from-black/40 via-black/10 to-transparent z-10">
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
