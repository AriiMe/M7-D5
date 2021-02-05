import {initialState} from "../store/index";

export default function (state = {}, action) {
    switch (action.type) {
        case "SELECT_SINGLE_ARTIST":
            return {
                ...state, ...action.payload
            }

        default:
            return state;

    }
}