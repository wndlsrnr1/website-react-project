import {Container, Row} from "reactstrap";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "../../utils/fetchUtils";

const HomeItemDiscount = () => {

  //variables
  const [itemsDiscount, setItemsDiscount] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //hooks
  const parseDate = (date) => new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'numeric', day: 'numeric'
  });

  const isDiscountRatio = (itemObject) => {

    const discountRatio = itemObject?.discountRatio;
    if (!discountRatio) {
      return false;
    }

    const discountRatioPared = parseInt(discountRatio);

    if (discountRatioPared <= 0) {
      return false;
    }

    return true;
  }

  const getDiscountedPrice = (priceParam, discountRatioParam) => {
    const discountRatio = parseInt(discountRatioParam);
    const price = parseInt(priceParam);
    return price - Math.ceil(discountRatio * price / 100);
  }

  //useEffects

  useEffect(() => {
    if (loaded) {
      return;
    }

    recentItemRequest();

  }, [loaded])

  //onClicks

  //onSubmits

  //onChanges

  //requests

  const recentItemRequest = () => {
    fetchWithAuth("/home/main/item/special-sale", {
      method: "get"
    })
      .then(resp => resp.json())
      .then(data => {
        setItemsDiscount(data);
      });
  }

  return (
    <Container>
      <h4>초특가</h4>
      <Row xs={5}>
        {
          itemsDiscount.length !== 0 ? itemsDiscount.map((itemDiscount, idx) => {
              return (
                <div className={"d-flex flex-column align-items-center border pt-3 pb-3"}
                     key={itemDiscount.toString() + idx}>
                  <a href={"/items/detail/"+itemDiscount.id}>
                    <img src={"/attachment/" + itemDiscount.fileId} style={{height: "200px"}}/>
                  </a>
                  <div>
                    <span>이름: </span>
                    <span>{itemDiscount.name}</span>
                  </div>
                  {
                    isDiscountRatio(itemDiscount) ?
                      (
                        <div>
                          <span>가격: </span>
                          <span
                            className={"text-decoration-line-through"}>{itemDiscount.price}</span>
                          <span>  -> </span>
                          <span>{getDiscountedPrice(itemDiscount.price, itemDiscount.discountRatio)}</span>
                        </div>
                      ) : (
                        <div>
                          <span>가격: </span>
                          <span>{itemDiscount.price}</span>
                        </div>
                      )
                  }
                  <div>
                    <span>출시일: </span>
                    <span>{parseDate(itemDiscount.releasedAt)}</span>
                  </div>
                </div>
              )
            })
            :
            null
        }
      </Row>
    </Container>
  )
}

export default HomeItemDiscount;