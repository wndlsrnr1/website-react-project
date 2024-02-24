import {Link, useParams} from "react-router-dom";
import {Button, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row} from "reactstrap";
import {useEffect, useState} from "react";

const getTime = (localDateTimeString) => {
  return localDateTimeString.split("T")[1];
}
const getDate = (localDateTimeString) => {
  return localDateTimeString.split("T")[0];
}

const ItemDetail = (props) => {
  //variables
  const {itemId} = useParams();
  const [loaded, setLoaded] = useState(false);
  const [item, setItem] = useState([]);
  const [category, setCategory] = useState(null);
  const [releasedAt, setReleasedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  //requests
  const requestItem = () => {
    const path = "/admin/items/" + itemId;
    fetch(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        const {category, releasedAt, updatedAt, createdAt, price, status, description} = data.data[0];
        setItem(data.data[0]);
        setCategory(category);
        setReleasedAt(releasedAt);
        setUpdatedAt(updatedAt);
        setCreatedAt(createdAt);
        setPrice(price);
        setStatus(status);
        setDescription(description);
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
  };

  const requestCategory = (subcategoryId) => {
    const path = "/admin/category?" + "subcategoryId" + "=" + subcategoryId;
    fetch(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        setCategory(data.data);
      });
  };


  const deleteRequest = (url) => {
    fetch(url, {method: "delete"})
      .then((resp) => {
        if (resp.ok) {
          window.location.href = "/admin/items";
        } else {
          console.error("fail to delete");
        }
      });
  }

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }
    requestItem();
    setLoaded(true);
  }, [loaded]);

  useEffect(() => {
    if (!item || item.length === 0) {
      return;
    }
    if (!item.subcategory?.id) {
      setCategory({});
      return;
    }
    requestCategory(item.subcategory.id);
  }, [item])

  useEffect(() => {

    console.log(images);
    console.log(item);
  }, [images])

  //onClicks
  const deleteOnClick = (event) => {
    event.preventDefault();
    deleteRequest("/admin/items/remove/" + itemId);
  }

  //onSubmits

  //onChanges

  return (
    <>
      <Container className={"w-75"}>
        <h2 className={"text-center p-4"}>아이템 상세</h2>
        <div className={"box"}>
          <Row className={"mb-3"}>
            <Col>
              <InputGroup>
                <InputGroupText>카테고리</InputGroupText>
                <Input className={"bg-white"} disabled={true} type={"select"}>
                  {
                    category ? <option value={category.id}
                                       selected={true}>{category.nameKor}</option> : null
                  }
                </Input>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroupText>서브카테고리</InputGroupText>
                <Input className={"bg-white"} disabled={true} type={"select"}>

                  <option selected={true}
                          value={item.length !== 0 && item && item.subcategory?.id ? item.subcategory.id : null}>{item.length !== 0 && item ? item.subcategory?.nameKor : null}</option>
                </Input>
              </InputGroup>
            </Col>
          </Row>

          <InputGroup className={"mb-3"}>
            <InputGroupText>아이템 이름</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={item ? item.nameKor : null}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>아이템 영어이름</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={item ? item.name : null}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>출시일</InputGroupText>
            <Input className={"bg-white"} type={"date"} disabled={true} value={getDate(releasedAt)}/>
            <Input className={"bg-white"} type={"time"} disabled={true} value={getTime(releasedAt)}/>
          </InputGroup>

          <Row className={"mb-3"}>
            <Col>
              <InputGroup>
                <InputGroupText>생성일</InputGroupText>
                <Input className={"bg-white"} disabled={true} type={"date"} value={getDate(createdAt)}/>
                <Input className={"bg-white"} disabled={true} type={"time"} value={getTime(createdAt)}/>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroupText>수정일</InputGroupText>
                <Input className={"bg-white"} disabled={true} type={"date"} value={getDate(updatedAt)}/>
                <Input className={"bg-white"} disabled={true} type={"time"} value={getTime(updatedAt)}/>
              </InputGroup>
            </Col>
          </Row>

          <Row className={"mb-3"}>
            <Col>
              <InputGroup>
                <InputGroupText>가격</InputGroupText>
                <Input className={"bg-white"} disabled={true} value={item ? item.price : null} type={"number"} min={0}/>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroupText>수량</InputGroupText>
                <Input className={"bg-white"} disabled={true} value={item ? item.quantity : null} type={"number"}
                       min={0} max={20000000}/>
              </InputGroup>
            </Col>
          </Row>
          <div className={"pb-3"}>
            {
              images ? images.map((image, idx) => {
                return (
                  <div className={"d-inline-block me-3"}>
                    <div className={"border d-flex flex-column"}>
                      <div className={"d-inline-block"}>
                        <img style={{maxHeight: "100px"}} src={"/attachment/" + image.fileId} alt={image.requestName}/>
                      </div>
                      <span className={"text-center"}>{image.requestName}</span>
                      {/*<Button className={"btn-sm bg-primary w-100"} type="button" fileId={image.fileId}>삭제</Button>*/}
                    </div>
                  </div>
                )
              }) : null
            }
          </div>

          <InputGroup className={"mb-3"}>
            <InputGroupText>ImageFiles</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={images.map((elem, idx) => elem.requestName).join(", ")}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>상태</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={item ? item.status : null}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>설명</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={item ? item.description : null} type={"textarea"}/>
          </InputGroup>
        </div>
        <div className={"buttons"}>
          <Button className={"w-100 mb-3"} onClick={deleteOnClick} >삭제</Button>
          <Link className={"w-100 bg-primary btn text-white"} to={"/admin/items/edit/" + itemId}>수정</Link>
        </div>
      </Container>
    </>
  );
}

export default ItemDetail;