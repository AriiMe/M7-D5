import {initialState} from "../store/index";

export default function (state = initialState, action) {
    switch (action.type) {
        case "GET_ARTISTS":
            return {
                    ...state,
                    artists: [...state.artists,action.payload],
            }
        default:
            return state;
    }
}