import {Link, useParams} from "react-router-dom";
import {Button, Col, Container, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Row} from "reactstrap";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "../../utils/fetchUtils";

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
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [selectedThumbNail, setSelectedThumbNail] = useState(null);
  const [brand, setBrand] = useState("");
  const [saleRate, setSaleRate] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [madeIn, setMadeIn] = useState("");
  const [sequenceList, setSequenceList] = useState([]);

  //requests
  const requestItem = () => {
    const path = "/admin/items/" + itemId;
    fetchWithAuth(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        const {
          category,
          releasedAt,
          updatedAt,
          createdAt,
          price,
          status,
          description,
          attachmentIdOfThumbnail
        } = data.data[0];
        setItem(data.data[0]);
        setCategory(category);
        setReleasedAt(releasedAt);
        setUpdatedAt(updatedAt);
        setCreatedAt(createdAt);
        setPrice(price);
        setStatus(status);
        setDescription(description);

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

  const requestCategory = (subcategoryId) => {
    const path = "/admin/category?" + "subcategoryId" + "=" + subcategoryId;
    fetchWithAuth(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        setCategory(data.data);
      });
  };

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
        setSelectedThumbNail(parseInt(data.data.fileId));
      });
  }

  const deleteRequest = (url) => {
    fetchWithAuth(url, {method: "delete"})
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
    requestThumbNail();
    requestItemInfo();
    requestFileSequence();

    setLoaded(true);
  }, [loaded]);


  //fileList와 sequence가 준비됐을때 실행하기
  useEffect(() => {
    if (images.length !== 0 && sequenceList.length !== 0) {
      const sortedImageList = images.sort((img1, img2) => sequenceList[img1.fileId] - sequenceList[img2.fileId]);
      setImages(sortedImageList);
    }
  }, [sequenceList, images]);

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

    const thumbNailImageObj = images.filter((img, idx) => {
      return parseInt(img.fileId) === selectedThumbNail
    })[0];
    setThumbnailImage(thumbNailImageObj);
  }, [images, selectedThumbNail]);

  useEffect(() => {
  }, [images]);

  useEffect(() => {
  }, [thumbnailImage])

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
          <h3>이미지</h3>
          <div className={"pb-3"}>
            {
              images && images.length !== 0 ? images.map((image, idx) => {
                return (
                  <div className={"d-inline-block me-3"} key={image.requestName.toString() + idx.toString()}>
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
          <h3>썸네일</h3>
          {
            thumbnailImage ? (
              <div className={"d-inline-block me-3"}>
                <div className={"border d-flex flex-column"}>
                  <div className={"d-inline-block"}>
                    <img style={{maxHeight: "100px"}} src={"/attachment/" + thumbnailImage.fileId}
                         alt={thumbnailImage.requestName}/>
                  </div>
                  <span className={"text-center"}>{thumbnailImage.requestName}</span>
                  {/*<Button className={"btn-sm bg-primary w-100"} type="button" fileId={image.fileId}>삭제</Button>*/}
                </div>
              </div>
            ) : null
          }

          <InputGroup className={"mb-3"}>
            <InputGroupText>ImageFiles</InputGroupText>
            <Input className={"bg-white"} disabled={true}
                   value={images.map((elem, idx) => elem.requestName).join(", ")}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>상태</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={item ? item.status : null}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>설명</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={item ? item.description : null} type={"textarea"}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>할인율</InputGroupText>
            <Input type={"number"} className={"bg-white"} disabled={true} value={saleRate}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>브랜드</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={brand}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>생산자</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={manufacturer}/>
          </InputGroup>

          <InputGroup className={"mb-3"}>
            <InputGroupText>제조국</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={brand}/>
          </InputGroup>
        </div>
        <div className={"buttons"}>
          <Button className={"w-100 mb-3"} onClick={deleteOnClick}>삭제</Button>
          <Link className={"w-100 bg-primary btn text-white"} to={"/admin/items/edit/" + itemId}>수정</Link>
        </div>
      </Container>
    </>
  );
}

export default ItemDetail;