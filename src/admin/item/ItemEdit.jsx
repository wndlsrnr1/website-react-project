import {Button, Col, Container, Form, Input, InputGroup, InputGroupText, Row} from "reactstrap";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
const getTime = (localDateTimeString) => {
  return localDateTimeString.split("T")[1];
}
const getDate = (localDateTimeString) => {
  return localDateTimeString.split("T")[0];
}

const getSpaceDateTime = (timeString) => {
  return timeString.replace("T", " ");
}

const getLocalDateTime = (timeString) => {
  return timeString.replace(" ", "T");
}
const ItemEdit = () => {

  //variables
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [itemNameKor, setItemNameKor] = useState("");
  const [itemName, setItemName] = useState("");
  const [releasedAt, setReleasedAt] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  //requests

  //useEffects

  //onClicks
  const deleteImagesOnClick = (itemId) => {

  }

  //onSubmits
  const editOnSubmit = (event) => {
    event.preventDefault();

  }

  //onChanges
  const categoryOnChangeInput = (event) => {
    const value = event.target.value;
    setSelectedCategoryId(value);
  }

  const subCategoryOnChangeInput = (event) => {
    const value = event.target.value;
    setSelectedSubcategoryId(value);
  }

  const itemNameOnChangeInput = (event) => {
    setItemName(event.target.value);
  }

  const itemNameKorOnChangeInput = (event) => {
    setItemNameKor(event.target.value);
  }

  const releasedAtOnChangeInput = (event) => {
    setReleasedAt(event.target.value);
  }

  const itemPriceOnChange = (event) => {
    setItemPrice(event.target.value);
  }

  const itemQuantityOnChange = (event) => {
    setItemQuantity(event.target.value);
  }

  const itemStatusOnChange = (event) => {
    setItemStatus(event.target.value);
  }

  const itemDescriptionOnChange = (event) => {
    setItemDescription(event.target.value);
  }

  return (
    <Container className={"w-75"}>
      <h2 className={"text-center p-4"}>아이템 상세</h2>
      <Form onSubmit={editOnSubmit}>
        <div className={"box"}>
          <Row className={"mb-3"}>
            <Col>
              <InputGroup>
                <InputGroupText>카테고리</InputGroupText>
                <Input className={"bg-white"} type={"select"} value={selectedCategoryId} onChange={categoryOnChangeInput}>
                  <option value=""></option>
                </Input>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroupText>서브카테고리</InputGroupText>
                <Input className={"bg-white"} type={"select"} value={selectedSubcategoryId} onChange={subCategoryOnChangeInput}>
                  <option value="">그냥</option>
                </Input>
              </InputGroup>
            </Col>
          </Row>

          <InputGroup className={"mb-3"}>
            <InputGroupText>아이템 이름</InputGroupText>
            <Input className={"bg-white"} value={itemNameKor} onChange={itemNameKorOnChangeInput}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>아이템 영어이름</InputGroupText>
            <Input className={"bg-white"} value={itemName} onChange={itemNameOnChangeInput}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>출시일</InputGroupText>
            <Input className={"bg-white"} type={"datetime-local"} value={releasedAt} onChange={releasedAtOnChangeInput}/>
          </InputGroup>

          <Row className={"mb-3"}>
            <Col>
              <InputGroup>
                <InputGroupText>생성일</InputGroupText>
                <Input className={"bg-gradient"} disabled={true} type={"date"} value={getDate(createdAt)}/>
                <Input className={"bg-gradient"} disabled={true} type={"time"} value={getTime(createdAt)}/>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroupText>수정일</InputGroupText>
                <Input className={"bg-gradient"} disabled={true} type={"date"} value={getDate(updatedAt)}/>
                <Input className={"bg-gradient"} disabled={true} type={"time"} value={getTime(updatedAt)}/>
              </InputGroup>
            </Col>
          </Row>

          <Row className={"mb-3"}>
            <Col>
              <InputGroup>
                <InputGroupText>가격</InputGroupText>
                <Input className={"bg-white"} value={itemPrice} onChange={itemPriceOnChange} type={"number"} min={0}/>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroupText>수량</InputGroupText>
                <Input className={"bg-white"} value={itemQuantity} onChange={itemQuantityOnChange} type={"number"} min={0} max={20000000}/>
              </InputGroup>
            </Col>
          </Row>
          <div className={"pb-3"}>
            {
              images ? images.map((image, idx) => {
                return (
                  <div className={"d-inline-block me-3"} key={image.toString() + idx}>
                    <div className={"border d-flex flex-column"}>
                      <div className={"d-inline-block"}>
                        <img style={{maxHeight: "100px"}} src={"/attachment/" + image.fileId} alt={image.requestName}/>
                      </div>
                      <span className={"text-center"}>{image.requestName}</span>
                      <Button className={"btn-sm bg-primary w-100"} type="button" fileId={image.fileId} onClick={()=>deleteImagesOnClick(image.fileId)}>삭제</Button>
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
            <Input className={"bg-white"} disabled={true} value={itemStatus} onChange={itemStatusOnChange}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>설명</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={itemDescription} onChange={itemDescriptionOnChange} type={"textarea"}/>
          </InputGroup>
        </div>
        <div className={"buttons"}>
          <Link className={"w-100 bg-secondary btn text-white mb-3"} to={"/admin/items"}>취소</Link>
          <Button className={"w-100 bg-primary btn text-white"}>확인</Button>
        </div>
      </Form>

    </Container>
  )
}

export default ItemEdit;