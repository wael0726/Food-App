import {combineReducers} from "redux";
import userReducer from "./userReducers";
import alertReducer from "./alertReducer";
import productReducer from "./productReducer";
import allUserReducer from "./allUserReducers";
import cartReducer from "./cartReducer";

const myReducers = combineReducers({
    user : userReducer,
    alert : alertReducer,
    products: productReducer,
    allUsers: allUserReducer,
    cart: cartReducer,
})

export default myReducers;
