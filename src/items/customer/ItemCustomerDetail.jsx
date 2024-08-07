import {Button, ButtonGroup, Col, Container, Row} from "reactstrap";
import {useEffect, useState} from "react";
import ItemBasicInfo from "./ItemBasicInfo";
import ProductReviews from "./ProductReviews";
import ProductInquiry from "./ProductInquiry";
import Header from "../../common/Header";
import Categories from "../../common/Categories";
import ItemImagesForItemInfo from "./ItemImagesForItemInfo";
import {useParams} from "react-router-dom";
import {getDiscountedPrice} from "../../utils/priceUtils";

const ItemCustomerDetail = () => {

  //variables
  const pageValueConst = {detailInfo: "detail", basicInfo: "basic", reviews: "reviews", inquiry: "inquiry"}

  const {itemId} = useParams();
  const [loaded, setLoaded] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [pageValue, setPageValue] = useState(pageValueConst.detailInfo);

  /*
   itemId 813,
        name test4,
        nameKor 테스트4,
        price 13,
        quantity 8,
        status good,
        description good,
        releasedAt 2024-06-20T180832,
        views 1000,
        salesRate 10,
        brand null,
        manufacturer null,
        madeIn null
   */
  //줄줄이 varialbles 정의하기..
  const [name, setName] = useState(null);
  const [nameKor, setNameKor] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [state, setState] = useState(null);
  const [description, setDescription] = useState(null);
  const [releasedAt, setReleasedAt] = useState(null);
  const [saleRate, setSaleRate] = useState(null);
  const [brand, setBrand] = useState(null);
  const [manufacturer, setManufacturer] = useState(null);
  const [madeIn, setMadeIn] = useState(null);


  //hooks


  //useEffects

  useEffect(() => {
    console.log("itemId", itemId)
    if (loaded) {
      return;
    }

    requestThumbnailImage();
    requestItemBasic();

    setLoaded(true);
  }, [])

  //onClicks

  const onclickPageButton = (pageValueParam) => {
    setPageValue(pageValueParam);
  }

  //onSubmits

  //onChanges

  //requests
  const requestThumbnailImage = () => {
    fetch("/item/thumbnail?itemId=" + itemId, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        setThumbnailImage(data.data);
      });
  }

  const requestItemBasic = () => {
    fetch("/item/basic/" + itemId, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        setName(data.data.name);
        setNameKor(data.data.nameKor);
        setPrice(parseInt(data.data.price));
        setQuantity(parseInt(data.data.quantity));
        setState(data.data.state);
        setDescription(data.data.description);
        setReleasedAt(data.data.releasedAt);
        setSaleRate(parseInt(data.data.salesRate));
        setBrand(data.data.brand);
        setManufacturer(data.data.manufacturer);
        setMadeIn(data.data.madeIn);
      });
  }




  //hooks for html
  const getAddedPage = (pageValue) => {
    switch (pageValue) {
      case pageValueConst.detailInfo:
        return <ItemImagesForItemInfo itemId={itemId}/>;
      case pageValueConst.basicInfo:
        return <ItemBasicInfo/>;
      case pageValueConst.reviews:
        return <ProductReviews/>;
      case pageValueConst.inquiry:
        return <ProductInquiry/>;
      default:
        return null;
    }
  }

  return (
    <>
      <Header/>
      <Categories/>
      <Container>
        <div><h4 className={"text-center"}>상품상세</h4></div>
        <hr/>
        <div className={"d-flex justify-content-center mb-3"}>
          <img src={thumbnailImage ? ("/attachment/" + thumbnailImage.fileId) : null} alt={"아이템 사진"}/>
        </div>

        <div>
          <div><span style={{fontWeight: "bold"}} className={"text-lg-start"}>{nameKor}</span></div>
          {
            saleRate && saleRate > 0 ? (
              <div><span
                className={"text-decoration-line-through"}>{price}</span> → <span>{getDiscountedPrice(price, saleRate)}</span>
              </div>
            ) : (
              <div>{price}</div>
            )
          }
          <hr/>
          <div>
            <Row>
              <Col style={{fontWeight: "bold"}}>제조사</Col>
              <Col>{manufacturer}</Col>
            </Row>
            <Row>
              <Col style={{fontWeight: "bold"}}>원산지</Col>
              <Col>{madeIn}</Col>
            </Row>
          </div>
          <hr/>
          <ButtonGroup className={"d-flex justify-content-center"}>
            <Button className={"me-2 bg-primary"}>공유하기</Button>
            <Button className={"bg-primary"}>찜하기</Button>
          </ButtonGroup>
          <hr/>
          <ButtonGroup className={"d-flex mb-4"}>
            <Button className={"me-2"} page-value={pageValueConst.detailInfo} onClick={() => onclickPageButton(pageValueConst.detailInfo)}>상세정보</Button>
            <Button className={"me-2"} page-value={pageValueConst.basicInfo} onClick={() => onclickPageButton(pageValueConst.basicInfo)}>기본정보</Button>
            <Button className={"me-2"} page-value={pageValueConst.reviews} onClick={() => onclickPageButton(pageValueConst.reviews)}>상품후기</Button>
            <Button page-value={pageValueConst.inquiry} onClick={() => onclickPageButton(pageValueConst.inquiry)}>상품문의</Button>
          </ButtonGroup>
        </div>
        {
          getAddedPage(pageValue)
        }
        <ButtonGroup className={"d-flex justify-content-center"}>
          <Button className={"me-2 bg-primary"}>장바구니</Button>
          <Button className={"bg-primary"}>바로구매</Button>
        </ButtonGroup>
      </Container>
    </>
  );
}

export default ItemCustomerDetail;