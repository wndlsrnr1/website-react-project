import {Route} from "react-router-dom";
import ItemList from "../../items/itemList";
import ItemCustomerDetail from "../../items/customer/ItemCustomerDetail";
import Items from "../../items/customer/Items";
import OnDiscountItemList from "../../items/customer/OnDiscountItemList";
import CustomerItemReviewList from "../../items/customer/CustomerItemReviewList";

const ItemRoutes = (props) => {

  return (<>
    <Route path={"/item_list"} exact component={ItemList}/>
    <Route path={"/item/detail/:itemId"} exact component={ItemCustomerDetail}/>
    <Route path={"/items"} exact component={Items}/>
    <Route path={"/items/on_discount"} exact component={OnDiscountItemList}/>
    <Route path={"/items/reviews"} exact component={CustomerItemReviewList}/>
  </>)
}

export default ItemRoutes;