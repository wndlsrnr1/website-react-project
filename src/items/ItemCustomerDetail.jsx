import Header from "../common/Header";
import Categories from "../common/Categories";
import {Button, ButtonGroup, Col, Container, Row} from "reactstrap";

const ItemCustomerDetail = () => {

  return (
    <>
      <Header/>
      <Categories/>
      <Container>
        <div><h4 className={"text-center"}>상품상세</h4></div>
        <hr/>
        <div>
          <img src={"/attachment/123"}/>
        </div>
        <div>
          <div>상품이름</div>
          <div>가격 및 할인 가격</div>
          <hr/>
          <div>
            <Row>
              <Col>제조사</Col>
              <Col>일본</Col>
            </Row>
            <Row>
              <Col>원산지</Col>
              <Col>중국</Col>
            </Row>
            <Row>
              <Col>배송정보</Col>
              <Col></Col>
            </Row>
          </div>
          <hr/>
          <div>
            <div>공유하기</div>
            <div>찜하기</div>
          </div>
          <hr/>
          <ButtonGroup>
            <Button active={true}>상세정보</Button>
            <Button>기본정보</Button>
            <Button>상품후기</Button>
            <Button>상품문의</Button>
          </ButtonGroup>
        </div>
        <div className={"content"}>
          <div>
            <img src={"/attachment/123"}/>
          </div>
          <div>
            <img src={"/attachment/123"}/>
          </div>
          <div>
            <img src={"/attachment/123"}/>
          </div>
          <div>
            <img src={"/attachment/123"}/>
          </div>
          <div>
            <img src={"/attachment/123"}/>
          </div>
        </div>
        <div className={"content"}>
          <div><span>기본정보</span></div>
          <div>
            <div>
              <div><span>정가</span></div>
              <div><span>10,000</span></div>
            </div>
            <div>
              <div><span>판매가</span></div>
              <div><span>10,000</span></div>
            </div>
            <div>
              <div><span>브랜드</span></div>
              <div><span>플스</span></div>
            </div>
            <div>
              <div><span>제조사</span></div>
              <div><span>소니</span></div>
            </div>
            <div>
              <div><span>원산지</span></div>
              <div><span>중국</span></div>
            </div>
            <div>
              <div><span>출시일</span></div>
              <div><span>2023-12-20</span></div>
            </div>
            <div>
              <div><span>베송비</span></div>
              <div><span>무료</span></div>
            </div>
          </div>
        </div>
        <div className={"content"}>
          <div>
            <Button>후기작성</Button>
          </div>
          <div>
            <div>
              <span>사람이름</span>
              <span>|</span>
              <span>날짜</span>
            </div>
            <div>글 내용</div>
            <div>별 이미지</div>
            <div><Button>더보기</Button></div>
          </div>
        </div>
        <div className={"content"}>
          <div>
            <Button>문의하기</Button>
          </div>
          <div>
            <div>
              <span>사람이름</span>
              <span>|</span>
              <span>날짜</span>
            </div>
            <div>글 내용</div>
            <div>답변 내용</div>
          </div>
          <div><Button>더보기</Button></div>
        </div>
      </Container>
    </>
  )
}

export default ItemCustomerDetail;