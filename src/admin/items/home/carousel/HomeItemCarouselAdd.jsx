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
  ListGroupItem, ListGroupItemText,
  Row
} from "reactstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Paging from "../../../../common/Paging";
import {fetchWithAuth} from "../../../../utils/fetchUtils";

const HomeItemCarouselAdd = () => {
  //constant
  const pageSize = 10;
  const pageGroupSize = 5;

  //variables
  const [loaded, setLoaded] = useState(false);
  const [priceMin, setPriceMin] = useState(null);
  const [priceMax, setPriceMax] = useState(null);
  const [quantityMin, setQuantityMin] = useState(null);
  const [quantityMax, setQuantityMax] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [searchCondObj, setSearchCondObj] = useState({});
  const [items, setItems] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState([]);
  const [images, setImages] = useState([]);

  //hook
  const badgeOnAction = (itemId) => {
    if (parseInt(itemId) === selectedItemId) {
      return "text-white bg-secondary me-2";
    }
    return "text-white bg-primary me-2";
  }

  //requests
  const itemsRequest = (path) => {
    fetchWithAuth(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        if (data?.data) {
          const {content, totalPages, number} = data.data;
          setItems(content);
          setPageNumber(number);
          setTotalPages(totalPages);
          setSubmitted(true);
        }
      });
  }

  const categoryRequest = () => {
    fetchWithAuth("/admin/categories", {method: "get"})
      .then(response => response.json())
      .then(data => {
        setCategories(data.data.content);
      });
  }

  const itemRequest = (itemId) => {
    if (!itemId) {
      setImages([]);
      return;
    }

    const path = "/admin/items/" + itemId;
    fetchWithAuth(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        const imagesUpdated = [];
        for (const datum of data.data) {
          const imageObj = {};
          imageObj.fileId = datum.fileId;
          imageObj.requestName = datum.requestName;
          imageObj.savedFileName = datum.savedFileName;
          imagesUpdated.push(imageObj);
        }
        setImages(imagesUpdated);
      });
  }

  const homeItemCarouselAddRequest = () => {
    const formData = new FormData();
    formData.append("itemId", selectedItemId);
    formData.append("attachmentId", selectedImageId);

    fetchWithAuth("/admin/home/carousel/add", {method: "post", body: formData})
      .then(resp => {
        if (resp.ok) {
          window.location.href = "/admin/home/items/carousel";
          return {};
        } else {
          return resp.json();
        }
      })
      .then(data => {
      });
  };


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
    setSearchCondObj(searchCondObjUpdated)
    setSubmitted(false);
  }, [submitted])

  useEffect(() => {
    if (loaded) {
      return;
    }
    categoryRequest();
    let path = `/admin/items?size=${pageSize}`;

    itemsRequest(path);
    setLoaded(true);
  }, [loaded]);

  useEffect(() => {
    itemRequest(selectedItemId);
  }, [selectedItemId]);

  //onClicks

  const toggleItemIdOnClick = (itemId) => {
    if (itemId === selectedItemId) {
      setSelectedItemId(null);
      setSelectedImageId(null);
      return;
    }
    setSelectedItemId(parseInt(itemId));
  }

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

  const toggleSelectedImageOnclick = (imageId) => {
    const imageIdParsed = parseInt(imageId);
    // if (selectedImageIdList.includes(ImageIdParsed)) {
    //   const newOne = selectedImageIdList.filter((selectedImageId, idx) => selectedImageId !== ImageIdParsed);
    //   setSelectedImageIdList(newOne);
    //   return;
    // }
    // const newOne = [...selectedImageIdList, ImageIdParsed];
    if (!selectedImageId) {
      setSelectedImageId(imageIdParsed)
      return;
    }
    if (selectedImageId !== imageIdParsed) {
      setSelectedImageId(imageIdParsed);
    }
    if (selectedImageId === imageIdParsed) {
      setSelectedImageId(null);
    }
  }

  const submitHomeItemCarouselAddOnClick = () => {
    homeItemCarouselAddRequest();
  }

  //onChanges
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
        <h1 className={"text-center p-3"}>캐러셀 추가</h1>

        <div>
          <h3 className={"text-center p-3"}>아이템 선택</h3>
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
                    </Input>
                  </InputGroup>
                </Col>
                <Col className={"col-9"}>
                  <InputGroup className={"flex-grow-2"}>
                    <InputGroupText>검색</InputGroupText>
                    <Input placeholder={"아이템 이름 검색"} name={"searchName"} type={"text"}
                           value={searchName} onChange={searchNameOnChange}/>
                    <Button type={"submit"} className={"bg-primary"}>검색</Button>
                  </InputGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <hr/>
        <div className={"mb-3"}>
          <ListGroup>
            {
              items && items.length !== 0 ? (
                items.map((item, idx) => {
                  return (
                    <ListGroupItem key={item.toString() + idx} className="justify-content-between"
                                   onClick={() => toggleItemIdOnClick(item.id)}
                                   active={parseInt(item.id) === selectedItemId}>
                      {/*<Badge pill className={"text-white bg-primary me-2"} color={"primary"}>*/}
                      <Badge pill className={badgeOnAction(item.id)} color={"primary"}>
                        {item.subcategory?.nameKor ? item.subcategory?.nameKor : null}
                      </Badge>
                      <span className={"text-decoration-none"}>{item.nameKor} ({item.name})</span>
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

        <div className={"mb-3"}>
          <Paging pageGroupSize={pageGroupSize} pageSize={pageSize} pageNumber={pageNumber} totalPages={totalPages}
                  requestDomain={"/admin/items"} requestMethod={itemsRequest} parameterOption={searchCondObj}/>
        </div>

        <div>
          <h3 className={"text-center p-2"}>사진 선택</h3>
          <ListGroup horizontal={true} style={{overflowX: "auto"}}>
            {
              images ? images.map((image, idx) => {
                if (!image.requestName) {
                  return;
                }
                return (
                  <ListGroupItem tag={"button"} className={"d-inline-block me-3"} key={image.toString() + idx} active={selectedImageId === parseInt(image.fileId)} onClick={() => toggleSelectedImageOnclick(image.fileId)}>
                    <div className={"border d-flex flex-column"}>
                      <div className={"d-inline-block"}>
                        <div className={"d-flex justify-content-center"}>
                          <img style={{maxHeight: "100px"}} src={"/attachment/" + image.fileId} alt={image.requestName}/>
                        </div>
                      </div>
                      <span className={"text-center"}>{image.requestName}</span>
                    </div>
                  </ListGroupItem>
                )
              }) : null
            }
          </ListGroup>
        </div>

        <div className={"buttons d-flex justify-content-end"}>
          <Link className={"btn btn-secondary me-2"}>취소</Link>
          <Button className={"bg-primary"} onClick={submitHomeItemCarouselAddOnClick}>추가</Button>
        </div>
      </Container>
    </>
  );
}

export default HomeItemCarouselAdd;