import {initialState} from "../store/index";

export default function (state = initialState, action) {
    switch (action.type) {
        case "ADD_TO_LIKED":
            return {
                ...state,
                like: state.like.concat(action.payload),
            };
        case "REMOVE_FROM_LIKED":
            return {
                ...state,
                like: state.like.filter((song) => song.id !== action.payload),
            };
        default:
            return state;

    }
}