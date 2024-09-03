export const API_KEY = "b678b03b04bcdee81052dad6e436c06c";
// export const REGISTER_REDIRECT_URI = "http://localhost:3000/auth/user/register/kakao";
export const LOGIN_REDIRECT_URI = "http://localhost:3000/auth/user/login/kakao";
export const DELETE_REDIRECT_URI = "http://localhost:3000/auth/user/delete/kakao";
export const LOGOUT_REDIRECT_URI = "http://localhost:3000/auth/user/logout/kakao";

export const handleLogin = () => {
  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${LOGIN_REDIRECT_URI}&response_type=code`;
}

// export const handleRegister = () => {
//   window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REGISTER_REDIRECT_URI}&response_type=code`;
// }

export const handleLogout = () => {
  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${LOGOUT_REDIRECT_URI}&response_type=code`;
}

export const handleDelete = () => {
  window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${DELETE_REDIRECT_URI}&response_type=code`;
}

export const checkLogin = (sessionStorageParam) => {
  const token = sessionStorageParam.getItem('token');
  return !!token;
}

export const login = (sessionStorageParam, tokenValue, socialType) => {
  sessionStorageParam.setItem("token", tokenValue);
  sessionStorageParam.setItem("socialType", socialType);
}

export const logout = (sessionStorageParam) => {
  sessionStorageParam.removeItem('token');
  sessionStorageParam.removeItem("socialType");
}

export const getLoginType = (sessionStorageParam) => {
  return sessionStorageParam.getItem("socialType");
}

export const getKakaoAuthUrl = (apiKey, redirectUrl) => {
  return `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${redirectUrl}&response_type=code`;
}

export const SOCIAL_TYPE = {
  "KAKAO": "KAKAO",
  "NONE": "NONE"
};