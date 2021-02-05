/** @format */
import thunk from 'redux-thunk'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import errorReducer from "../reducers/error";
import albumsReducer from "../reducers/albums";
import artistReducer from "../reducers/artistsReducer";
import likedReducer from "../reducers/liked";
import songsReducer from "../reducers/songs";


const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
    like: [],
    song: [],
    selectedSong: {},
    album:{},
    artists:[],
    selectedAlbum: {},
};

const bigReducer = combineReducers({ liked: likedReducer, song: songsReducer,selectedSong:songsReducer,album:albumsReducer,selectedAlbum:albumsReducer,artists:artistReducer,error:errorReducer})
export default function configureStore() {
    return createStore(bigReducer, initialState, composedEnhancer(applyMiddleware(thunk)))
}
