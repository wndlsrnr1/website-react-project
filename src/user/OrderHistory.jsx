import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody, ModalFooter,
  Table
} from "reactstrap";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "../utils/fetchUtils";
import data from "bootstrap/js/src/dom/data";
import {parseDate} from "../utils/timeUtils";

const OrderHistory = (props) => {
  //variables
  const [loaded, setLoaded] = useState(false);
  const [purchasesList, setPurchasesList] = useState([]);
  const [nextSearchAfter, setNextSearchAfter] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [size, setSize] = useState(10);
  const [sortType, setSortType] = useState("RECENT");
  const [isWithReview, setIsWithReview] = useState(false);
  const [orderStatusCondition, setOrderStatusCondition] = useState(null);
  const [reviewToggle, setReviewToggle] = useState(false);
  const [reviewItem, setReviewItem] = useState(null);

  const [star, setStar] = useState(5);
  const [review, setReview] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [reviewIdForDelete, setReviewIdForDelete] = useState(null);

  const statusObj = {
    "NEW": "주문",
    "PROCESSING": "처리중",
    "SHIPPED": "배송중",
    "DELIVERED": "배송완료",
    "CANCELLED": "주문취소",
  }
  //hooks
  const getStarImage = (idx, star) => {
    if (idx < star) {
      return "url('/images/star2.png') 0px 0px / 30px 30px no-repeat"
    } else {
      return "url('/images/star.png') 0px 0px / 30px 30px no-repeat"
    }
  }

  //useEffects
  useEffect(() => {
    if (loaded) return;
    setLoaded(true);
    requestPurchases();
  }, []);

  useEffect(() => {
    if (confirmModal) {
      return;
    }
    setReviewToggle(false);
  }, [confirmModal]);

  useEffect(() => {
    if (reviewToggle) {
      return;
    }
    setReview("");
    setStar(5);
    setOrderId(null);
  }, [reviewToggle]);

  //onClicks
  const showMoreOnclick = (event) => {
    event.preventDefault();
    requestPurchases();
  }

  const confirmDeleteReviewOnclick = () => {
    setDeleteModal(false);
    requestDeleteReview();
  }

  const setStarOnClick = (idx) => {
    setStar(idx + 1);
  }

  const reviewDeleteOnclick = (id) => {
    setReviewIdForDelete(id);
    setDeleteModal(true);
  }

  //onSubmits
  const reviewOnSubmit = (event) => {
    event.preventDefault();
    requestReviewSubmit();
  }

  //onChanges
  const reviewOnChangeInput = (event) => {
    const value = event.target.value;
    setReview(value);
  }

  const reviewShowOnclick = (orderId) => {
    setOrderId(orderId);
    setReviewToggle(true);
  }

  //requests
  const requestPurchases = () => {
    let path = "/purchases";
    path += "?size=" + size;
    path += "&sortType=" + sortType;
    if (nextSearchAfter !== null) {
      path += "&nextSearchAfter=" + nextSearchAfter;
    }
    if (orderStatusCondition !== null) {
      path += "&orderStatus=" + orderStatusCondition;
    }
    fetchWithAuth(path, {method: "GET"})
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => {
            setPurchasesList([...purchasesList, ...data.body.items]);
            setNextSearchAfter(data.body.nextSearchAfter);
          });
        } else {
          //todo: error처리하기
        }
      });
  };

  const requestPurchasesFirst = (reset) => {
    let path = "/purchases";
    path += "?size=" + size;
    path += "&sortType=" + sortType;
    fetchWithAuth(path, {method: "GET"})
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => {
            setPurchasesList([...data.body.items]);
            setNextSearchAfter(data.body.nextSearchAfter);
          });
        } else {
          //todo: error처리하기
        }
      });
  };

  const requestReviewSubmit = () => {
    fetchWithAuth("/reviews", {
      method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "star": star,
        "purchasesId": orderId,
        "content": review
      }),
    }).then(resp => {
      if (resp.ok) {
        resp.json().then(data => {
          setResultMessage("리뷰를 작성했습니다");
          requestPurchasesFirst();
        });
      } else {
        setResultMessage("리뷰 작성에 실패했습니다");
      }
      setConfirmModal(true);
    });
  }

  const requestDeleteReview = () => {
    fetchWithAuth("/reviews/" + reviewIdForDelete, {method: "DELETE"})
      .then(resp => {
        if (resp.ok) {
          requestPurchasesFirst();
          setConfirmModal(true);
          setResultMessage("삭제되었습니다.");
        } else {
          setConfirmModal(true);
          setResultMessage("삭제 실패");
        }
      });
  };

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h4" className={"text-center"}>주문 기록</CardTitle>
        <Table responsive>
          <thead>
          <tr>
            <th>#</th>
            <th className={"w-25"}>주문번호</th>
            <th>이름</th>
            <th>상태</th>
            <th>개수</th>
            <th>주문일</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {
            purchasesList.length !== 0 ?
              purchasesList.map((purchases, idx) => {
                return (
                  <tr key={purchases.orderNumber + idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{purchases.orderNumber}</td>
                    <td><a href={"/items/detail/" + purchases.itemId}>{purchases.itemNameKor}</a></td>
                    {/*<td>{purchases.imageIdForThumbnail}</td>*/}
                    <td>{statusObj[purchases.status]}</td>
                    <td>{purchases.totalAmount}</td>
                    <td>{parseDate(purchases.orderDate)}</td>
                    <td>{
                      purchases?.reviewId ?
                        <Button onClick={() => reviewDeleteOnclick(purchases.reviewId)}>후기삭제</Button> :
                        <Button className={"bg-primary"} onClick={() => reviewShowOnclick(purchases.id)}>후기작성</Button>
                    }</td>
                  </tr>
                )
              }) :
              (
                <tr>
                  <td>주문목록이 없습니다.</td>
                </tr>
              )
          }
          </tbody>
        </Table>
        {nextSearchAfter !== null ?
          <Button className={"bg-primary w-100"} onClick={showMoreOnclick}>더보기</Button> : null}
      </CardBody>
      <CardBody className={reviewToggle ? "d-block" : "d-none"}>
        <Form onSubmit={reviewOnSubmit}>
          <FormGroup>
            <div className={"mb-1"}>
              {
                new Array(5).fill(0).map((elem, idx) => {
                  return (
                    <a key={"star" + idx} type={"button"} style={{
                      background: getStarImage(idx, star), backgroundSize: "30px 30px",
                      width: "35px",
                      height: "35px",
                      border: "0px"
                    }}
                       className={"bg-white p-1"}
                       onClick={() => setStarOnClick(idx)}
                    />
                  )
                })
              }
            </div>

            <Label for="review">리뷰</Label>
            <Input id={"star"} className={"d-none"} value={star} readOnly={true}/>
            <Input id={"review"} type={"textarea"} placeholder={"후기를 입력해주세요"} value={review}
                   onChange={reviewOnChangeInput}/>
            <div>

            </div>
            <div className={"d-flex justify-content-end mt-3"}>
              <Button type={"submit"} className={"bg-primary me-3"}>작성</Button>
              <Button type={"button"} onClick={() => setReviewToggle(false)}>취소</Button>
            </div>
          </FormGroup>
        </Form>
      </CardBody>
      <Modal isOpen={confirmModal}>
        <ModalBody>
          <div><span>{resultMessage}</span></div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setConfirmModal(false)}>확인</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={deleteModal}>
        <ModalBody>
          <div><span>삭제하시겠습니까?</span></div>
          <ModalFooter>
            <Button onClick={confirmDeleteReviewOnclick}/>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </Card>
  );
}
export default OrderHistory;