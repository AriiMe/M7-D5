/** @format */
import { createStore } from "redux/store";
import rootReducer from "../reducers";

const initialState = {
    like: [],
    song: [],
    selected: {},

};

export default function configureStore() {
    return createStore(
        rootReducer,
        initialState,
        window._REDUX_DEVTOOLS_EXTENSIONS && window._REDUX_DEVTOOLS_EXTENSIONS
    );
}
