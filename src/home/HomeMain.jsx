import Categories from "../common/Categories";
import Footer from "../common/Footer";
import Header from "../common/Header";
import WingMenu from "../common/WingMenu";
import HomeCarousel from "./HomeCarousel";
import HomeItem from "./HomeItem";
import {Button, ButtonGroup, Container, Modal, ModalBody, ModalFooter} from "reactstrap";
import {useState} from "react";

const HomeMain = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Container>
        <div className={"d-inline-block"}>
            <div className={"d-inline-block me-3"}><p>[관리자 페이지]</p></div>
            <div className={"d-inline-block me-3"}><p>/admin</p></div>
            <div className={"d-inline-block me-3"}><p>[관리자 계정]</p></div>
            <div className={"d-inline-block me-3"}><p>admin@admin.com</p></div>
            <div className={"d-inline-block me-3"}><p>12#$qwER</p></div>
            <div className={"d-inline-block me-3"}><p>[사용자 계정]</p></div>
            <div className={"d-inline-block me-3"}><p>user@naver.com</p></div>
            <div className={"d-inline-block me-3"}><p>12#$qwER</p></div>
            <div className={"d-inline-block me-3"}><p>[기본 관리자계정, 사용자 계정 삭제 안됩니다.]</p></div>
        </div>
        <Header/>
        <Categories/>
        <div>
          <HomeCarousel/>
        </div>
        {/*<WingMenu/>*/}
        <HomeItem/>

        <Footer/>
      </Container>
    </>
  )
}

export default HomeMain;