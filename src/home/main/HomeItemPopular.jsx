import {Container, Row} from "reactstrap";

const HomeItemPopular = () => {
  return (
    <Container>
      <h4>인기 제품</h4>
      <Row xs={5} >
        <div className={"d-flex flex-column align-items-center border pt-3 pb-3"}>
          <img src={"/attachment/175"} style={{height: "200px"}}/>
          <div><span>이름</span></div>
          <div><span>가격</span></div>
          <div><span>출시일</span></div>
        </div>
        <div className={"d-flex flex-column align-items-center border pt-3 pb-3"}>
          <img src={"/attachment/175"} style={{height: "200px"}}/>
          <div><span>이름</span></div>
          <div><span>가격</span></div>
          <div><span>출시일</span></div>
        </div>
        <div className={"d-flex flex-column align-items-center border pt-3 pb-3"}>
          <img src={"/attachment/175"} style={{height: "200px"}}/>
          <div><span>이름</span></div>
          <div><span>가격</span></div>
          <div><span>출시일</span></div>
        </div>
        <div className={"d-flex flex-column align-items-center border pt-3 pb-3"}>
          <img src={"/attachment/175"} style={{height: "200px"}}/>
          <div><span>이름</span></div>
          <div><span>가격</span></div>
          <div><span>출시일</span></div>
        </div>
        <div className={"d-flex flex-column align-items-center border pt-3 pb-3"}>
          <img src={"/attachment/175"} style={{height: "200px"}}/>
          <div><span>이름</span></div>
          <div><span>가격</span></div>
          <div><span>출시일</span></div>
        </div>
      </Row>
    </Container>
  )
}

export default HomeItemPopular;