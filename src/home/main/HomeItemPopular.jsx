import {Container, Row} from "reactstrap";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "../../utils/fetchUtils";

const HomeItemPopular = () => {

  //variables
  const [itemsPopular, setItemsPopular] = useState([]);
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
    fetchWithAuth("/home/main/item/popular", {
      method: "get"
    })
      .then(resp => resp.json())
      .then(data => {
        setItemsPopular(data);
      });
  }

  return (
    <Container>
      <h4>인기제품</h4>
      <Row xs={5}>
        {
          itemsPopular.length !== 0 ? itemsPopular.map((itemPopular, idx) => {
              return (
                <div className={"d-flex flex-column align-items-center border pt-3 pb-3"}
                     key={itemPopular.toString() + idx}>
                  <a href={"/item/detail/" + itemPopular.id}>
                    <img src={"/attachment/" + itemPopular.fileId} style={{height: "200px"}}/>
                  </a>
                  <div>
                    <span>이름: </span>
                    <span>{itemPopular.name}</span>
                  </div>
                  {
                    isDiscountRatio(itemPopular) ?
                      (
                        <div>
                          <span>가격: </span>
                          <span
                            className={"text-decoration-line-through"}>{itemPopular.price}</span>
                          <span>  -> </span>
                          <span>{getDiscountedPrice(itemPopular.price, itemPopular.discountRatio)}</span>
                        </div>
                      ) : (
                        <div>
                          <span>가격: </span>
                          <span>{itemPopular.price}</span>
                        </div>
                      )
                  }
                  <div>
                    <span>출시일: </span>
                    <span>{parseDate(itemPopular.releasedAt)}</span>
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

export default HomeItemPopular;