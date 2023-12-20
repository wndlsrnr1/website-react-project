import {loginConst} from "./action";

const initialState = {
  isLoggedIn: false,
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginConst.login:
      return {...state, isLoggedIn: true};
    case loginConst.logout:
      return {...state, isLoggedIn: false};
    case loginConst.loginKeep:
      return {...state, isLoggedIn: true};
    case loginConst.loginExpired:
      return {...state, isLoggedIn: false};
    default:
      return {...state};
  }
}