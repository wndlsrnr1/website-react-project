import {useEffect, useState} from "react";
import {Col, Row} from "reactstrap";
import {fetchWithAuth} from "../../utils/fetchUtils";

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
    fetchWithAuth("/attachment/items/" + itemId)
      .then(resp => resp.json())
      .then(data => {
        setItemImages(data.data);
      });
  }

  return (
    <div className={"d-flex flex-column align-items-center"}>
        {
          itemImages.map((img, idx) => {
            if (img.isThumbnail) {
              return;
            }
            return (
              <div className={"w-50"}>
                <img className={"w-100"} src={"/attachment/" + img.imageId} alt={img.savedName}/>
              </div>
            );
          })
        }
    </div>
  );
}

export default ItemImagesForItemInfo;