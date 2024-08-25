import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Badge, Button, Container, Input, InputGroup, InputGroupText, ListGroup, ListGroupItem, Row} from "reactstrap";
import {fetchWithAuth} from "../../../../utils/fetchUtils";

const HomeItemCarouselDetail = () => {

  //variables
  const {carouselId} = useParams();
  const [loaded, setLoaded] = useState(false);
  const [carousel, setCarousel] = useState(null);
  const [item, setItem] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  //hooks
  const getDateTime = (localDateTimeFormat) => {
    return localDateTimeFormat.toString().replace("T", " ");
  }

  const toBackWard = () => {
    window.history.back();
  }

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }
    carouselRequest();
    setLoaded(true);
  }, [loaded]);

  useEffect(() => {
    if (!carousel) {
      return;
    }
    itemRequest();
  }, [carousel]);

  //onClicks
  const toggleImageOnClick = (imageId) => {
    if (imageId === selectedImage) {
      setSelectedImage(null);
      return;
    }
    setSelectedImage(imageId);
  }

  const deleteRequestOnClick = (executableFunction) => {
    executableFunction();
  }

  //onSubmits

  //onChanges

  //requests
  const carouselRequest = () => {
    fetchWithAuth("/admin/home/carousels/" + carouselId)
      .then(resp => resp.json())
      .then(data => {
        console.log(data.data);
        console.log("carouselData", data.data);
        setCarousel(data.data);
        setSelectedImage(data.data.attachmentId);
      });
  }

  const itemRequest = () => {
    fetchWithAuth("/admin/items/" + carousel.itemId)
      .then(resp => resp.json())
      .then(data => {
        console.log("itemData", data.data[0]);
        setItem(data.data[0]);
        const newArray = data.data.map((item, idx) => {
          const newObj = {};
          newObj.fileId = item.fileId;
          newObj.requestName = item.requestName;
          newObj.savedFileName = item.savedFileName;
          return newObj;
        });
        console.log("imageArray", newArray);
        setImageList(newArray);
      });
  };

  const updateCarouselRequest = () => {
    console.log("JSON.stringify(selectedImage)", JSON.stringify(selectedImage));
    fetchWithAuth(
      "/admin/home/carousels/update/attachment/" + carouselId,
      {method: "post", headers: {"Content-Type": "application/json"}, body: JSON.stringify(selectedImage)}
    ).then(resp => {
      if (resp.ok) {
        window.location.href = "/admin/home/items/carousel/" + carouselId;
        return;
      }
      console.error("has error");
    });
  }

  const deleteCarouselRequest = () => {
    fetchWithAuth("/admin/home/carousels/delete/" + carouselId, {method: "delete"})
      .then(resp => {
        if (resp.ok) {
          window.history.back();
          return;
        }
        console.log("has error");
      });
  }

  return (
    <>
      <Container className={"w-50"}>
        <h2 className={"m-4 text-center"}>캐러셀 수정</h2>
        <div className={"d-flex justify-content-end mb-4"}>
          <Button onClick={() => deleteRequestOnClick(deleteCarouselRequest)}>캐러셀 삭제</Button>
        </div>
        <div className={"mb-4"}>
          <InputGroup>
            <InputGroupText>ITEM ID</InputGroupText>
            <Input className={"bg-white"} disabled={true} name={"itemId"} value={item ? item.id : ""}/>
          </InputGroup>
          <InputGroup>
            <InputGroupText>한글 이름</InputGroupText>
            <Input className={"bg-white"} disabled={true} name={"nameKor"} value={item ? item.nameKor : ""}/>
          </InputGroup>
          <InputGroup>
            <InputGroupText>영어 이름</InputGroupText>
            <Input className={"bg-white"} disabled={true} name={"name"} value={item ? item.name : ""}/>
          </InputGroup>
          <InputGroup>
            <InputGroupText>서브카테고리</InputGroupText>
            <Input className={"bg-white"} disabled={true} name={"subcategory"}
                   value={item ? item.subcategory.nameKor + " (" + item.subcategory.name + ")" : ""}/>
          </InputGroup>
          <InputGroup>
            <InputGroupText>생성일</InputGroupText>
            <Input name={"createdAt"} disabled={true} type={"datetime-local"} value={item ? item.createdAt : ""}/>
            <InputGroupText>수정일</InputGroupText>
            <Input name={"updatedAt"} disabled={true} type={"datetime-local"} value={item ? item.updatedAt : ""}/>
          </InputGroup>
        </div>

        <div className={"pb-3"}>
          <h4 className={"text-center m-4"}>사진 변경</h4>
          <ListGroup horizontal={true}>
            {
              imageList.map((image, idx) => {
                return (
                  <ListGroupItem className={"d-flex justify-content-between align-items-center"}
                                 key={image.fileId.toString() + image.requestName.toString()}
                                 active={image.fileId === selectedImage}
                                 onClick={() => toggleImageOnClick(image.fileId)}>
                    <div>
                      <div>
                        <img style={{maxHeight: "100px"}} src={"/attachment/" + image.fileId} alt={image.requestName}/>
                      </div>
                      <div>
                        <span>{image.requestName}</span>
                      </div>
                    </div>
                  </ListGroupItem>
                )
              })
            }
          </ListGroup>
        </div>

        <div className={"d-flex justify-content-end"}>
          <Button className={"me-2"} onClick={() => toBackWard()}>취소</Button>
          <Button className={"bg-primary"} onClick={() => updateCarouselRequest()}>확인</Button>
        </div>
      </Container>
    </>
  )
}

export default HomeItemCarouselDetail;