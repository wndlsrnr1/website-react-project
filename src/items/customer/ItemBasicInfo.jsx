import {getDiscountedPrice} from "../../utils/priceUtils";
import {Col, Row} from "reactstrap";

const ItemBasicInfo = (props) => {

  const {name, nameKor, price, state, description, relatedAt, saleRate, brand, manufacturer, madeIn} = props;

  return (
    <div className={"content"}>
      <div><span style={{fontWeight:"bold"}}>기본정보</span></div>
      <hr/>
      <div>
        <Row>
          <Col><span style={{fontWeight:"bold"}} >정가</span></Col>
          <Col><span>{price}</span></Col>
        </Row>
        <hr/>
        <Row>
          <Col><span style={{fontWeight:"bold"}} >판매가</span></Col>
          <Col><span>{getDiscountedPrice(price, saleRate)}</span></Col>
        </Row>
        <hr/>
        <Row>
          <Col><span style={{fontWeight:"bold"}} >브랜드</span></Col>
          <Col><span>{brand}</span></Col>
        </Row>
        <hr/>
        <Row>
          <Col><span style={{fontWeight:"bold"}} >제조사</span></Col>
          <Col><span>{manufacturer}</span></Col>
        </Row>
        <hr/>
        <Row>
          <Col><span style={{fontWeight:"bold"}} >원산지</span></Col>
          <Col><span>{madeIn}</span></Col>
        </Row>
        <hr/>
        <Row>
          <Col><span style={{fontWeight:"bold"}} >출시일</span></Col>
          <Col><span>{relatedAt}</span></Col>
        </Row>
        <hr/>

      </div>
    </div>
  )
}

export default ItemBasicInfo;