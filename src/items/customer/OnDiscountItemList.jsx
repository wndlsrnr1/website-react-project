import {Button, Container, Input, InputGroup, InputGroupText, Row} from "reactstrap";
import Header from "../../common/Header";
import Categories from "../../common/Categories";
import {getDiscountedPrice} from "../../utils/priceUtils";
import {parseDate} from "../../utils/timeUtils";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "../../utils/fetchUtils";

const OnDiscountItemList = () => {
  //variables
  const [itemList, setItemList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //variables - paging
  const size = 30;
  const onDiscount = true;
  const [sortType, setSortType] = useState("RECENT_RELEASED");
  const [searchAfter, setSearchAfter] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  //hooks
  const isDiscountRatio = (itemObject) => {
    const saleRate = itemObject?.saleRate;
    if (!saleRate) {
      return false;
    }

    const saleRateParsed = parseInt(saleRate);

    if (saleRateParsed <= 0) {
      return false;
    }
    return true;
  }

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }
    requestItem();
    setLoaded(true);
  },[])

  useEffect(() => {
    requestItem();
  }, [sortType]);


  //onClicks
  const showMore = () => {
    if (searchAfter == null) {
      return;
    }

    requestItem();
  }

  //onSubmits

  //onChanges
  const sortByOnChangeInput = (event) => {
    event.preventDefault()
    const value = event.currentTarget.value;
    if (value === sortType) {
      return;
    }
    setSortType(value);
    setSearchAfter(null);
    setItemList([]);
  }

  //requests
  const requestItem = () => {
    let path = "/item"
    path += "?size=" + size;
    path += "&onDiscount=" + onDiscount;
    path += "&sortType=" + sortType;
    if (searchAfter !== null) {
      path += "&searchAfter=" + searchAfter;
    }
    if (!loaded) {
      path += "&withTotalCount=" + true;
    }
    fetchWithAuth(path, {method: "get"})
      .then(resp => {
        if (!resp.ok) {
          //todo: handle error
          console.error("error");
        } else {
          resp.json().then(data => {
            console.log("asdf", data);
            const newVar = [...itemList, ...data.body.items];
            setItemList(newVar);
            setSearchAfter(data.body.nextSearchAfter);
            if (totalCount === 0 || data.body?.totalCount) {
              setTotalCount(data.body.totalCount);
            }
          });
        }
      });
  }


  return (
    <>
      <Container>
        <Header/>
        <Categories/>
        <div className={"bg-light ms-3 me-3 mb-3"}>
          <div>
            <div><span className={"text-secondary"}>할인 상품</span></div>
          </div>
        </div>
        <Container>
          <div  className={"d-flex justify-content-between mb-2"}>
            <div className={"d-flex justify-content-start align-items-center-2 m-0"}>
              <h4 className={"me-1 mb-0"}>할인 상품</h4>
              <div>( {totalCount} )</div>
            </div>
            <div className={"d-flex justify-content-end"}>
              <InputGroup>
                <InputGroupText>정렬</InputGroupText>
                <Input type={"select"} value={sortType} onChange={sortByOnChangeInput}>
                  <option value={"RECENT_RELEASED"}>최신 발매순</option>
                  <option value={"RECENT_CREATED"}>최신 등록순</option>
                  <option value={"PRICE_ASC"}>낮은 가격순</option>
                  <option value={"PRICE_DESC"}>높은 가격순</option>
                  <option value={"NAME_ASC"}>이름 오름차순</option>
                  <option value={"NAME_DESC"}>이름 내림차순</option>
                </Input>
              </InputGroup>
            </div>
          </div>
          <Row className={"mb-4"} xs={5}>
            {
              itemList.length !== 0 ? itemList.map((item, idx) => {
                return (
                  <div className={"d-flex flex-column align-items-center border pt-3 pb-3"}
                       key={item.price + (idx) * 100}>
                    <a href={"/items/detail/" + item.itemId}>
                      <img src={"/attachment/" + item.attachmentIdForThumbnail} style={{height: "200px"}}/>
                    </a>
                    <div>
                      <span>이름: </span>
                      <span>{item.itemNameKor}</span>
                    </div>

                    {
                      isDiscountRatio(item) ? (
                        <div>
                          <span>가격: </span>
                          <span
                            className={"text-decoration-line-through"}>{item.price}</span>
                          <span>  -> </span>
                          <span>{getDiscountedPrice(item.price, item.saleRate)}</span>
                        </div>
                      ) : (
                        <div>
                          <span>가격: </span>
                          <span>{item.price}</span>
                        </div>
                      )
                    }

                    <div>
                      <span>출시일: </span>
                      <span>{parseDate(item.releasedAt)}</span>
                    </div>
                    <div>
                      <span>등록일: </span>
                      <span>{parseDate(item.createdAt)}</span>
                    </div>

                  </div>
                )
              }) : (
                <div className={"w-100 d-flex align-items-center"} style={{height: "100px"}}>
                  <div>상품이 없습니다</div>
                </div>
              )
            }
          </Row>
          <div>
            {searchAfter !== null ?
              <Button className={"bg-primary w-100"} onClick={() => showMore()}>더보기</Button> :
              null
            }
          </div>
        </Container>
      </Container>
    </>
  )
}

export default OnDiscountItemList;