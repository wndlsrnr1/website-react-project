import {Container, Row} from "reactstrap";
import {useEffect, useState} from "react";

const HomeItemRecent = () => {
  //아이템 상세로 넘어가는 링크 만들기, 할인 가격 적용되게 만들기

  //variables
  const [itemsRecent, setItemsRecent] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //hooks
  const parseDate = (date) => new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'numeric', day: 'numeric'
  });

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }

    recentItemRequest();

  }, [loaded])

  //onClicks

  //onSubmits

  //onChanges

  //requests
  const recentItemRequest = () => {
    fetch("/home/main/item/recent", {
      method: "get"
    })
      .then(resp => resp.json())
      .then(data => {
        setItemsRecent(data);
      });
  }

  return (
    <Container>
      <h4>새로운 출시</h4>
      <Row xs={5}>
        {
          itemsRecent.length !== 0 ? itemsRecent.map((itemRecent, idx) => {
            return (
              <div className={"d-flex flex-column align-items-center border pt-3 pb-3"} key={itemRecent.toString() + idx}>
                <img src={"/attachment/" + itemRecent.fileId} style={{height: "200px"}}/>
                <div>
                  <span>이름: </span>
                  <span>{itemRecent.name}</span>
                </div>
                <div>
                  <span>가격: </span>
                  <span>{itemRecent.price}</span>
                </div>
                <div>
                  <span>출시일: </span>
                  <span>{parseDate(itemRecent.releasedAt)}</span>
                </div>
              </div>
              )
            })
            :
            null
        }
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

  );
}

export default HomeItemRecent;