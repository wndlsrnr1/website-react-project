import Categories from "../common/Categories";
import Footer from "../common/Footer";
import Header from "../common/Header";
import WingMenu from "../common/WingMenu";
import HomeCarousel from "./HomeCarousel";
import HomeItem from "./HomeItem";

const HomeMain = () => {

  return (
    <>
      <Header/>

      <Categories/>
      <WingMenu/>

      <HomeCarousel/>
      <HomeItem/>

      <Footer/>
    </>
  )
}

export default HomeMain;