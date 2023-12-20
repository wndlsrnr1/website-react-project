import {createStore} from "redux";
import {loginReducer} from "./reducer";

const saveState = (state) => {
  let stateJSON = JSON.stringify(state);
  sessionStorage.setItem("user", stateJSON);
}

const loadState = () => {
  const userLoginJSON = sessionStorage.getItem("user");
  if (userLoginJSON === null) {
    return undefined;
  }
  return JSON.parse(userLoginJSON);
}


const store = createStore(loginReducer, loadState());

store.subscribe(() => {
  saveState(store.getState());
});

export default store;