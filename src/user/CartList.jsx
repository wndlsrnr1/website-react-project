import {Button, Card, CardBody, CardTitle, Col, Row} from "reactstrap";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "../utils/fetchUtils";

const CartList = (props) => {

    //variables

    const [loaded, setLoaded] = useState(false);
    const [bookmarkItemList, setBookmarkItemList] = useState([]);
    const [itemMap, setItemMap] = useState({});
    const [thumbnailMap, setThumbnailMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [itemData, setItemData] = useState([]);

    //hooks

    //useEffects

    useEffect(() => {
      if (loaded) {
        return;
      }
      getBookmarkItemThumbnail();
      setLoaded(true);
    }, []);


  //onClicks
  const removeBookmarkOnclick = (bookmarkId) => {
    removeBookmarkRequest(bookmarkId);
  }

  //onSubmits

  //onChanges

  //requests

    const removeBookmarkRequest = (itemId) => {
      fetchWithAuth("/items/" + itemId + "/bookmarks", {method: "DELETE"})
        .then(resp => {
          if (resp.ok) {
            bookmarkRequest();
          } else {
            console.error("에러처리하기");
          }
        });
    }

    const getBookmarkItemThumbnail = async () => {
      const bookmarkResponse = await fetchWithAuth("/bookmarks", {method: "GET"}, true);
      const itemResponse = await Promise.all(bookmarkResponse.body.map((bookmark, idx) => fetchWithAuth("/item/basic/" + bookmark.itemId, {}, true)));
      const thumbnailResponse = await Promise.all(itemResponse.map((item, idx) => fetchWithAuth("/item/thumbnail/?itemId=" + item.data.itemId, {}, true)));
      console.log("bookmarkResponse", bookmarkResponse);
      setBookmarkItemList(bookmarkResponse.body);
      console.log("itemResponse", itemResponse);
      const itemMapObj = {};
      itemResponse.forEach((itemResp, idx) => {
        const item = itemResp.data;
        itemMapObj[item.itemId] = {"name": item.name, "nameKor": item.nameKor};
      });
      console.log("itemMapObj", itemMapObj);
      setItemMap(itemMapObj);

      const thumbnailMapObj = {};
      console.log("thumbnailResponse", thumbnailResponse);
      thumbnailResponse.forEach((resp, idx) => {
        const thumbnail = resp.data;
        thumbnailMapObj[thumbnail.itemId] = thumbnail.fileId;
      });
      setThumbnailMap(thumbnailMapObj);
      console.log("thumbnailMapObj", thumbnailMapObj);
    }

    const bookmarkRequest = async () => {
      const bookmarkResponse = await fetchWithAuth("/bookmarks", {method: "GET"}, false);
      if (bookmarkResponse.ok) {
        bookmarkResponse.json().then(data => {
          setBookmarkItemList(data.body);
        });
      } else {
        console.error("에러처리");
      }
    }


    return (
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h4" className={"text-center"}>장바구니</CardTitle>
          <ul className="list-unstyled">
            {
              bookmarkItemList.length !== 0 ?
                bookmarkItemList.map((bookmark, idx) => {
                  return (
                    <li key={"a" + bookmark.id * idx}>
                      <Row className={"border pb-2 pt-2"}>
                        <Col xs="2">
                          <img className={"w-100"} src={"/attachment/" + thumbnailMap[bookmark.itemId]} alt="상품이미지"/>
                        </Col>
                        <Col xs="8" className={"d-flex align-items-center"}>
                          <a className={"d-block w-100 text-center"} href={"/items/detail/" + bookmark.itemId}>
                            {itemMap[bookmark.itemId].nameKor}
                          </a>
                        </Col>
                        <Col xs="2" className={"d-flex align-items-center justify-content-end"}>
                          <Button color="danger" size="sm" onClick={() => removeBookmarkOnclick(bookmark.itemId)}>삭제</Button>
                        </Col>
                      </Row>
                    </li>
                  )
                })
                : (
                  <li>
                    <Row>
                      <Col xs="2"/>
                      <Col xs="6">
                        장바구니 목록이 없습니다
                      </Col>
                      <Col xs="4"/>
                    </Row>
                  </li>
                )
            }

            {/* Add more wishlist items here */}
          </ul>
        </CardBody>
      </Card>
    );
  }
;

export default CartList;
