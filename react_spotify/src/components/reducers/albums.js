import {initialState} from "../store/index";

export default function (state = {}, action) {
    switch (action.type) {
        case "GET_ALBUM":
            return {
                    ...state,
                    album: action.payload,
            }
        case "SELECTED_ALBUM":
            return {
                ...state,
                selectedAlbum: action.playload,
            }

        default:
            return state;

    }
}