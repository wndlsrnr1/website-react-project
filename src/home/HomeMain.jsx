import Categories from "../common/Categories";
import Footer from "../common/Footer";
import Header from "../common/Header";
import WingMenu from "../common/WingMenu";
import HomeCarousel from "./HomeCarousel";
import HomeItem from "./HomeItem";
import {Container} from "reactstrap";

const HomeMain = () => {

  return (
    <>
      <Container>
        <Header/>
        <Categories/>
        <div>
          <HomeCarousel/>
        </div>
        <WingMenu/>
        <HomeItem/>

        <Footer/>
      </Container>
    </>
  )
}

export default HomeMain;