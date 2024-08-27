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

export const API_KEY = "b678b03b04bcdee81052dad6e436c06c";
export const REGISTER_REDIRECT_URI = "http://localhost:3000/auth/user/kakao?method=register";
export const LOGIN_REDIRECT_URI = "http://localhost:3000/auth/user/kakao?method=login";
export const DELETE_REDIRECT_URI = "http://localhost:3000/auth/user/kakao?method=delete";
export const LOGOUT_REDIRECT_URI = "http://localhost:3000/auth/user/kakao?method=logout";
export const getKakaoAuthUrl = (apiKey, redirectUrl) => {
  return `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${redirectUrl}&response_type=code`;
}