import {Button, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const ItemAdd = () => {

  //variables
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [categoryId, setCategoryId] = useState(0);
  const [subcategoryId, setSubcategoryId] = useState(0);
  const [nameKor, setNameKor] = useState("");
  const [name, setName] = useState("");
  const [releasedAt, setReleasedAt] = useState("");
  //2024-01-11
  const [releasedAtDate, setReleasedAtDate] = useState("");
  //17:57
  const [releasedAtTime, setReleasedAtTime] = useState("");

  const [createdAr, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  // const []

  //requests
  const submitRequest = (url, body) => {
    const formData = new FormData();
    formData.append("categoryId", categoryId);
    formData.append("subcategoryId", subcategoryId);
    formData.append("nameKor", nameKor);
    formData.append("name", name);
    formData.append("releasedAt", releasedAt);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("imageFiles", imageFiles);
    formData.append("status", status);
    formData.append("description", description);

    fetch(url, {method: "post", body: formData})
      .then(resp => {
        if (resp.ok) {
          window.location.href = "/admin/items"
        } else {

        }
      });
  };

  const itemRequest = (url, itemId) => {

  };

  const categoryRequest = (url, itemId) => {

  };

  const subcategoryRequest = (url, categoryId) => {

  };

  const fileRequest = (url, itemId) => {

  };

  //useEffects
  useEffect(() => {

  }, []);

  //onClicks

  //onSubmits
  const addItemOnSubmit = (event) => {
    event.preventDefault();

  }

  //onChanges

  const categoryOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setCategoryId(value);
  }

  const subCategoryOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setSubcategoryId(value);
  }

  const nameKorOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setNameKor(value);
  }

  const nameOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setName(value);
  }

  const releasedAtDateOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setReleasedAtDate(value);
  }

  const releasedAtTimeOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setReleasedAtTime(value);
  }

  const priceOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setPrice(value);
  }

  const quantityOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setQuantity(value);
  }

  const imagesOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    const files = event.target.files;

    const maxFiles = event.target.getAttribute("max-files");
    if (maxFiles && (files.length <= parseInt(maxFiles))) {
      setImages(event.target.value);
    } else {
      setImages([]);
      return;
    }

      const maxSize = event.target.getAttribute("max-size");
      if (maxSize) {
        let fileSize = 0;
        Array.from(files).forEach(file => fileSize += file.size);
        if (fileSize > maxSize) {
          setImages([]);
          return;
        }
      }

      setImageFiles(files);
      setImages(value);
    }

  const statusOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setStatus(value);
  }

  const descriptionOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setDescription(value);
  }

  return (
    <>
      <Container className={"w-75"}>
        <Form onSubmit={addItemOnSubmit}>
          <h2 className={"text-center p-4"}>아이템 상세</h2>
          <div className={"box"}>
            <Row className={"mb-3"}>
              <Col>
                <InputGroup>
                  <InputGroupText>카테고리</InputGroupText>
                  <Input className={"bg-white"}  type={"select"} onChange={categoryOnChangeInput} value={categoryId}>
                    <option value={"123"}>카테고리</option>
                  </Input>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroupText>서브카테고리</InputGroupText>
                  <Input type={"select"} className={"bg-white"}  value={"아이템 이름1"} onChange={subCategoryOnChangeInput} value={subcategoryId}>
                    <option value={"123"}>서브 카테고리</option>
                  </Input>
                </InputGroup>
              </Col>
            </Row>

            <InputGroup className={"mb-3"}>
              <InputGroupText>아이템 이름</InputGroupText>
              <Input className={"bg-white"} onChange={nameKorOnChangeInput} value={nameKor}/>
            </InputGroup>

            <InputGroup className={"mb-3"}>
              <InputGroupText>아이템 영어이름</InputGroupText>
              <Input className={"bg-white"} onChange={nameOnChangeInput} value={name}/>
            </InputGroup>

            <InputGroup className={"mb-3"}>
              <InputGroupText>출시일</InputGroupText>
              <Input className={"bg-white"} type={"date"} onChange={releasedAtDateOnChangeInput} value={releasedAtDate} name={"releasedAtDate"}/>
              <Input className={"bg-white"} type={"time"} onChange={releasedAtTimeOnChangeInput} value={releasedAtTime} name={"releasedAtTime"}/>
            </InputGroup>

            <Row className={"mb-3"}>
              <Col>
                <InputGroup>
                  <InputGroupText>생성일</InputGroupText>
                  <Input className={""}  type={"date"} disabled={true}/>
                  <Input className={"bg-"}  type={"time"} disabled={true}/>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroupText>수정일</InputGroupText>
                  <Input className={""}  type={"date"} disabled={true}/>
                  <Input className={""}  type={"time"} disabled={true}/>
                </InputGroup>
              </Col>
            </Row>

            <Row className={"mb-3"}>
              <Col>
                <InputGroup>
                  <InputGroupText>가격</InputGroupText>
                  <Input className={"bg-white"}  type={"number"} min={0} onChange={priceOnChangeInput} value={price}/>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroupText>수량</InputGroupText>
                  <Input className={"bg-white"}  type={"number"} min={0} max={20000000} onChange={quantityOnChangeInput} value={quantity}/>
                </InputGroup>
              </Col>
            </Row>
            <InputGroup className={"mb-3"}>
              <InputGroupText>ImageFiles</InputGroupText>
              <Input style={{border: "1px solid #ced4da border-r"}} className={"rounded-2 form-control"} type={"file"} onChange={imagesOnChangeInput} value={images}
                       multiple={true} accept={".jpg, .jpeg, .png, .gif"} max-files={"3"} max-size={"31457280"}/>

            </InputGroup>

            <InputGroup className={"mb-3"}>
              <InputGroupText>상태</InputGroupText>
              <Input className={"bg-white"} onChange={statusOnChangeInput} value={status}/>
            </InputGroup>

            <InputGroup className={"mb-3"}>
              <InputGroupText>설명</InputGroupText>
              <Input className={"bg-white"}  type={"textarea"} onChange={descriptionOnChangeInput} value={description} />
            </InputGroup>
          </div>
          <div className={"buttons"}>
            <Button className={"w-100 bg-primary btn text-white"} type={"submit"}>추가</Button>
          </div>
        </Form>

      </Container>
    </>
  )
}

export default ItemAdd;