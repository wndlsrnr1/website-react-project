export const checkLogin = (localStorageParam) => {
  const token = localStorageParam.getItem('token');
  return !!token;
}

export const login = (localStorageParam, tokenValue) => {
  localStorageParam.setItem("token", tokenValue);
}

export const logout = (localStorageParam) => {
  console.log(localStorageParam);
  localStorageParam.removeItem('token');
}