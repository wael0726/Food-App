import {combineReducers} from "redux";
import userReducer from "./userReducers";
import alertReducer from "./alertReducer";

const myReducers = combineReducers({
    user : userReducer,
    alert : alertReducer,
})

export default myReducers;
