import {combineReducers} from "redux";
import userReducer from "./userReducers";
import alertReducer from "./alertReducer";
import productReducer from "./productReducer";
import allUserReducer from "./allUserReducers";

const myReducers = combineReducers({
    user : userReducer,
    alert : alertReducer,
    products: productReducer,
    allUsers: allUserReducer,
})

export default myReducers;
