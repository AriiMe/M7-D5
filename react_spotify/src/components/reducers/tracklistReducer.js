export default function (state = [], action) {
    switch (action.type) {
        case "GET_TRACKLIST":
            return [...state, ...action.payload]
        default:
            return state;
    }
}