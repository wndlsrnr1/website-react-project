import {useContext, useEffect, useState} from "react";

// src/UserProfile.js
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
} from 'reactstrap';
import UserInfo from "./UserInfo";
import PasswordManagement from "./PasswordManagement";
import AddressManagement from "./AddressManagement";
import OrderHistory from "./OrderHistory";
import CartList from "./CarList";
import ReviewAndCommentManagement from "./ReviewAndCommentManagement";
import {checkLogin, handleDelete} from "../utils/LoginUtils";
import {fetchWithAuth} from "../utils/fetchUtils";

const UserProfile = () => {

  //variables
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState(null);

  //hooks

  //useEffects
  useEffect(() => {
    if (!checkLogin(localStorage)) {
      window.history.back();
    }

    if (loaded) {
      return;
    }
    requestUserInfo();
    setLoaded(true);
  }, []);

  //onClicks

  //onSubmits

  //onChanges

  //requests
  const requestUserInfo = () => {
    fetchWithAuth("/users", {method: "get"})
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => {
            setUserInfo(data.body);
          });
        } else {
          console.error("에러 처리하기");
        }
      });
  }


  return (
    <Container className="my-5">
      <h2 className={"text-center mb-4"}>회원 정보 관리</h2>
      <Button onClick={handleDelete}>카카오 회원 탈퇴하기</Button>
      <Row>
        <Col md={{size: 8, offset: 2}}>
          {/* Personal Information Section */}
          {userInfo !== null ? <UserInfo userInfo={userInfo}/> : null}
          {/* Password Management Section */}
          {userInfo !== null && userInfo.socialType === "NONE" ? <PasswordManagement userInfo={userInfo}/> : null}

          {/* Address Management Section */}
          {userInfo !== null  ? <AddressManagement userInfo={userInfo}/> : null}

          {/* Order History Section */}
          <OrderHistory/>

          {/* Wishlist or Saved List Section */}
          <CartList/>

          {/* Review and Question Management Section */}
          <ReviewAndCommentManagement/>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;