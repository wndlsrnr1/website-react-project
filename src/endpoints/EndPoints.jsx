import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomeMain from "../home/HomeMain";
import Login from "../login/Login";
import Join from "../login/Join";
import Logout from "../login/Logout";
import FindPassword from "../login/FindPassword";
import UserProfile from "../user/UserProfile";
import NotFoundPage from "../errors/NotFoundPage";
import PrivateRoute from "./util/ProtectedRoute";
import AdminMain from "../admin/AdminMain";
import HomeItemCarousel from "../admin/items/home/carousel/HomeItemCarousel";
import HomeItemCarouselAdd from "../admin/items/home/carousel/HomeItemCarouselAdd";
import HomeItemCarouselDetail from "../admin/items/home/carousel/HomeItemCarouselDetail";
import CategoryManage from "../admin/category/CategoryManage";
import SubcategoryManage from "../admin/category/SubcategoryManage";
import ItemManage from "../admin/items/ItemManage";
import ItemAdd from "../admin/items/ItemAdd";
import ItemDetail from "../admin/items/ItemDetail";
import ItemEdit from "../admin/items/ItemEdit";
import Items from "../items/customer/Items";
import OnDiscountItemList from "../items/customer/OnDiscountItemList";
import CustomerItemReviewList from "../items/customer/CustomerItemReviewList";
import ItemCustomerDetail from "../items/customer/ItemCustomerDetail";
import ItemList from "../items/itemList";
import KaKaoCallback from "../login/KaKaoCallback";
import CustomerComments from "../admin/answer/CustomerComments";
import CartCheckout from "../items/CartCheckout";

const EndPoints = () => {

  //상품명,

  return (
    <>
      <BrowserRouter>
        <Switch>
          {/*??*/}
          <Route path={"/"} exact component={HomeMain}/>
          <Route path={"/login"} exact component={Login}/>
          <Route path={"/join"} exact component={Join}/>
          <Route path={"/logout"} exact component={Logout}/>

          {/*users*/}
          <Route path={"/user/find"} exact component={FindPassword}/>
          <Route path={"/users/profile"} exact component={UserProfile}/>

          {/*items*/}
          <Route path={"/items"} exact component={Items}/>
          <Route path={"/items/on_discount"} exact component={OnDiscountItemList}/>
          <Route path={"/items/reviews"} exact component={CustomerItemReviewList}/>
          <Route path={"/items/detail/:itemId"} exact component={ItemCustomerDetail}/>
          <Route path={"/items/list"} exact component={ItemList}/>
          <Route path={"/cart/items/checkout/:itemId"} exact component={CartCheckout}/>

          {/*admin*/}
          <PrivateRoute path={"/admin"} exact component={AdminMain}/>
          <PrivateRoute path={"/admin/home/items/carousel"} exact component={HomeItemCarousel}/>
          <PrivateRoute path={"/admin/home/items/carousel/add"} exact component={HomeItemCarouselAdd}/>
          <PrivateRoute path={"/admin/home/items/carousel/:carouselId"} exact component={HomeItemCarouselDetail}/>
          <PrivateRoute path={"/admin/categories"} exact component={CategoryManage}/>
          <PrivateRoute path={"/admin/subcategories"} exact component={SubcategoryManage}/>
          <PrivateRoute path={"/admin/items"} exact component={ItemManage}/>
          <PrivateRoute path={"/admin/items/add"} exact component={ItemAdd}/>
          <PrivateRoute path={"/admin/items/:itemId"} exact component={ItemDetail}/>
          <PrivateRoute path={"/admin/items/edit/:itemId"} exact component={ItemEdit}/>
          <PrivateRoute path={"/admin/comments"} exact component={CustomerComments}/>

          {/*auth*/}
          <Route path={"/auth/user/:method/kakao"} exact component={KaKaoCallback}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default EndPoints;