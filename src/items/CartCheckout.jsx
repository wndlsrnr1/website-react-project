import {useEffect, useState} from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardImg,
  Col,
  Container,
  Form, FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
  Row
} from "reactstrap";
import {useParams} from "react-router-dom";
import Header from "../common/Header";
import {fetchWithAuth} from "../utils/fetchUtils";
import {array} from "prop-types";

const CartCheckout = (props) => {

  //variables
  const [totalAmount, setTotalAmount] = useState(1);
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitResponse, setSubmitResponse] = useState(false);
  const {itemId} = useParams();
  const [item, setItem] = useState(null);
  const [itemImage, setItemImage] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState(null);

  //hooks


  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }
    setLoaded(true);
    fetchItemInfo();
    fetchItemThumbnail();
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (submitted && submitResponse) {
      setTimeout(() => {
        window.location.href = "/users/profile";
      }, 1000)
    }
  }, [submitted, submitResponse]);


  //onClicks

  //onSubmits

  //onChanges

  //requests
  const fetchItemInfo = async () => {
    const itemResponse = await fetchWithAuth(`/items/basic/${itemId}`, {method: "GET"}, true);
    setItem(itemResponse.data);
  }

  //? 없네
  const fetchItemThumbnail = async () => {
    const attachmentResponse = await fetchWithAuth(`/items/${itemId}/attachments/thumbnail`, {method: "GET"}, true);
    setItemImage(attachmentResponse.body.fileId);
  }

  const fetchUserInfo = async () => {
    const userInfoResponse = await fetchWithAuth(`/users`, {method: "GET"}, true);
    setAddress(userInfoResponse.body.address);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock submitting form data
    const purchaseData = {
      "item": {id: itemId},
      "totalAmount": totalAmount,
      "address": address,
    };

    const purchaseResponse = fetchWithAuth(`/items/${itemId}/purchases`, {
      method: "POST",
      body: JSON.stringify(purchaseData),
      headers: {"Content-Type": "application/json"}
    }, false);

    purchaseResponse.then(resp => {
      if (resp.status === 409) {
        setErrors({"duplicated": "결제에 문제가 있습니다. 다시 시도해주세요."});
        setSubmitted(true);
        setSubmitResponse(false)
        return;
      }
      if (!resp.ok) {
        resp.json().then((data) => {
          setErrors(data.body);
          setSubmitted(true);
          setSubmitResponse(false)
          console.log(data);
        });
        return;
      }
      setSubmitted(true);
      setSubmitResponse(true)
    });
  }

    // Here, you would typically send purchaseData to your backend API


    return (
      <Container>
        <Header/>
        <Row className="justify-content-center mt-5">
          <Col md={8}>
            <Card className="shadow-lg p-4 rounded">
              <h2 className="text-center mb-4">주문서</h2>
              {itemImage && (
                <CardImg variant="top" src={`/attachment/${itemImage}`} className="mb-4 rounded"/>
              )}

              <Form onSubmit={handleSubmit}>

                <Form controlId="itemId" className="mb-3">
                  <Label className="fw-bold">상품명</Label>
                  <p>{item?.nameKor || 'Loading...'}</p>
                </Form>
                <Form controlId="itemId" className="mb-3">
                  <p>{item?.name || 'Loading...'}</p>
                </Form>

                <FormGroup controlId="totalAmount" className="mb-3">
                  <Label className="fw-bold">수량</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={totalAmount}
                    onChange={(e) => {
                      let value = Math.max(1, Math.min(10, e.target.value)); // Restrict value between 1 and 10
                      setTotalAmount(value);
                    }}
                    required
                  />
                  {errors?.totalAmount && <Alert color={"danger"}>{errors?.totalAmount}</Alert>}
                </FormGroup>

                <FormGroup controlId="address" className="mb-3">
                  <Label className="fw-bold">베송지</Label>
                  <Input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your shipping address"
                    required
                  />
                  {errors?.address && <Alert color={"danger"}>{errors?.address}</Alert>}
                </FormGroup>

                <div className="mb-3">
                  {item && item.price && (
                    <>
                      <h5 className="d-inline">총 가격: </h5>
                      <span className={"text-decoration-line-through"}>{item.price * totalAmount}원</span>
                    </>
                  )}
                </div>
                <div className="mb-4">
                  {item && item.price && (
                    <>
                      <h5 className="d-inline">할인가: </h5>
                      <span>
                      {Math.floor((item.price * totalAmount * (100 - item.salesRate)) / 100)}원
                    </span>
                    </>
                  )}
                </div>
                {submitted && !submitResponse && (<Alert color={"danger"}>주문중 문제가 생겼습니다</Alert>)}
                {errors?.duplicated && <Alert color={"danger"}>{errors?.duplicated}</Alert>}
                {submitted && submitResponse && (<Alert variant="success">주문을 완료하였습니다</Alert>)}
                <Button type="submit" className="w-100 py-2 bg-primary">
                  주문
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    );


  }
  export default CartCheckout;