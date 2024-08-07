import {useEffect, useState} from "react";
import {Col, Row} from "reactstrap";

const ItemImagesForItemInfo = (props) => {
  const {itemId} = props;

  //variables
  const [loaded, setLoaded] = useState(false);
  const [itemImages, setItemImages] = useState([]);

  //hooks

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }

    itemImageRequest();

    setLoaded(true);
  }, [])

  //onClicks

  //onSubmits

  //onChanges

  //requests
  const itemImageRequest = () => {
    fetch("/attachment/item/" + itemId)
      .then(resp => resp.json())
      .then(data => {
        setItemImages(data.data);
      });
  }

  return (
    <div >
      <Row>
        {
          itemImages.map((img, idx) => {
            if (img.isThumbnail) {
              return;
            }
            return (
              <Col className={"w-75"}>
                <img className={"img-fluid"} src={"/attachment/" + img.imageId} alt={img.savedName}/>
              </Col>
            );
          })
        }
      </Row>

    </div>
  );
}

export default ItemImagesForItemInfo;