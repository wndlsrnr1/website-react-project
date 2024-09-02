import Header from "../common/Header";
import Categories from "../common/Categories";
import {Button, Container, Input, InputGroup, InputGroupButtonDropdown, InputGroupText, Row} from "reactstrap";
import {useEffect, useState} from "react";
import {getDiscountedPrice} from "../utils/priceUtils";
import {parseDate} from "../utils/timeUtils";
import {fetchWithAuth} from "../utils/fetchUtils";

const ItemList = () => {

  const pageSize = 20;
  const pageChunk = 5; //마지막으로 바로 옮길때 OffSet에 빠르게 접근하기 위해서 필요함.
  //subcategory, category 정보 받기
  //App.js에 url등록하기
  // 등등

  //variables
  const [loaded, setLoaded] = useState(false);
  const [subcategoryId, setSubcategoryId] = useState(null);
  const [page, setPage] = useState(0);
  const [sortedBy, setSortedBy] = useState("name");
  //sorted 검색 값이 달라 질 경우 초기화
  const [totalItems, setTotalItems] = useState(-1);
  //sortedBy에서 검색 값이 달라 질 경우 -1로 초기화 시켜주어야 함.
  const [lastItemId, setLastItemId] = useState(-1);
  const [subcategory, setSubcategory] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [totalPages, setTotalPages] = useState(-1);


  //hooks
  const isDiscountRatio = (itemObject) => {
    const saleRate = itemObject?.saleRate;
    console.log("discountRatio", saleRate)
    if (!saleRate) {
      return false;
    }

    const saleRateParsed = parseInt(saleRate);

    if (saleRateParsed <= 0) {
      return false;
    }
    return true;
  }

  const isLastPage = () => {
    if (totalPages === -1) {
      return true;
    }
    return (totalPages - page - 1) === 0;
  }

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }
    const subcategoryIdOnUrl = parseInt(new URLSearchParams(window.location.search).get("subcategoryId"));
    setSubcategoryId(subcategoryIdOnUrl);
    itemListForCustomerRequest(subcategoryIdOnUrl);
    categoryAndSubcategoryRequestBySubcategoryId(subcategoryIdOnUrl);
    setLoaded(true);
  }, [loaded]);


  //nextPage보다 직접 호출하는게 나았음.
  //정렬값을 바꾸었을때
  useEffect(() => {
    if (lastItemId !== -1) {
      return;
    }
    const subcategoryIdOnUrl = parseInt(new URLSearchParams(window.location.search).get("subcategoryId"));
    itemListForCustomerRequest(subcategoryIdOnUrl);
  }, [sortedBy, lastItemId]);


  //nextPage보다 직접 호출하는게 나았음. 연관 관계를 확실하게 알 수 없음.
  //onChange PageNumber -> this useEffect
  useEffect(() => {
    if (page === 0) {
      return;
    }
    const subcategoryIdOnUrl = parseInt(new URLSearchParams(window.location.search).get("subcategoryId"));
    itemListAddedForCustomerRequest(subcategoryIdOnUrl);
  }, [page])

  //onClicks
  const showMoreOnClick = (event) => {
    setPage(page + 1);
  }

  //onSubmits

  //onChanges
  const sortOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    if (value === sortedBy) {
      return;
    }
    setPage(0);
    setLastItemId(-1);
    setSortedBy(value);
    setTotalItems(-1);

  }

  //requests
  const itemListForCustomerRequest = (subcategoryId) => {
    let url = "/home/items/list?subcategoryId=" + subcategoryId;
    url += "&page=" + page;
    url += "&sortedBy=" + sortedBy;
    url += "&pageSize=" + pageSize;
    url += "&lastItemId=" + lastItemId;
    url += "&totalItems=" + totalItems;

    fetchWithAuth(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setPage(data.data.number);
        if (data.data.content.length > 0) {
          setLastItemId(parseInt(data.data.content[data.data.content.length - 1]["id"]));
        }
        setTotalItems(data.data.totalElements);
        setItemList([...data.data.content])
        setTotalPages(data.data.totalPages);
        console.log("page", data.data.number);
        console.log("totalElements", data.data.totalElements);

      });
  }

  const itemListAddedForCustomerRequest = (subcategoryId) => {
    let url = "/home/items/list?subcategoryId=" + subcategoryId;
    url += "&page=" + page;
    url += "&sortedBy=" + sortedBy;
    url += "&pageSize=" + pageSize;
    url += "&lastItemId=" + lastItemId;
    url += "&totalItems=" + totalItems;

    fetchWithAuth(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setPage(data.data.number);
        setLastItemId(parseInt(data.data.content[data.data.content.length - 1]["id"]));
        setTotalItems(data.data.totalElements);
        setItemList([...itemList, ...data.data.content])
        setTotalPages(data.data.totalPages);

      });
  }

  const categoryAndSubcategoryRequestBySubcategoryId = (subcategoryId) => {
    const url = "/home/info/item/category/subcategory/" + subcategoryId
    fetchWithAuth(url, {method: "get"})
      .then(resp => {
        if (resp.status === 404) {
          console.error("404");
          return;
        }
        if (resp.status !== 200) {
          console.error("error");
          return;
        }
        return resp.json();
      })
      .then(data => {
        if (data === undefined || !data || !data?.data) {
          return;
        }
        setSubcategory(data?.data)
      });
  }



  return (
    <Container>
      <Header/>
      <Categories/>
      <div className={"bg-light ms-3 me-3 mb-3"}>
        <div>
          {
            subcategory ? (
                <>
                  <span className={"text-secondary"}>홈</span>
                  <span className={"text-secondary"}> > </span>
                  <span className={"text-secondary"}>{subcategory.categoryNameKor}</span>
                  <span className={"text-secondary"}> > </span>
                  <span className={"text-secondary"}>{subcategory.subcategoryNameKor}</span>
                </>
              )
              :
              (
                <>
                  <span className={"text-secondary"}>홈</span>
                </>
              )
          }
        </div>
      </div>

      <Container>
        <div className={"d-flex justify-content-between mb-2"}>
          <div className={"d-flex justify-content-start align-items-center-2 m-0"}>
            <h4 className={"me-1 mb-0"}>{subcategory ? subcategory.subcategoryNameKor : null}</h4>

            {
              totalItems ? (
                  <div>({totalItems} )</div>
                ) :
                <div>( {0} )</div>
            }
          </div>
          <div>
            <InputGroup>
              <InputGroupText>정렬</InputGroupText>
              <Input type={"select"} value={sortedBy} onChange={sortOnChangeInput}>
                <option value={"name"}>이름순</option>
                <option value={"maxPrice"}>높은 가격순</option>
                <option value={"minPrice"}>낮은 가격</option>
                <option value={"created"}>등록순</option>
                <option value={"released"}>발매일순</option>
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
                  <a href={"/items/detail/" + item.id}>
                    <img src={"/attachment/" + item.fileIdForThumbnail} style={{height: "200px"}}/>
                  </a>
                  <div>
                    <span>이름: </span>
                    <span>{item.nameKor}</span>
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
        <div className={"w-100"}>
          {
            isLastPage() ? null : (
              <Button className={"bg-secondary w-100 opacity-75"} onClick={showMoreOnClick}>더보기</Button>
            )
          }
        </div>
      </Container>
    </Container>
  )


}

export default ItemList;