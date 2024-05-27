import {
  Button,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  ListGroup,
  ListGroupItem,
  Row
} from "reactstrap";
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

const getImageFromFileObj = (fileObj) => {
  if (!fileObj) {
    return null;
  }
  return URL.createObjectURL(fileObj);
}

const ItemEdit = () => {

  //variables
  const {itemId} = useParams();
  const [item, setItem] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [itemNameKor, setItemNameKor] = useState("");
  const [itemName, setItemName] = useState("");
  const [releasedAt, setReleasedAt] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [images, setImages] = useState([]);
  const [imagesForUpdate, setImagesForUpdate] = useState([]);
  const [imagesForDelete, setImagesForDelete] = useState([]);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imageFilesForUpdate, setImageFilesForUpdate] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  //hooks
  const isSelected = (imageId) => {
    if (!imageId) {
      return false;
    }
    return imageId === selectedThumbnail;
  }

  //requests
  const requestItem = () => {
    const path = "/admin/items/" + itemId;
    fetch(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        const {
          subcategory,
          quantity,
          name,
          nameKor,
          releasedAt,
          updatedAt,
          createdAt,
          price,
          status,
          description,
          attachmentIdOfThumbnail
        } = data.data[0];
        setItem(data.data[0]);
        setItemName(name);
        setItemNameKor(nameKor)
        setReleasedAt(releasedAt);
        setUpdatedAt(updatedAt);
        setCreatedAt(createdAt);
        setItemPrice(price);
        setItemStatus(status);
        setItemDescription(description);
        setSelectedSubcategory(subcategory);
        setItemQuantity(quantity);
        console.log(subcategory);
        if (data?.data) {
          const imagesUpdated = [];
          for (const datum of data.data) {
            const imageObj = {};
            imageObj.fileId = datum.fileId;
            imageObj.requestName = datum.requestName;
            imageObj.savedFileName = datum.savedFileName;
            imagesUpdated.push(imageObj);
          }
          setImages(imagesUpdated);
        }
      });
  };

  const itemThumbnailEditRequest = (url) => {
    const formData = new FormData();
    formData.append("imageId", selectedThumbnail);
    fetch(url, {method: "post", body: formData})
      .then(resp => resp.json())
      .then(data => {
        console.log("data", data);
      });
  }

  const requestThumbNail = () => {
    fetch("/admin/items/thumbnail/" + itemId, {method: "get"})
      .then(resp => {
        if (!resp.ok) {
          return;
        }
        return resp.json();
      })
      .then(data => {
        if (!data?.data?.attachmentId) {
          return;
        }
        setSelectedThumbnail(data.data.attachmentId);
      });
  }

  const requestCategories = () => {
    fetch("/admin/categories", {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        setCategories(data.data.content);
      });
  }

  const requestSubcategoriesByCategoryId = (categoryId) => {
    fetch(`/admin/subcategories?categoryId=${categoryId}`, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        setSubcategories(data.data.content);
      });
  }

  const requestCategory = (subcategoryId) => {
    const path = "/admin/category?" + "subcategoryId" + "=" + subcategoryId;
    fetch(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        setSelectedCategory(data.data);
      });
  };

  const itemEditRequest = (url) => {
    const formData = new FormData();
    formData.append("releasedAt", getSpaceDateTime(releasedAt));
    formData.append("subcategoryId", selectedSubcategory.id);
    formData.append("nameKor", itemNameKor);
    formData.append("name", itemName);
    // formData.append("releasedAt", releasedAt);
    formData.append("price", itemPrice);
    formData.append("quantity", itemQuantity);
    formData.append("images", imagesForUpdate);
    // formData.append("imageFiles", imageFiles);
    for (const file of imageFilesForUpdate) {
      formData.append("imageFiles", file);
    }

    formData.append("status", itemStatus);
    formData.append("description", itemDescription);
    // formData.append("itemId", itemId)
    // for (let i = 0; i < imagesForDelete.length; i++) {
    //   const imagesForDeleteElement = imagesForDelete[i];
    //   formData.append("imagesForDelete["+i+"].fileId", imagesForDeleteElement.fileId)
    //   formData.append("imagesForDelete["+i+"].requestName", imagesForDeleteElement.requestName)
    //   formData.append("imagesForDelete["+i+"].savedFileName", imagesForDeleteElement.savedFileName)
    // }
    const imageIdsForDelete = imagesForDelete.map((images, idx) => images.fileId);
    formData.append("imagesForDelete[]", imageIdsForDelete);
    formData.append("carouselAttachmentId", selectedThumbnail);

    fetch(url, {method: "post", body: formData})
      .then((resp) => {
        if (!resp.ok) {
          console.error("파일 수정 실패");
          return;
        }
        window.location.href = "/admin/items/" + itemId;
      });
  };

  const fileOnItemRemoveRequest = (url, images, imageFiles) => {

  };

  //useEffects 1차 로드
  useEffect(() => {
    if (loaded) {
      return;
    }
    requestThumbNail();
    requestItem();
    requestCategories();
    setLoaded(true);
  }, [loaded]);

  //2차 로드
  useEffect(() => {
    if (!selectedSubcategory) {
      return;
    }
    console.log(selectedSubcategory);
    requestCategory(selectedSubcategory.id);
  }, [selectedSubcategory]);

  //category 따라서 바꾸기
  useEffect(() => {
    if (!selectedCategory) {
      return;
    }
    requestSubcategoriesByCategoryId(selectedCategory.id);
  }, [selectedCategory])

  useEffect(() => {
    console.log("sad", imagesForUpdate);
    console.dir(imageFilesForUpdate);
    console.log(imagesForDelete)
  }, [imagesForUpdate, imagesForDelete])


  //onClicks
  const deleteImagesOnClick = (imageId) => {
    let imagesUpdate = images.filter((image, idx) => parseInt(image.fileId) !== parseInt(imageId));
    let imageForDeleteElem = images.filter((image) => parseInt(image.fileId) === parseInt(imageId))[0];

    setImagesForDelete([...imagesForDelete, imageForDeleteElem]);
    setImages(imagesUpdate);
    if (imageId === selectedThumbnail) {
      setSelectedThumbnail(null);
    }
  }

  const selectThumbNail = (imageId) => {
    if (imageId === selectedThumbnail) {
      setSelectedThumbnail(null);
      return;
    }
    setSelectedThumbnail(imageId);
  }

  //onSubmits
  const editOnSubmit = (event) => {
    event.preventDefault();
    itemEditRequest("/admin/items/edit/" + itemId);
    itemThumbnailEditRequest("/admin/items/thumbnail/edit/" + itemId);
    // fileOnItemRemoveRequest("/admin/items/image/remove", imagesForDelete);
  }

  //onChanges
  const imagesOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    const files = event.target.files;
    const maxFiles = event.target.getAttribute("max-files");
    const imagesList = [];
    for (const file of event.target.files) {
      imagesList.push(file.name);
    }
    if (maxFiles && (files.length <= parseInt(maxFiles))) {
      setImagesForUpdate(imagesList);
    } else {
      setImagesForUpdate([]);
      return;
    }

    const maxSize = event.target.getAttribute("max-size");
    if (maxSize) {
      let fileSize = 0;
      Array.from(files).forEach(file => fileSize += file.size);
      if (fileSize > maxSize) {
        setImagesForUpdate([]);
        return;
      }
    }
    setImageFilesForUpdate(files);
    setImagesForUpdate(imagesList);
  }

  const categoryOnChangeInput = (event) => {
    const categoryId = event.target.value;
    const categoryObj = categories.filter((category, idx) => category.id == categoryId)[0];
    setSelectedCategory(categoryObj);
  }

  const subCategoryOnChangeInput = (event) => {
    const subcategoryId = event.target.value;
    const subcategoryObj = subcategories.filter((elem, idx) => elem.subcategoryId == subcategoryId)[0];
    subcategoryObj.id = subcategoryObj.subcategoryId;
    setSelectedSubcategory(subcategoryObj);
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
                <Input className={"bg-white"} type={"select"} value={selectedCategory ? selectedCategory.id : null}
                       onChange={categoryOnChangeInput}>
                  {categories && categories.length !== 0 ? categories.map((category, idx) => {
                    return (
                      <option key={category.id.toString() + idx}
                              value={category.id}>{category.nameKor} ({category.name})</option>
                    )
                  }) : null}
                </Input>
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroupText>서브카테고리</InputGroupText>
                <Input className={"bg-white"} type={"select"}
                       value={selectedSubcategory ? selectedSubcategory.id : null}
                       onChange={subCategoryOnChangeInput}>
                  {
                    subcategories.length !== 0 ? subcategories.map((subcategory, idx) => {
                      return (
                        <option key={subcategory.toString() + idx}
                                value={subcategory.subcategoryId}>{subcategory.nameKor} ({subcategory.name})</option>
                      )
                    }) : null
                  }
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
            <Input className={"bg-white"} type={"datetime-local"} value={releasedAt}
                   onChange={releasedAtOnChangeInput}/>
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
                <Input className={"bg-white"} value={itemQuantity} onChange={itemQuantityOnChange} type={"number"}
                       min={0} max={20000000}/>
              </InputGroup>
            </Col>
          </Row>
          <h3>이미지 삭제</h3>
          <div className={"pb-3"}>
            {
              images && images.length !== 0 ? images.map((image, idx) => {
                return (
                  <div className={"d-inline-block me-3"} key={image.toString() + idx}>
                    <div className={"border d-flex flex-column"}>
                      <div className={"d-inline-block"}>
                        <img style={{maxHeight: "100px"}} src={"/attachment/" + image.fileId} alt={image.requestName}/>
                      </div>
                      <span className={"text-center"}>{image.requestName}</span>
                      <Button className={"btn-sm bg-primary w-100"} type="button" fileId={image.fileId}
                              onClick={() => deleteImagesOnClick(image.fileId)}>삭제</Button>
                    </div>
                  </div>
                )
              }) : null
            }
            <hr/>
            {
              imageFilesForUpdate ? Array.from(imageFilesForUpdate).map((file, idx) => {
                return (
                  <div className={"d-inline-block me-3"} key={file.toString() + idx}>
                    <div className={"border d-flex flex-column"}>
                      <div className={"d-inline-block"}>
                        <img style={{maxHeight: "100px"}} src={getImageFromFileObj(file)} alt={file.name}/>
                      </div>
                      <span className={"text-center"}>{file.name}</span>
                    </div>
                  </div>
                )
              }) : null
            }
          </div>
          <h3>이미지 추가</h3>
          <Label tag={"label"} for={"file"} className={"w-100"}>
            <InputGroup className={"mb-3"}>
              <InputGroupText>파일 추가</InputGroupText>
              <div className={"form-control"}>
                {images.map((elem, idx) => elem.requestName).join(", ")}
                {imagesForUpdate.length !== 0 ? ", " : null}
                {imagesForUpdate.map((elem, idx) => elem).join(", ")}
              </div>
            </InputGroup>
            <Input className={"d-none"} type={"file"} style={{width: "0px"}}
                   onChange={imagesOnChangeInput}
                   multiple={true} accept={".jpg, .jpeg, .png, .gif"} max-files={"3"} max-size={"31457280"}
                   id={"file"}/>
          </Label>

          <h3 >썸네일 변경</h3>
          <ListGroup className={"m-2"} horizontal={true} >
            {
              images ? images.map((image, idx) => {
                return (
                  <ListGroupItem className={"d-inline-block me-3"} key={image.toString() + idx} onClick={() => selectThumbNail(image.fileId)} active={isSelected(image.fileId)}>
                    <div className={"border d-flex flex-column"}>
                      <div className={"d-inline-block"}>
                        <img style={{maxHeight: "100px"}} src={"/attachment/" + image.fileId} alt={image.requestName}/>
                      </div>
                      <span className={"text-center"}>{image.requestName}</span>
                    </div>
                  </ListGroupItem>
                )
              }) : null
            }
          </ListGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>상태</InputGroupText>
            <Input className={"bg-white"} value={itemStatus} onChange={itemStatusOnChange}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>설명</InputGroupText>
            <Input className={"bg-white"} value={itemDescription} onChange={itemDescriptionOnChange}
                   type={"textarea"}/>
          </InputGroup>
        </div>

        <div className={"buttons"}>
          <Link className={"w-100 bg-secondary btn text-white mb-3"} to={"/admin/items"}>취소</Link>
          <Button className={"w-100 bg-primary btn text-white"}>확인</Button>
        </div>
      </Form>

    </Container>
  );
}

export default ItemEdit;