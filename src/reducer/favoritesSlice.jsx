import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        loadFavorites: (state) => {
            state.items = JSON.parse(localStorage.getItem("favorites")) || [];
        },
        addToFavorites: (state, action) => {
            if (!state.items.find((item) => item.id === action.payload.id)) {
                state.items.push(action.payload);
                localStorage.setItem("favorites", JSON.stringify(state.items));
            }
        },
        removeFromFavorites: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            localStorage.setItem("favorites", JSON.stringify(state.items));
        },
        clearFavorites: (state) => {
            state.items = [];
            localStorage.removeItem("favorites");
        },
    },
});

export const { loadFavorites, addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
