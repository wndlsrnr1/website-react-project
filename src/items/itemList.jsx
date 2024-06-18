import Header from "../common/Header";
import Categories from "../common/Categories";
import {Container, Input, InputGroup, InputGroupButtonDropdown, InputGroupText, Row} from "reactstrap";
import {useEffect, useState} from "react";

const ItemList = () => {

  const pageSize = 20;
  const pageChunk = 5; //마지막으로 바로 옮길때 OffSet에 빠르게 접근하기 위해서 필요함.
  //subcategory, category 정보 받기
  //App.js에 url등록하기
  // 등등

  //variables
  const [loaded, setLoaded] = useState(false);
  const [subcategoryId, setSubcategoryId] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortedBy, setSortedBy] = useState("name");
  //sorted 검색 값이 달라 질 경우 초기화
  const [totalItems, setTotalItems] = useState(-1);
  //sortedBy에서 검색 값이 달라 질 경우 -1로 초기화 시켜주어야 함.
  const [lastItemId, setLastItemId] = useState(-1);

  //hooks

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }
    const subcategoryIdOnUrl = parseInt(new URLSearchParams(window.location.search).get("subcategoryId"));
    setSubcategoryId(subcategoryIdOnUrl);
    itemListForCustomerRequest(subcategoryIdOnUrl);
    setLoaded(true);
  }, [loaded]);

  //onClicks

  //onSubmits

  //onChanges

  //requests
  const itemListForCustomerRequest = (subcategoryId) => {
    let url = "/home/item_list?subcategoryId=" + subcategoryId;
    url += "&pageNumber=" + pageNumber;
    url += "&sortedBy=" + sortedBy;
    url += "&pageSize=" + pageSize;
    url += "&lastItemId=" + lastItemId;
    url += "&totalItems=" + totalItems;

    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
      });
  }

  return (
    <Container>
      <Header/>
      <Categories/>
      <div className={"bg-light ms-3 me-3 mb-3"}>
        <div>
          <span className={"text-secondary"}>홈</span>
          <span className={"text-secondary"}> > </span>
          <span className={"text-secondary"}>카테고리1</span>
          <span className={"text-secondary"}> > </span>
          <span className={"text-secondary"}>subcategory1</span>
        </div>
      </div>

      <Container>
        <div className={"d-flex justify-content-between"}>
          <div>
            <h4>subcategory1</h4>
          </div>
          <div>
            <InputGroup>
              <InputGroupText>정렬</InputGroupText>
              <Input type={"select"} /*value={}*/ /*onChange={}*/>
                <option /*key={} value={}*/>이름순</option>
                <option /*key={} value={}*/ value="123">높은 가격순</option>
                <option /*key={} value={}*/ value="123">낮은 가격</option>
                <option /*key={} value={}*/ value="123">등록순</option>
                <option /*key={} value={}*/ value="123">발매일순</option>
              </Input>
            </InputGroup>
          </div>

        </div>
        <Row xs={5}>
          <div className={"d-flex flex-column align-items-center border pt-3 pb-3"}>
            <a href={"/item/detail/" + 123}>
              <img src={"/attachment/" + 123} style={{height: "200px"}}/>
            </a>
            <div>
              <span>이름: </span>
              <span>상품</span>
            </div>
            <div>
              <span>가격: </span>
              <span
                className={"text-decoration-line-through"}>1234</span>
              <span>  -> </span>
              <span>123</span>
            </div>

            <div>
              <span>출시일: </span>
              <span>12314</span>
            </div>
          </div>
        </Row>
      </Container>
    </Container>
  )


}

export default ItemList;