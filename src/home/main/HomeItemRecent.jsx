import {Container, Row} from "reactstrap";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "../../utils/fetchUtils";

const HomeItemRecent = () => {

  //variables
  const [itemsRecent, setItemsRecent] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //hooks
  const parseDate = (date) => new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'numeric', day: 'numeric'
  });

  const isDiscountRatio = (itemObject) => {
    const discountRatio = itemObject?.discountRatio;
    console.log("discountRatio", discountRatio)
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
    fetchWithAuth("/home/main/item/recent", {
      method: "get"
    })
      .then(resp => resp.json())
      .then(data => {
        setItemsRecent(data);
      });
  }

  return (
    <Container>
      <h4>새로운 출시</h4>
      <Row xs={5}>
        {
          itemsRecent.length !== 0 ? itemsRecent.map((itemRecent, idx) => {
              return (
                <div className={"d-flex flex-column align-items-center border pt-3 pb-3"}
                     key={itemRecent.toString() + idx}>
                  <a href={"/item/detail/" + itemRecent.id}>
                    <img src={"/attachment/" + itemRecent.fileId} style={{height: "200px"}}/>
                  </a>
                  <div>
                    <span>이름: </span>
                    <span>{itemRecent.name}</span>
                  </div>
                  {
                    isDiscountRatio(itemRecent) ?
                      (
                        <div>
                          <span>가격: </span>
                          <span
                            className={"text-decoration-line-through"}>{itemRecent.price}</span>
                          <span>  -> </span>
                          <span>{getDiscountedPrice(itemRecent.price, itemRecent.discountRatio)}</span>
                        </div>
                      ) : (
                        <div>
                          <span>가격: </span>
                          <span>{itemRecent.price}</span>
                        </div>
                      )
                  }
                  <div>
                    <span>출시일: </span>
                    <span>{parseDate(itemRecent.releasedAt)}</span>
                  </div>
                </div>
              )
            })
            :
            null
        }
      </Row>
    </Container>

  );
}

export default HomeItemRecent;