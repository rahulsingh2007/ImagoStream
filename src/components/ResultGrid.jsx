import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, fetchVideos, fetchGIF } from "../API/mediaApi";
import { setLoading, setError, setResults, setHasMore } from "../redux/features/searchSlice";
import { useEffect, useCallback } from "react";
import ResultCard from "./ResultCard";
import EmptySearchState from "./EmptySearchState";
import NoResultsState from "./NoResultsState";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorState from "./ErrorState";
import Pagination from "./Pagination";

const PER_PAGE = 20;

const ResultGrid = () => {
    const dispatch = useDispatch();
    const { query, activeTab, results, loading, error, page } = useSelector((store) => store.search);

    const getData = useCallback(async () => {
        if (!query) return;

        try {
            dispatch(setLoading());
            let data = [];
            let more = false;

            if (activeTab === "photos") {
                const response = await fetchPhotos(query, page);
                data = (response?.results || []).slice(0, PER_PAGE).map((item) => ({
                    id: item.id,
                    type: "photo",
                    title: item.alt_description || "Untitled Photo",
                    thumbnail: item.urls?.small,
                    src: item.urls?.small,
                }));
                more = page < (response?.total_pages || 1);

            } else if (activeTab === "videos") {
                const response = await fetchVideos(query, page);
                data = (response?.hits || []).slice(0, PER_PAGE).map((item) => ({
                    id: item.id,
                    type: "video",
                    title: item.name
                        ? item.name.split(",")[0].trim()
                        : "Untitled Video",
                    thumbnail: item.videos?.small?.thumbnail,
                    src: item.videos?.medium?.url,
                }));
                const totalPages = Math.ceil((response?.totalHits || 0) / PER_PAGE);
                more = page < totalPages;

            } else {
                const response = await fetchGIF(query, page);
                data = (response?.data || []).slice(0, PER_PAGE).map((item) => ({
                    id: item.id,
                    type: "gif",
                    title: item.title || "Untitled GIF",
                    thumbnail: item.images?.fixed_width_small?.url,
                    src: item.images?.fixed_width?.url,
                }));
                const pagination = response?.pagination;
                const totalLoaded = (pagination?.offset || 0) + (pagination?.count || 0);
                more = totalLoaded < (pagination?.total_count || 0);
            }

            dispatch(setResults(data));
            dispatch(setHasMore(more));
        } catch (err) {
            dispatch(setError(err.message));
        }
    }, [query, activeTab, page, dispatch]);

    useEffect(() => {
        getData();
        // Scroll to top of results on page change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [getData]);

    return (
        <div className="w-full px-4 sm:px-8 md:px-10 py-6 pb-4 bg-white dark:bg-[#0b0f19] min-h-[45vh] transition-colors duration-300 flex flex-col">
            <div className="flex-1">
                {loading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <ErrorState message={error} onRetry={getData} />
                ) : !query ? (
                    <EmptySearchState />
                ) : results && results.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 w-full max-w-7xl mx-auto">
                        {results.map((item, idx) => (
                            <div key={item.id || idx} className="w-full flex justify-center">
                                <ResultCard item={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <NoResultsState />
                )}
            </div>

            {/* Pagination — only show when there are results or navigating pages */}
            {query && !loading && !error && results && results.length > 0 && (
                <Pagination />
            )}
        </div>
    );
};

export default ResultGrid;
