import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { authTokenReducer } from './authTokenReducer'
import { dashboardReducer } from "./dashboardReducer";

const rootReducer = combineReducers({
    userReducer, authTokenReducer, dashboardReducer
})

export default rootReducer