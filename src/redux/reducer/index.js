import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { authTokenReducer } from './authTokenReducer'
import { dashboardReducer } from "./dashboardReducer";
import { taskReducer } from "./taskReducer";

const rootReducer = combineReducers({
    userReducer, authTokenReducer, dashboardReducer, taskReducer
})

export default rootReducer