import HomeItemDiscount from "./main/HomeItemDiscount";
import HomeItemRecent from "./main/HomeItemRecent";
import HomeItemPopular from "./main/HomeItemPopular";

const HomeItem = () => {
  return (
    <div className={"pt-4"}>
      <HomeItemPopular/>
      <hr/>
      <HomeItemRecent/>
      <hr/>
      <HomeItemDiscount/>
    </div>
  )
}

export default HomeItem;