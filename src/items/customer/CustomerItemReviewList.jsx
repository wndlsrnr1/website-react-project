import Header from "../../common/Header";
import Footer from "../../common/Footer";
import {Button, Col, Container, Row} from "reactstrap";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "../../utils/fetchUtils";
import {parseDate} from "../../utils/timeUtils";

const CustomerItemReviewList = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [itemWithReviewedList, setItemWithReviewedList] = useState([]);
  const [nextSearchAfter, setNextSearchAfter] = useState(null);
  const [size, setSize] = useState(5);

  //variables

  //hooks

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }
    requestItemWithReviewed();
    setLoaded(true);
  }, [])

  //onClicks
  const seeMoreOnclick = (event) => {
    event.preventDefault();
    requestItemWithReviewed();
  }

  //onSubmits

  //onChanges

  //requests
  const requestItemWithReviewed = () => {
    let path = "/items/reviewed";
    path += "?size=" + size;
    if (nextSearchAfter !== null && nextSearchAfter) {
      path += "&nextSearchAfter=" + nextSearchAfter;
    }
    fetchWithAuth(path, {method: "get"})
      .then(resp => {
        if (!resp.ok) {
          // todo: 에러처리하기
          console.error("에러처리하기");
        } else {
          resp.json().then(data => {
            setItemWithReviewedList([...itemWithReviewedList, ...data.body.items]);
            setNextSearchAfter(data.body.nextSearchAfter);
          });
        }
      });
  }

  return (<Container>
    <Header/>
    <Container>
      <Row xs={6} className={"text-center bg-secondary bg-opacity-25"}>
        <Col className={"border-end border-1 border-dark"}>작성일</Col>
        <Col className={"border-end border-1 border-dark"}>상품정보</Col>
        <Col className={"border-end border-1 border-dark"} xs={6}>내용</Col>
        <Col>작성자</Col>
      </Row>
      {
        itemWithReviewedList.length !== 0 ? (
          itemWithReviewedList.map((itemWithReviewed, idx) => {
            return <>
              <Row xs={6} className={"text-center border-bottom border-dark"}>
                <Col className={"border-end border-1 border-dark"}><span>{parseDate(itemWithReviewed.createdAt)}</span></Col>
                <Col className={"border-end border-1 border-dark"}>
                  <div>
                    <div>
                      {/*"url('/images/star2.png') 0px 0px / 30px 30px no-repeat" background: getStarImage(idx, star), backgroundSize: "30px 30px",
                        width: "35px",
                        height: "35px",
                        border: "0px"*/}
                      {/*<img src={"/images/star2.png"} style={{background: "url('/images/star2.png') 0px 0px / 40px 40px no-repeat", backgroundSize: "40px 40px", width: "40px", height: "40px", border: "0px"}}/>*/}
                      <a href={"/items/detail/" + itemWithReviewed.itemId}>
                        <img src={"/attachment/" + itemWithReviewed.imageIdForThumbnail}
                             style={{width: "60px", height: "60px", border: "0px"}}
                             className={"mt-3 mb-3"}/>
                      </a>

                    </div>
                    <div>
                      <span>{itemWithReviewed.itemNameKor}</span></div>
                  </div>
                </Col>
                <Col className={"border-end border-1 border-dark"} xs={6}>
                  <span>{itemWithReviewed.reviewContent}</span>
                </Col>
                <Col>
                  <span>{itemWithReviewed.username}</span>
                </Col>
              </Row>
            </>
          })
        ) : null
      }
      <div>
        {
          nextSearchAfter !== null ?
            <Button className={"mt-4 w-100 bg-primary"} onClick={seeMoreOnclick}>더보기</Button> :
            null
        }
      </div>
    </Container>
    <Footer/>
  </Container>);
}
export default CustomerItemReviewList