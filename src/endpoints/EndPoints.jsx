import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomeMain from "../home/HomeMain";
import Login from "../login/Login";
import Join from "../login/Join";
import Logout from "../login/Logout";
import FindPassword from "../login/FindPassword";
import MyPage from "../user/MyPage";
import ItemRoutes from "./item/ItemRoutes";
import AdminRoutes from "./admin/AdminRoutes";

import {checkLogin} from "../utils/LoginUtils";
import {fetchWithAuth} from "../utils/fetchUtils";
import {useEffect, useState} from "react";

const EndPoints = () => {
  const [loaded, setLoaded] = useState(false);
  //variables
  const [isAdmin, setIsAdmin] = useState(false);
  const isLogin = checkLogin(localStorage);
  //hooks

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }
    setLoaded(true);
    if (!isLogin) {
      return;
    }

    const requestAdmin = async () => {
      fetchWithAuth("/users/admin", {
        method: "get"
      })
        .then(resp => {
          if (resp.status === 200) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        });
    };
    requestAdmin();
  }, [isAdmin, loaded]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} exact component={HomeMain}/>
        <Route path={"/login"} exact component={Login}/>
        <Route path={"/join"} exact component={Join}/>
        <Route path={"/logout"} exact component={Logout}/>
        <Route path={"/user/find"} exact component={FindPassword}/>
        <Route path={"/user/mypage"} component={MyPage}/>
        <ItemRoutes/>
        {isAdmin ? <AdminRoutes/> : null}
      </Switch>
    </BrowserRouter>
  )
}

export default EndPoints;