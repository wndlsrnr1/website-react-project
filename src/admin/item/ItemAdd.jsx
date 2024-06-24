import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  ListGroupItem,
  Row
} from "reactstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import data from "bootstrap/js/src/dom/data";

const getFormattedDateTime = (date, time) => {
  console.log(data);
  console.log(time);
  const datetime1 = date + " " + time + ":00";
  return datetime1;
  // const datetime2 = new Date(datetime1)
  // return datetime2.toISOString();
}

const getImageFromFileObj = (fileObj) => {
  if (!fileObj) {
    return null;
  }
  return URL.createObjectURL(fileObj);
}

const ItemAdd = () => {

  //variables
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [categoryId, setCategoryId] = useState(0);
  const [subcategoryId, setSubcategoryId] = useState(0);
  const [nameKor, setNameKor] = useState("");
  const [name, setName] = useState("");
  const [releasedAt, setReleasedAt] = useState("");
  //2024-01-30T09:52:46.390964 LDT
  //'2024-01-10T09:56' datetime-local (javascript)

  //2024-01-11 date
  const [releasedAtDate, setReleasedAtDate] = useState("");
  //17:57 time
  const [releasedAtTime, setReleasedAtTime] = useState("");

  const [createdAr, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");


  const [imageNames, setImageNames] = useState([]);
  //FileList객체임
  const [imageFiles, setImageFiles] = useState([]);
  const [thumbnailName, setThumbnailName] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);


  // const []

  //requests
  const submitRequest = (url) => {
    const formData = new FormData();
    const updatedReleasedAt = getFormattedDateTime(releasedAtDate, releasedAtTime);
    console.log(updatedReleasedAt);

    formData.append("categoryId", categoryId);
    formData.append("subcategoryId", subcategoryId);
    formData.append("nameKor", nameKor);
    formData.append("name", name);
    formData.append("releasedAt", updatedReleasedAt);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("images", imageNames);
    // formData.append("imageFiles", imageFiles);
    for (const imageFile of imageFiles) {
      formData.append("imageFiles", imageFile);
    }

    formData.append("status", status);
    formData.append("description", description);
    formData.append("thumbnailFile", thumbnailFile);
    formData.append("thumbnailImage", thumbnailName);


    fetch(url, {method: "post", body: formData})
      .then(resp => {
        if (resp.ok) {
          window.location.href = "/admin/items"
        } else {
          return resp.json();
        }
      })
      .then((data) => {
        console.log(data);
      });
  };

  const categoryRequest = (url) => {
    fetch(url, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        const {content} = data.data;
        setCategories(content);
      });
  };

  const subcategoryRequest = (url, categoryId) => {
    fetch(url + categoryId, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        setSubcategories(data.data.content);
      });
  };

  //useEffects
  useEffect(() => {
    categoryRequest("/admin/categories?size=1000");
  }, []);

  useEffect(() => {
    if (!categoryId) {
      return;
    }

    subcategoryRequest("/admin/subcategories?size=1000&categoryId=", categoryId);
  }, [categoryId]);

  //onClicks
  const deleteImageOnClick = (fileSequence) => {
    const imageFileListNew = [];
    for (let i = 0; i < imageFiles.length; i++) {
      if (i === fileSequence) {
        continue;
      }
      imageFileListNew.push(imageFiles[i]);
    }

    setImageFiles(imageFileListNew);
    console.log(imageFileListNew);
  }

  //onSubmits
  const addItemOnSubmit = (event) => {
    event.preventDefault();
    submitRequest("/admin/items/add")
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
    const imageNameList = [];
    for (const file of event.target.files) {
      imageNameList.push(file.name);
    }

    if (maxFiles && (files.length <= parseInt(maxFiles))) {
      setImageNames(imageNameList);
    } else {
      setImageNames([]);
      return;
    }

    const maxSize = event.target.getAttribute("max-size");
    if (maxSize) {
      let fileSize = 0;
      Array.from(files).forEach(file => fileSize += file.size);
      if (fileSize > maxSize) {
        setImageNames([]);
        return;
      }
    }
    console.log("files = ", files);
    setImageFiles(Array.from(files));
    setImageNames(imageNameList);
  }

  const thumbnailOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    const files = event.target.files;
    const maxSize = event.target.getAttribute("max-size");
    const thumbnailObj = event.target.files[0].name;
    console.log("event.target", event.target);
    console.log("event.target.files", event.target.files);
    console.log("event.target.files[0].name", event.target.files[0].name);
    if (files[0].size > maxSize) {
      setThumbnailName(null);
      setThumbnailFile(null);
      return;
    }
    setThumbnailName(thumbnailObj);
    setThumbnailFile(files[0]);
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
                  <Input className={"bg-white"} type={"select"} onChange={categoryOnChangeInput} value={categoryId}>
                    <option value={""}>카테고리를 선택해주세요</option>
                    {
                      categories.length !== 0 ? categories.map((category, idx) => {
                        return (
                          <option key={category.id.toString() + category.name}
                                  value={category.id}>{category.nameKor} [{category.name}] : {category.id}</option>
                        )
                      }) : (
                        <option value="0">카테고리가 없습니다</option>
                      )
                    }
                  </Input>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroupText>서브카테고리</InputGroupText>
                  <Input type={"select"} className={"bg-white"} value={"아이템 이름1"} onChange={subCategoryOnChangeInput}
                         value={subcategoryId}>
                    <option value={""}>서브카테고리를 선택해주세요</option>
                    {
                      subcategories.length !== 0 ? subcategories.map((subcategory, idx) => {
                        return (
                          <option key={subcategory.subcategoryId.toString() + subcategory.name}
                                  value={subcategory.subcategoryId}>{subcategory.nameKor} [{subcategory.name}]
                            : {subcategory.subcategoryId}</option>
                        )
                      }) : (
                        <option value="">없음</option>
                      )
                    }
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
              <Input className={"bg-white"} type={"date"} onChange={releasedAtDateOnChangeInput} value={releasedAtDate}
                     name={"releasedAtDate"}/>
              <Input className={"bg-white"} type={"time"} onChange={releasedAtTimeOnChangeInput}
                     value={releasedAtTime} name={"releasedAtTime"}/>
            </InputGroup>

            <Row className={"mb-3"}>
              <Col>
                <InputGroup>
                  <InputGroupText>생성일</InputGroupText>
                  <Input className={""} type={"date"} disabled={true}/>
                  <Input className={"bg-"} type={"time"} disabled={true}/>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroupText>수정일</InputGroupText>
                  <Input className={""} type={"date"} disabled={true}/>
                  <Input className={""} type={"time"} disabled={true}/>
                </InputGroup>
              </Col>
            </Row>

            <Row className={"mb-3"}>
              <Col>
                <InputGroup>
                  <InputGroupText>가격</InputGroupText>
                  <Input className={"bg-white"} type={"number"} min={0} onChange={priceOnChangeInput} value={price}/>
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroupText>수량</InputGroupText>
                  <Input className={"bg-white"} type={"number"} min={0} max={20000000} onChange={quantityOnChangeInput}
                         value={quantity}/>
                </InputGroup>
              </Col>
            </Row>

            <div>
              <Row xs={6} className={"mb-3"}>
                {
                  imageFiles && imageFiles.length !== 0 ? Array.from(imageFiles).map((file, idx) => {
                    return (
                      <Col className={"mb-3"} key={file.toString() + idx}>
                        <Button className={"btn-sm bg-secondary w-100"} type="button"
                                onClick={() => deleteImageOnClick(idx)}>삭제</Button>
                        <div className={"border"}>
                          <div className={"d-block d-flex justify-content-center"}>
                            <img style={{maxHeight: "100px", maxWidth: "100px"}} src={getImageFromFileObj(file)}
                                 alt={file.name}/>
                          </div>
                          <div className={"text-truncate"}>
                            <span className={"text-center"}>{file.name}</span>
                          </div>
                        </div>

                        <div className={"d-flex"}>
                          <Button className={"btn-sm bg-primary w-100"} type="button">←</Button>
                          <Button className={"btn-sm bg-primary w-100"} type="button">→</Button>
                        </div>

                      </Col>
                    )
                  }) : null
                }
              </Row>
            </div>

            <Label tag={"label"} for={"file"} className={"w-100"}>
              <InputGroup className={"mb-3"}>
                <InputGroupText>이미지 추가</InputGroupText>
                <div className={"form-control"}>
                  {imageFiles.length !== 0 ? imageFiles.map((elem, idx) => elem.name).join(", ") : null}
                </div>
              </InputGroup>
              <Input id={"file"} style={{border: "1px solid #ced4da border-r d-none"}} className={"rounded-2 form-control d-none"} type={"file"}
                     onChange={imagesOnChangeInput} value={null}
                     multiple={true} accept={".jpg, .jpeg, .png, .gif"} max-files={"15"} max-size={"3145728000"}/>
            </Label>


            <InputGroup className={"mb-3"}>
              <InputGroupText>썸네일 선택</InputGroupText>
              <Input style={{border: "1px solid #ced4da border-r"}} className={"rounded-2 form-control"} type={"file"}
                     onChange={thumbnailOnChangeInput} accept={".jpg, .jpeg, .png, .gif"} max-size={"1048576"}/>
            </InputGroup>

            <InputGroup className={"mb-3"}>
              <InputGroupText>상태</InputGroupText>
              <Input className={"bg-white"} onChange={statusOnChangeInput} value={status}/>
            </InputGroup>

            <InputGroup className={"mb-3"}>
              <InputGroupText>설명</InputGroupText>
              <Input className={"bg-white"} type={"textarea"} onChange={descriptionOnChangeInput} value={description}/>
            </InputGroup>
          </div>
          <div className={"buttons"}>
            <Button className={"w-100 bg-primary btn text-white"} type={"submit"}>추가</Button>
          </div>
        </Form>

      </Container>
    </>
  );
}

export default ItemAdd;