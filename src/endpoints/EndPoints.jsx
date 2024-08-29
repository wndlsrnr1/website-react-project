import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomeMain from "../home/HomeMain";
import Login from "../login/Login";
import Join from "../login/Join";
import Logout from "../login/Logout";
import FindPassword from "../login/FindPassword";
import ItemRoutes from "./item/ItemRoutes";
import AdminRoutes from "./admin/AdminRoutes";

import AuthRoutes from "./auth/AuthRoutes";
import UserProfile from "../user/UserProfile";

const EndPoints = () => {


  return (
    <>
      <BrowserRouter>
        <Route path={"/"} exact component={HomeMain}/>
        <Route path={"/login"} exact component={Login}/>
        <Route path={"/join"} exact component={Join}/>
        <Route path={"/logout"} exact component={Logout}/>
        <Route path={"/user/find"} exact component={FindPassword}/>
        <Route path={"/user/profile"} component={UserProfile}/>
        <ItemRoutes/>
        <AuthRoutes/>

        <Switch>
          <AdminRoutes/>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default EndPoints;