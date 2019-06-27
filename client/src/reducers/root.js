import { combineReducers } from "redux";
import errorsReducer from "./errors";
import authReducer from "./auth";

const rootReducer = combineReducers({
  errorsReducer,
  authReducer
});

export default rootReducer;
