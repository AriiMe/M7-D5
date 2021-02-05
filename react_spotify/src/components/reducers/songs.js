import {initialState} from "../store/index";

export default function (state = {}, action) {
    switch (action.type) {
        case "SELECT_ONE_SONG":
            return {
                ...state,
                selectedSong: action.payload,
            }
        case "POPULATE_SONG_LIST":
            return {
                ...state,
                songList: action.payload,
            }

        default:
            return state;

    }
}