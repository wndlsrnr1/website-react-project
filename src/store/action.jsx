export const loginConst = {
  login: "login",
  logout: "logout",
  loginKeep: "loginKeep",
  loginExpired: "loginExpired",
}


export const login = () => {
  return {type: loginConst.login};
}

export const logout = () => {
  return {type: loginConst.logout};
}

export const loginKeep = () => {
  return {type: loginConst.loginKeep};
}

export const loginExpired = () => {
  return {type: loginConst.loginExpired}
}