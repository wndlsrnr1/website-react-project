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

export const checkLogin = (localStorageParam) => {
  const token = localStorageParam.getItem('token');
  return !!token;
}

export const login = (localStorageParam, tokenValue) => {
  localStorageParam.setItem("token", tokenValue);
}

export const logout = (localStorageParam) => {
  localStorageParam.removeItem('token');
}


export const getKakaoAuthUrl = (apiKey, redirectUrl) => {
  return `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${redirectUrl}&response_type=code`;
}