import axios from 'axios'

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY
const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY
const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_KEY

const PER_PAGE = 20

export async function fetchPhotos(query, page = 1) {
    const res = await axios.get('https://api.unsplash.com/search/photos', {
        params: { query, page, per_page: PER_PAGE },
        headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
    })
    return res.data 
}

export async function fetchVideos(query, page = 1) {
    const res = await axios.get('https://pixabay.com/api/videos/', {
        params: { key: PIXABAY_KEY, q: query, per_page: PER_PAGE, page }
    });
    return res.data;
}

export async function fetchGIF(query, page = 1) {
    const offset = (page - 1) * PER_PAGE
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: { api_key: GIPHY_KEY, q: query, limit: PER_PAGE, offset }
    });
    return res.data; 
}

export async function trackUnsplashDownload(downloadLocationUrl) {
    try {
        await axios.get(downloadLocationUrl, {
            headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
        });
    } catch (err) {
        console.error("Failed to track Unsplash download metric:", err);
    }
}

