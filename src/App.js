import './App.css';
import HomeMain from "./home/HomeMain";
import Login from "./login/Login";
import Join from "./login/Join";
import FindPassword from "./login/FindPassword";
import {createContext, useContext, useEffect, useReducer, useState} from "react";
import data from "bootstrap/js/src/dom/data";
import Logout from "./login/Logout";
import MyPage from "./user/MyPage";
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
import HomeItemCarouselDetail from "./admin/item/home/carousel/HomeItemCarouselDetail";
import ItemList from "./items/itemList";
import ItemCustomerDetail from "./items/customer/ItemCustomerDetail";
import OnDiscountItemList from "./items/customer/OnDiscountItemList";
import Items from "./items/customer/Items";
import {fetchWithAuth} from "./utils/fetchUtils";

const App = () => {
  const [loaded, setLoaded] = useState(false);

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
        <Route path={"/admin/home/items/carousel/:carouselId"} exact component={HomeItemCarouselDetail}/>


        <Route path={"/admin"} exact component={AdminMain}/>
        <Route path={"/admin/categories"} exact component={CategoryManage}/>
        <Route path={"/admin/subcategories"} exact component={SubcategoryManage}/>

        <Route path={"/admin/items"} exact component={ItemManage}/>
        <Route path={"/admin/items/add"} exact component={ItemAdd}/>
        <Route path={"/admin/items/:itemId"} exact component={ItemDetail}/>
        <Route path={"/admin/items/edit/:itemId"} exact component={ItemEdit}/>

        <Route path={"/item_list"} exact component={ItemList}/>
        <Route path={"/item/detail/:itemId"} exact component={ItemCustomerDetail}/>

        <Route path={"/items"} exact component={Items}/>
        <Route path={"/items/on_discount"} exact component={OnDiscountItemList}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
