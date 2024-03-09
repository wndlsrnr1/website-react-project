import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Container, Input, InputGroup, InputGroupText} from "reactstrap";

const HomeItemCarouselDetail = () => {

  //variables
  const {carouselId} = useParams();
  const [loaded, setLoaded] = useState(false);
  const [carousel, setCarousel] = useState(null);
  const [item, setItem] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);


  //hooks

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }
    carouselRequest();
    setLoaded(true);
  }, [loaded]);

  useEffect(() => {
    if (!carousel?.id) {
      return;
    }
    itemRequest();
  }, [carousel]);

  //onClicks

  //onSubmits

  //onChanges

  //requests
  const carouselRequest = () => {
    fetch("/admin/home/carousels/" + carouselId)
      .then(resp => resp.json())
      .then(data => {
        console.log(data.data);
        setCarousel(data.data);
      });
  }

  const itemRequest = () => {
    fetch("/admin/items/" + carousel.itemId)
      .then(resp => resp.json())
      .then(data => {
        setItem(data.data[0]);
        const newArray = data.data.map((item, idx) => {
          const newObj = {};
          newObj.fileId = item.fileId;
          newObj.requestName = item.requestName;
          newObj.savedFileName = item.savedFileName;
          return newObj;
        });
        setImageList(newArray);
      });
  };

  return (
    <>
      <Container className={"w-50"}>
        <h2 className={"m-4 text-center"}>캐러셀 수정</h2>
        <div className={"d-flex justify-content-end mb-4"}>
          <Button>캐러셀 삭제</Button>
        </div>
        <div className={"mb-4"}>
          <InputGroup>
            <InputGroupText>ITEM ID</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={"아이템 정보"}/>
          </InputGroup>
          <InputGroup>
            <InputGroupText>한글 이름</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={"아이템 정보"}/>
          </InputGroup>
          <InputGroup>
            <InputGroupText>영어 이름</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={"아이템 정보"}/>
          </InputGroup>
          <InputGroup>
            <InputGroupText>서브카테고리</InputGroupText>
            <Input className={"bg-white"} disabled={true} value={"아이템 정보"}/>
          </InputGroup>
        </div>

        <div>
          <h4 className={"text-center m-4"}>사진 변경</h4>
          <div>
            <img src="" alt=""/>
          </div>
        </div>

        <div className={"d-flex justify-content-end"}>
          <Button className={"me-2"}>취소</Button>
          <Button className={"bg-primary"}>확인</Button>
        </div>
      </Container>
    </>
  )
}

export default HomeItemCarouselDetail;