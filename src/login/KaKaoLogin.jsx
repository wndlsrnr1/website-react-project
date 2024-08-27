import {Button} from "reactstrap";
import {
  API_KEY, DELETE_REDIRECT_URI,
  getKakaoAuthUrl, LOGIN_REDIRECT_URI, LOGOUT_REDIRECT_URI, REGISTER_REDIRECT_URI,
} from "../utils/LoginUtils";

const KaKaoRegister = () => {
  const handleRegister = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REGISTER_REDIRECT_URI}&response_type=code`;
  }

  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${LOGIN_REDIRECT_URI}&response_type=code`;
  }

  const handleLogout = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${DELETE_REDIRECT_URI}&response_type=code`;
  }

  const handleDelete = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${LOGOUT_REDIRECT_URI}&response_type=code`;
  }

  return (
    <div>
      <Button onClick={handleRegister}>Join Kakao</Button>
      <Button onClick={handleLogin}>Join Kakao</Button>
      <Button onClick={handleLogout}>Join Kakao</Button>
      <Button onClick={handleDelete}>Join Kakao</Button>
    </div>
  )
}
export default KaKaoRegister;