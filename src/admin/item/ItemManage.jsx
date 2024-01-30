import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  ListGroup,
  ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Row
} from "reactstrap";
import {Link} from "react-router-dom";
import Paging from "../../common/Paging";
import {useEffect, useState} from "react";


const ItemManage = () => {
  const pageGroupSize = 5;
  const pageSize = 10;

  //variables
  const [loaded, setLoaded] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [priceMin, setPriceMin] = useState(null);
  const [priceMax, setPriceMax] = useState(null);
  const [quantityMin, setQuantityMin] = useState(null);
  const [quantityMax, setQuantityMax] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [searchCondObj, setSearchCondObj] = useState({});

  //requests

  const itemsRequest = (path) => {
    console.log("path", path);
    fetch(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        if (data?.data) {
          const {content, totalPages, number} = data.data;
          setItems(content);
          setPageNumber(number);
          setTotalPages(totalPages);
          setSubmitted(true);
          console.log(content);
        }
      });
  }

  const categoryRequest = () => {
    fetch("/admin/categories", {method: "get"})
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCategories(data.data.content);
      });
  }

  //useEffects
  useEffect(() => {
    if (submitted === false) {
      return;
    }

    const searchCondObjUpdated = {};
    if (priceMin !== null && priceMin) {
      searchCondObjUpdated["priceMin"] = priceMin
    }
    if (priceMax !== null && priceMax) {
      searchCondObjUpdated["priceMax"] = priceMax
    }
    if (quantityMin !== null && quantityMin) {
      searchCondObjUpdated["quantityMin"] = quantityMin
    }
    if (quantityMax !== null && quantityMax) {
      searchCondObjUpdated["quantityMax"] = quantityMax
    }
    if (categoryId !== null && categoryId) {
      if (categoryId === -1 || categoryId == -1) {
        delete searchCondObjUpdated.categoryId;
      } else {
        searchCondObjUpdated["categoryId"] = categoryId;
      }
    }
    if (searchName) {
      searchCondObjUpdated["searchName"] = searchName
    }
    console.log(searchCondObjUpdated);
    setSearchCondObj(searchCondObjUpdated)
    setSubmitted(false);

  }, [submitted]);

  useEffect(() => {
    if (loaded) {
      return;
    }

    categoryRequest();
    let path = `/admin/items?size=${pageSize}`;

    itemsRequest(path);
    setLoaded(true);
  }, [loaded]);

  //onClicks

  //onSubmits
  const searchFormOnSubmit = (event) => {
    event.preventDefault();
    let path = `/admin/items?size=${pageSize}`;
    const obj = {};
    if (priceMin !== null && priceMin) {
      obj["priceMin"] = priceMin
    }
    if (priceMax !== null && priceMax) {
      obj["priceMax"] = priceMax
    }
    if (quantityMin !== null && quantityMin) {
      obj["quantityMin"] = quantityMin
    }
    if (quantityMax !== null && quantityMax) {
      obj["quantityMax"] = quantityMax
    }
    if (categoryId !== null && categoryId) {
      obj["categoryId"] = categoryId
    }
    if (searchName) {
      obj["searchName"] = searchName
    }

    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      path += "&" + key + "=" + value;
    });
    itemsRequest(path);
    setSearchCondObj(obj);
  }

  //onChange
  const priceMinOnChange = (event) => {
    const value = event.currentTarget.value;
    setPriceMin(value);
  }
  const priceMaxOnChange = (event) => {
    const value = event.currentTarget.value;
    setPriceMax(value);
  }
  const quantityMinOnChange = (event) => {
    const value = event.currentTarget.value;
    setQuantityMin(value);
  }
  const quantityMaxOnChange = (event) => {
    const value = event.currentTarget.value;
    setQuantityMax(value);
  }
  const categoryIdOnChange = (event) => {
    const value = event.currentTarget.value;
    setCategoryId(value);
  }
  const searchNameOnChange = (event) => {
    const value = event.currentTarget.value;
    setSearchName(value);
  }
  return (
    <>
      <Container className={"w-75"}>

        <h2 className={"p-5 text-center"}>아이템 관리</h2>
        <div className={"d-flex justify-content-end pb-2"}>
          <Link to={"/admin/items/add"} className={"bg-primary text-white btn"}>아이템 추가</Link>
        </div>
        <div>
          <Form onSubmit={searchFormOnSubmit}>
            <Row className={"mb-2"}>
              <Col>
                <InputGroup>
                  <InputGroupText>가격</InputGroupText>
                  <Input placeholder={"최소값"} type={"number"} name={"priceMin"} value={priceMin}
                         onChange={priceMinOnChange}/>
                  <InputGroupText>~</InputGroupText>
                  <Input placeholder={"최대값"} type={"number"} name={"priceMax"} value={priceMax}
                         onChange={priceMaxOnChange}/>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroupText>수량</InputGroupText>
                  <Input placeholder={"최소값"} type={"number"} name={"quantityMin"} value={quantityMin}
                         onChange={quantityMinOnChange}/>
                  <InputGroupText>~</InputGroupText>
                  <Input placeholder={"최대값"} type={"number"} name={"quantityMax"} value={quantityMax}
                         onChange={quantityMaxOnChange}/>
                </InputGroup>
              </Col>
            </Row>
            <Row>
              <Col className={"col-3"}>
                <InputGroup>
                  <Input type={"select"} className={"text-center"} name={"categoryId"} onChange={categoryIdOnChange}>
                    <option value={-1} selected={true}>카테고리 전체</option>
                    {categories && categories.length !== 0 ? categories.map((category, index) => {
                      return (
                        <option key={category.name + index} value={category.id}>{category.nameKor}</option>
                      )
                    }) : null}
                    <option>카테고리1</option>
                  </Input>
                </InputGroup>
              </Col>
              <Col className={"col-9"}>
                <InputGroup className={"flex-grow-2"}>
                  <InputGroupText>검색</InputGroupText>
                  <Input placeholder={"아이템 이름 검색"} name={"searchName"} type={"text"} value={searchName}
                         onChange={searchNameOnChange}/>
                  <Button type={"submit"} className={"bg-primary"}>검색</Button>
                </InputGroup>
              </Col>
            </Row>
          </Form>
        </div>
        <hr/>
        <div>
          <ListGroup>
            {
              items && items.length !== 0 ? (
                items.map((item, idx) => {
                  return (
                    <ListGroupItem key={item.toString() + idx} className="justify-content-between">
                      <Badge pill className={"text-white bg-primary me-2"} color={"primary"}>
                        {item.subcategory?.nameKor ? item.subcategory?.nameKor : null}
                      </Badge>
                      <Link to={"/admin/items/" + item.id}
                            className={"text-decoration-none text-black"}>{item.nameKor} ({item.name})</Link>
                    </ListGroupItem>
                  )
                })
              ) : (
                <ListGroupItem className="justify-content-between">
                  <Link className={"text-decoration-none text-black"}>아이템이 없습니다</Link>
                </ListGroupItem>
              )
            }
          </ListGroup>
        </div>
        <Paging pageGroupSize={pageGroupSize} pageSize={pageSize} pageNumber={pageNumber} totalPages={totalPages}
                requestDomain={"/admin/items"} requestMethod={itemsRequest} parameterOption={searchCondObj}/>
      </Container>
    </>
  );
}

export default ItemManage;