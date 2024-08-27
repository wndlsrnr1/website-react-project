import {Route} from "react-router-dom";
import KaKaoRegister from "../../login/KaKaoLogin";
import KaKaoCallback from "../../login/KaKaoCallback";

const AuthRoutes = () => {
  return <>
    <Route path={"/kakaoLogin"} component={KaKaoRegister}/>
    <Route path={"/auth/user/kakao"} component={KaKaoCallback}/>
  </>
}

export default AuthRoutes;