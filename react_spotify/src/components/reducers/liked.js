import { initialState } from "../store/index";

export default function (state = [], action) {
    switch (action.type) {
        case "ADD_TO_LIKED":
            return [...state, action.payload]
        case "REMOVE_FROM_LIKED":
            return state.like.filter((artist) => artist.id !== action.payload)
        default:
            return state;

    }
}