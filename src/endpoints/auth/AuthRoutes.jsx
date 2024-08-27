import {Route} from "react-router-dom";
import KaKaoCallback from "../../login/KaKaoCallback";

const AuthRoutes = () => {
  return <>
    <Route path={"/auth/user/:method/kakao"} exact component={KaKaoCallback}/>
  </>
}

export default AuthRoutes;