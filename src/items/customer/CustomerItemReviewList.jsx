import Header from "../../common/Header";
import Footer from "../../common/Footer";
import {Col, Container, Row} from "reactstrap";
import {useEffect, useState} from "react";

const CustomerItemReviewList = (props) => {
  const [loaded, setLoaded] = useState(false);

  //variables

  //hooks

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }

    setLoaded(true);
  }, [])

  //onClicks

  //onSubmits

  //onChanges

  //requests

  return (<Container>
      <Header/>
      <Container>
        <Row xs={6} className={"text-center bg-secondary bg-opacity-25"}>
          <Col className={"border-end border-1 border-dark"}>작성일</Col>
          <Col className={"border-end border-1 border-dark"}>상품정보</Col>
          <Col className={"border-end border-1 border-dark"} xs={6}>내용</Col>
          <Col>작성자</Col>
        </Row>
        <Row xs={6} className={"text-center border-bottom border-dark"}>
          <Col className={"border-end border-1 border-dark"}><span>2024-04-12</span></Col>
          <Col className={"border-end border-1 border-dark"}>
            <div>
              <div>
                {/*"url('/images/star2.png') 0px 0px / 30px 30px no-repeat" background: getStarImage(idx, star), backgroundSize: "30px 30px",
                        width: "35px",
                        height: "35px",
                        border: "0px"*/}
                {/*<img src={"/images/star2.png"} style={{background: "url('/images/star2.png') 0px 0px / 40px 40px no-repeat", backgroundSize: "40px 40px", width: "40px", height: "40px", border: "0px"}}/>*/}
                <img src={"/images/star2.png"} style={{width: "60px", height: "60px", border: "0px"}} className={"mt-3 mb-3"}/>
              </div>
              <div><span>
                상품이름
              </span></div>
            </div>
          </Col>
          <Col className={"border-end border-1 border-dark"} xs={6}><span>
              글내용
            </span></Col>
          <Col><span>
            작성자
          </span></Col>
        </Row>
      </Container>
      <Footer/>
    </Container>)
}
export default CustomerItemReviewList