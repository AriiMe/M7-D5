export default function (state = {}, action) {
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
        case "SELECT_ONE_SONG":
            return {
                ...state,
                selected: action.payload,
            }
        case "POPULATE_SONG_LIST":
            return {
                ...state,
                songList: action.payload,
            }
        case "SET_ERROR_CODE":
            return {
                ...state,
                errCode: action.payload,
            };
        case "SET_ERROR_MESSAGE":
            return {
                ...state,
                errMessage: action.payload,
            };
        case "TOGGLE_ERROR":
            return {
                ...state,
                show: action.payload,
            };

        default:
            return state;

    }
}