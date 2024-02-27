import './App.css';
import HomeMain from "./home/HomeMain";
import Login from "./login/Login";
import Join from "./login/Join";
import FindPassword from "./login/FindPassword";
import {createContext, useContext, useEffect, useReducer, useState} from "react";
import data from "bootstrap/js/src/dom/data";
import Logout from "./login/Logout";
import MyPage from "./user/MyPage";
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "./store/action";
import AdminMain from "./admin/AdminMain";
import CategoryManage from "./admin/category/CategoryManage";
import SubcategoryManage from "./admin/category/SubcategoryManage";
import ItemManage from "./admin/item/ItemManage";
import ItemDetail from "./admin/item/ItemDetail";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ItemAdd from "./admin/item/ItemAdd";
import ItemEdit from "./admin/item/ItemEdit";
import HomeItemCarousel from "./admin/item/home/carousel/HomeItemCarousel"
import HomeItemCarouselAdd from "./admin/item/home/carousel/HomeItemCarouselAdd";

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);


  // 최상위 트리에서 로그인 검증
  useEffect(() => {
    fetch("/login/auth")
      .then(
        (resp) => {
          if (resp.status !== 200) {
            return {login: false};
          }
          return resp.json();
        })
      .then(
        (data) => {
          const check = data.data.login;
          console.log("check", check);
          if (check === true) {
            dispatch(login());
          } else {
            dispatch(logout());
          }
        }
      );
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} exact component={HomeMain}/>
        <Route path={"/login"} exact component={Login}/>
        <Route path={"/join"} exact component={Join}/>
        <Route path={"/user/find"} exact component={FindPassword}/>
        <Route path={"/logout"} exact component={Logout}/>
        <Route path={"/user/mypage"} component={MyPage}/>

        <Route path={"/admin/home/items/carousel"} exact component={HomeItemCarousel}/>
        <Route path={"/admin/home/items/carousel/add"} exact component={HomeItemCarouselAdd}/>

        <Route path={"/admin"} exact component={AdminMain}/>
        <Route path={"/admin/categories"} exact component={CategoryManage}/>
        <Route path={"/admin/subcategories"} exact component={SubcategoryManage}/>

        <Route path={"/admin/items"} exact component={ItemManage}/>
        <Route path={"/admin/items/add"} exact component={ItemAdd}/>
        <Route path={"/admin/items/:itemId"} exact component={ItemDetail}/>
        <Route path={"/admin/items/edit/:itemId"} exact component={ItemEdit}/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
