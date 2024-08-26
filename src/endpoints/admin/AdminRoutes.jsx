import {Redirect, Route} from "react-router-dom";
import HomeItemCarousel from "../../admin/item/home/carousel/HomeItemCarousel";
import HomeItemCarouselAdd from "../../admin/item/home/carousel/HomeItemCarouselAdd";
import HomeItemCarouselDetail from "../../admin/item/home/carousel/HomeItemCarouselDetail";
import AdminMain from "../../admin/AdminMain";
import CategoryManage from "../../admin/category/CategoryManage";
import SubcategoryManage from "../../admin/category/SubcategoryManage";
import ItemManage from "../../admin/item/ItemManage";
import ItemAdd from "../../admin/item/ItemAdd";
import ItemDetail from "../../admin/item/ItemDetail";
import ItemEdit from "../../admin/item/ItemEdit";

const AdminRoutes = (props) => {

  return (<>
    <Route path={"/admin"} exact component={AdminMain}/>
    <Route path={"/admin/home/items/carousel"} exact component={HomeItemCarousel}/>
    <Route path={"/admin/home/items/carousel/add"} exact component={HomeItemCarouselAdd}/>
    <Route path={"/admin/home/items/carousel/:carouselId"} exact component={HomeItemCarouselDetail}/>
    <Route path={"/admin/categories"} exact component={CategoryManage}/>
    <Route path={"/admin/subcategories"} exact component={SubcategoryManage}/>
    <Route path={"/admin/items"} exact component={ItemManage}/>
    <Route path={"/admin/items/add"} exact component={ItemAdd}/>
    <Route path={"/admin/items/:itemId"} exact component={ItemDetail}/>
    <Route path={"/admin/items/edit/:itemId"} exact component={ItemEdit}/>
  </>);

}

export default AdminRoutes;