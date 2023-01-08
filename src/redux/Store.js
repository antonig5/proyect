import { createStore, combineReducers, compose } from "redux";
import reduxLocal from "redux-localstorage";

function user(state = {}, action) {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    case "CLEAR_USER":
      return {};

    default:
      return state;
  }
}

let rootReducer = combineReducers({
  user: user,
});

let mainEnhacer = compose(reduxLocal());

export default createStore(rootReducer, {}, mainEnhacer);
