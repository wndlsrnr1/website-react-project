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
import {fetchWithAuth} from "../../utils/fetchUtils";

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
  // const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [itemNameKor, setItemNameKor] = useState("");
  const [itemName, setItemName] = useState("");
  const [releasedAt, setReleasedAt] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [saleRate, setSaleRate] = useState("");
  const [brand, setBrand] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [madeIn, setMadeIn] = useState("");


  const [itemQuantity, setItemQuantity] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  const [sequenceList, setSequenceList] = useState([]);
  //img

  //element: {type: ... , content: ... seq...., };
  const [imageList, setImageList] = useState([]);
  const [defaultThumbnail, setDefaultThumbnail] = useState(false);

  //hooks

  const onClickRight = (imageTotalFileList, idx) => {
    if (imageTotalFileList.length - 1 === idx) {
      return;
    }

    const imgFileNew = [];

    for (let i = 0; i < imageTotalFileList.length; i++) {
      const imageFile = imageTotalFileList[i];
      if (i === idx) {
        const imageFileAfter = imageTotalFileList[i + 1];
        imgFileNew.push(imageFileAfter);
        imgFileNew.push(imageFile);
        continue;
      }
      if (i === idx + 1) {
        continue;
      }
      imgFileNew.push(imageFile);
    }

    setImageList(imgFileNew);
  }

  const onClickLeft = (imageTotalFileList, idx) => {
    if (idx === 0) {
      return;
    }

    const imgFileNew = [];

    for (let i = 0; i < imageTotalFileList.length; i++) {
      const imgFile = imageTotalFileList[i];
      if (i === idx - 1) {
        continue;
      }
      if (i === idx) {
        imgFileNew.push(imgFile);
        imgFileNew.push(imageTotalFileList[i - 1]);
        continue;
      }

      imgFileNew.push(imgFile);
    }

    setImageList(imgFileNew);
  }

  const selectThumbnail = (imgList, type, imageIdx) => {
    const newArr = imgList.map((img, idx) => {
      img["thumbnail"] = (imageIdx === idx);
      return img;
    });
    setImageList(newArr);
  };

  const isSelected = (thumbnail) => {
    return thumbnail;
  };

  //requests
  const requestItemInfo = () => {
    const path = "/admin/items/info?itemId=" + itemId;
    fetchWithAuth(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        setBrand(data.data.brand);
        setSaleRate(data.data.saleRate);
        setManufacturer(data.data.manufacturer);
        setMadeIn(data.data.madeIn);
      });
  }

  const requestFileSequence = () => {
    const path = "/admin/items/sequence/" + itemId;
    fetchWithAuth(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        setSequenceList(data.data);
      });
  }

  const requestItem = () => {
    const path = "/admin/items/" + itemId;
    fetchWithAuth(path, {method: "get"})
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
        if (data?.data) {
          //이 형태로 다 바꾸어서 넣기ㅎㅎ
          const mappedArray = data.data.map((datum, idx) => {
            const img = {};
            img["type"] = "update";
            img["thumbnail"] = false;
            const content = {};
            content.fileId = datum.fileId;
            content.requestName = datum.requestName;
            content.savedFileName = datum.savedFileName;

            img["content"] = content;
            return img;
          });
          setImageList(mappedArray);
        }


      });

  };



  // const itemThumbnailEditRequest = (url) => {
  //   const formData = new FormData();
  //   formData.append("imageId", selectedThumbnail);
  //   fetch(url, {method: "post", body: formData})
  //     .then(resp => resp.json())
  //     .then(data => {
  //       console.log("data", data);
  //     });
  // }

  // const itemThumbnailAddRequest = (url) => {
  //   const formData = new FormData();
  //   formData.append("imageId", selectedThumbnail);
  //   fetch(url, {method: "post", body: formData})
  //     .then(resp => resp.json())
  //     .then(data => {
  //       console.log("data", data);
  //     });
  // }

  const requestThumbNail = () => {
    fetchWithAuth("/admin/items/thumbnail/" + itemId, {method: "get"})
      .then(resp => {
        if (!resp.ok) {
          return;
        }
        return resp.json();
      })
      .then(data => {
        if (!data?.data) {
          return;
        }
        let newArr = imageList.map((img, idx) => {
          if (img.type === "update" && img.content.fileId === data.data.fileId) {
            img["thumbnail"] = true;
          }
          return img;
        });
        setImageList(newArr);
      });
  }

  const requestCategories = () => {
    fetchWithAuth("/admin/categories", {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        setCategories(data.data.content);
      });
  }

  const requestSubcategoriesByCategoryId = (categoryId) => {
    fetchWithAuth(`/admin/subcategories?categoryId=${categoryId}`, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        setSubcategories(data.data.content);
      });
  }

  const requestCategory = (subcategoryId) => {
    const path = "/admin/category?" + "subcategoryId" + "=" + subcategoryId;
    fetchWithAuth(path, {method: "get"})
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
    formData.append("status", itemStatus);
    formData.append("description", itemDescription);

    formData.append("saleRate", saleRate);
    formData.append("brand", brand);
    formData.append("manufacturer", manufacturer);
    formData.append("madeIn", madeIn);
    const imageIdsForDelete = imageList
      .filter((img, idx) => (img.type === "delete"))
      .map((img, idx) => img.content.fileId);
    const imageIdsForUpdate = imageList
      .filter((img, idx) => (img.type === "update"))
      .map((img, idx) => img.content.fileId);
    const imageFilesForUpload = imageList
      .filter((img, idx) => (img.type === "upload"))
      .map((img, idx) => img.content);

    const seqListForUpload = imageList
      .map((img, idx) => {
        if (img.type === "upload") {
          return idx + 1;
        }
        return -1;
      })
      .filter((seq, idx) => seq !== -1);

    const seqListForUpdate = imageList
      .map((img, idx) => {
        if (img.type === "update") {
          return idx + 1;
        }
        return -1;
      })
      .filter((seq, idx) => seq !== -1);

    formData.append("imageIdsForDelete", imageIdsForDelete);


    formData.append("imageIdsForUpdate", imageIdsForUpdate);
    formData.append("seqListForUpdate", seqListForUpdate);
    formData.append("seqListForUpload", seqListForUpload);
    for (let i = 0; i < imageFilesForUpload.length; i++) {

      const imageFile = imageFilesForUpload[i];
      formData.append("imageFilesForUpload", imageFile);
    }

    const imageForThumbnail = imageList.filter((img, idx) => img.thumbnail)[0];
    /*
    private Long imageIdForThumbnail;
    private Integer imageSeqForThumbnail;
     */
    if (imageForThumbnail) {
      if (imageForThumbnail.type === "update") {
        formData.append("imageIdForThumbnail", imageForThumbnail.content.fileId);
      } else if (imageForThumbnail.type === "upload") {
        const uploadList = imageList.filter((img) => img.type === "upload");
        let findIndex = -1;
        for (let i = 0; i < uploadList.length; i++) {
          const uploadFile = uploadList[i];
          if (uploadFile.thumbnail) {
            findIndex = i;
            break;
          }
        }
        formData.append("imageIndexForThumbnail", findIndex);
      }
    }





    // formData.append("itemId", itemId)
    // for (let i = 0; i < imagesForDelete.length; i++) {
    //   const imagesForDeleteElement = imagesForDelete[i];
    //   formData.append("imagesForDelete["+i+"].fileId", imagesForDeleteElement.fileId)
    //   formData.append("imagesForDelete["+i+"].requestName", imagesForDeleteElement.requestName)
    //   formData.append("imagesForDelete["+i+"].savedFileName", imagesForDeleteElement.savedFileName)
    // }
    // const imageIdsForDelete = imagesForDelete.map((images, idx) => images.fileId);


    // formData.append("images", imagesForUpdate);
    // for (const file of imageFilesAdded) {
    //   formData.append("imageFiles", file);
    // }
    // formData.append("imagesForDelete[]", imageIdsForDelete);
    // formData.append("carouselAttachmentId", selectedThumbnail);

    fetchWithAuth(url, {method: "post", body: formData})
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
    requestItem();
    requestCategories();
    requestItemInfo();
    requestFileSequence();
    setLoaded(true);
  }, [loaded]);

  //2차 로드
  useEffect(() => {
    if (!selectedSubcategory) {
      return;
    }
    requestCategory(selectedSubcategory.id);
  }, [selectedSubcategory]);

  useEffect(() => {
    if (imageList.length !== 0 && !defaultThumbnail && sequenceList.length !== 0) {
      let sort = imageList.sort((img1, img2) => {
        return sequenceList[img1.content.fileId] - sequenceList[img2.content.fileId];
      });
      setImageList(sort);
      requestThumbNail();
      setDefaultThumbnail(true);
    }
  }, [imageList, defaultThumbnail, sequenceList])

  //category 따라서 바꾸기
  useEffect(() => {
    if (!selectedCategory) {
      return;
    }
    requestSubcategoriesByCategoryId(selectedCategory.id);
  }, [selectedCategory])


  //onClicks
  const deleteImagesOnClick = (type, idxParam) => {
    if (type === "update") {
      const newImageList = imageList.map((img, idx) => {
        if (img.type === "update" && idx === idxParam) {
          img["type"] = "delete";
          img["thumbnail"] = false;
        }
        return img;
      });
      setImageList(newImageList);
    } else if (type === "upload") {
      const newImageList = imageList.filter((img, idx) => idx !== idxParam);
      setImageList(newImageList);
    }
  }

  //onSubmits -> edit request에 합치기
  const editOnSubmit = (event) => {
    event.preventDefault();
    itemEditRequest("/admin/items/edit/" + itemId);

    // if (thumbnailImageIdBefore) {
    //   itemThumbnailEditRequest("/admin/items/thumbnail/edit/" + itemId);
    // } else {
    //   itemThumbnailAddRequest("/admin/items/thumbnail/add/" + itemId);
    // }
    // fileOnItemRemoveRequest("/admin/items/image/remove", imagesForDelete);
  }

  //onChanges
  const imagesOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    const files = event.target.files;
    const maxFiles = event.target.getAttribute("max-files");
    const maxSize = event.target.getAttribute("max-size");
    let fileSize = 0;
    Array.from(files).forEach(file => fileSize += file.size);
    if (maxFiles && (files.length <= parseInt(maxFiles)) && maxSize >= fileSize) {
      let newArr1 = imageList.filter((img, idx) => img.type !== "upload");
      let newArr2 = Array.from(files).map((file, idx) => {
        return {type: "upload", content: file};
      });
      setImageList(newArr1.concat(newArr2));
    }
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

  const saleRateOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setSaleRate(value);
  }

  const brandOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setBrand(value);
  }

  const manufacturerOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setManufacturer(value);
  }

  const madeInOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setMadeIn(value);
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
                                value={subcategory.subcategorgyId}>{subcategory.nameKor} ({subcategory.name})</option>
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
          <h3>이미지 추가 / 삭제 / 썸네일 변경</h3>
          <Row xs={6} className={"pb-3"}>
            {
              imageList && imageList.length !== 0 && imageList.filter((elem) => elem.type !== "delete").length !== 0 ?
                imageList.map((image, idx) => {
                  if (image.type === "update") {
                    const img = image.content;
                    return (
                      <Col className={image.type === "update" ? "mb-3" : "mb-3 opacity-25"}
                           key={image.toString() + idx}>
                        <Button className={"btn-sm bg-secondary w-100"} type="button"
                                onClick={() => deleteImagesOnClick(image.type, idx)}>삭제</Button>
                        <div className={isSelected(image.thumbnail) ? "mb-3 bg-primary" : "mb-3"}
                             onClick={() => selectThumbnail(imageList, image.type, idx)}>
                          <div className={"d-block d-flex justify-content-center"}>
                            <img style={{maxHeight: "100px", maxWidth: "100px"}} src={"/attachment/" + img.fileId}
                                 alt={img.requestName}/>
                          </div>
                          <div className={"text-truncate"}>
                            <span className={"text-center"}>{img.requestName}</span>
                          </div>
                        </div>
                        <div className={"d-flex"}>
                          <Button className={"btn-sm bg-primary w-100"} type="button"
                                  onClick={() => onClickLeft(imageList, idx)}>←</Button>
                          <Button className={"btn-sm bg-primary w-100"} type="button"
                                  onClick={() => onClickRight(imageList, idx)}>→</Button>
                        </div>
                      </Col>
                    );
                  } else if (image.type === "upload") {
                    const file = image.content;
                    return (
                      <Col className={"mb-3"} key={image.toString() + idx}>
                        <Button className={"btn-sm bg-secondary w-100"} type="button"
                                onClick={() => deleteImagesOnClick(image.type, idx)}>삭제</Button>
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
                          <Button className={"btn-sm bg-primary w-100"} type="button"
                                  onClick={() => onClickLeft(imageList, idx)}>←</Button>
                          <Button className={"btn-sm bg-primary w-100"} type="button"
                                  onClick={() => onClickRight(imageList, idx)}>→</Button>
                        </div>
                      </Col>
                    );
                  } else if (image.type === "delete") {
                    const img = image.content;
                    return (
                      <Col className={image.type === "update" ? "mb-3" : "mb-3 opacity-25"}
                           key={image.toString() + idx}>
                        <Button className={"btn-sm bg-secondary w-100"} type="button">삭제</Button>
                        <div className={isSelected(image.thumbnail) ? "mb-3 bg-primary" : "mb-3"}>
                          <div className={"d-block d-flex justify-content-center"}>
                            <img style={{maxHeight: "100px", maxWidth: "100px"}} src={"/attachment/" + img.fileId}
                                 alt={img.requestName}/>
                          </div>
                          <div className={"text-truncate"}>
                            <span className={"text-center"}>{img.requestName}</span>
                          </div>
                        </div>
                        <div className={"d-flex"}>
                          <Button className={"btn-sm bg-primary w-100"} type="button" active={false}>←</Button>
                          <Button className={"btn-sm bg-primary w-100"} type="button" active={false}>→</Button>
                        </div>
                      </Col>
                    );
                  }
                }) : null
            }
            <hr/>
          </Row>
          <Label tag={"label"} for={"file"} className={"w-100"}>
            <InputGroup className={"mb-3"}>
              <InputGroupText>파일 추가</InputGroupText>
            </InputGroup>
            <Input className={"d-none"} type={"file"} style={{width: "0px"}}
                   onChange={imagesOnChangeInput}
                   multiple={true} accept={".jpg, .jpeg, .png, .gif"} max-files={"10"} max-size={90 * 1024 * 1024}
                   id={"file"}/>
          </Label>


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


        <InputGroup className={"mb-3"}>
          <InputGroupText>할인율</InputGroupText>
          <Input type={"number"} className={"bg-white"} value={saleRate} onChange={saleRateOnChangeInput}/>
        </InputGroup>

        <InputGroup className={"mb-3"}>
          <InputGroupText>브랜드</InputGroupText>
          <Input className={"bg-white"} value={brand} onChange={brandOnChangeInput}/>
        </InputGroup>

        <InputGroup className={"mb-3"}>
          <InputGroupText>생산자</InputGroupText>
          <Input className={"bg-white"} value={manufacturer} onChange={manufacturerOnChangeInput}/>
        </InputGroup>

        <InputGroup className={"mb-3"}>
          <InputGroupText>제조국</InputGroupText>
          <Input className={"bg-white"} value={madeIn} onChange={madeInOnChangeInput}/>
        </InputGroup>

        <div className={"buttons"}>
          <Link className={"w-100 bg-secondary btn text-white mb-3"} to={"/admin/items"}>취소</Link>
          <Button className={"w-100 bg-primary btn text-white"}>확인</Button>
        </div>
      </Form>


    </Container>
  );
}

export default ItemEdit;