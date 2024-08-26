import './App.css';
import HomeMain from "./home/HomeMain";
import Login from "./login/Login";
import Join from "./login/Join";
import FindPassword from "./login/FindPassword";
import {createContext, useContext, useEffect, useReducer, useState} from "react";
import data from "bootstrap/js/src/dom/data";
import Logout from "./login/Logout";
import MyPage from "./user/MyPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {fetchWithAuth} from "./utils/fetchUtils";
import AdminRoutes from "./routes/admin/AdminRoutes";
import ItemRoutes from "./routes/item/ItemRoutes";
import ItemList from "./items/itemList";
import ItemCustomerDetail from "./items/customer/ItemCustomerDetail";
import Items from "./items/customer/Items";
import OnDiscountItemList from "./items/customer/OnDiscountItemList";
import {checkLogin} from "./utils/LoginUtils";

const App = () => {
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
    <>
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
    </>

  );
}

export default App;
