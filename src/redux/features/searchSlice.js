import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'Search',
    initialState: {
        query: '',
        activeTab: 'photos',
        results: [],
        loading: false,
        error: null,
        page: 1,
        hasMore: true,
    },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
            state.page = 1;
            state.hasMore = true;
        },
        setActiveTabs(state, action) {
            state.activeTab = action.payload;
            state.page = 1;
            state.hasMore = true;
        },
        setResults(state, action) {
            state.results = action.payload;
            state.loading = false;
        },
        setLoading(state) {
            state.loading = true;
            state.error = null;
        },
        setError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        clearResults(state) {
            state.results = [];
        },
        setPage(state, action) {
            state.page = action.payload;
        },
        setHasMore(state, action) {
            state.hasMore = action.payload;
        },
    }
});

export const { setQuery, setActiveTabs, setResults, setLoading, setError, clearResults, setPage, setHasMore } = searchSlice.actions;
export default searchSlice.reducer;