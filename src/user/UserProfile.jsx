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
  Table, ButtonGroup,
} from 'reactstrap';
import UserInfo from "./UserInfo";
import PasswordManagement from "./PasswordManagement";
import AddressManagement from "./AddressManagement";
import OrderHistory from "./OrderHistory";
import CartList from "./CartList";
import ReviewManagement from "./ReviewManagement";
import {checkLogin, getLoginType, handleDelete, SOCIAL_TYPE} from "../utils/LoginUtils";
import {fetchWithAuth} from "../utils/fetchUtils";
import CommentManagement from "./CommentManagement";
import CancelMembership from "./CancelMembership";


const UserProfile = () => {

  //variables
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState(null);

  //hooks

  //useEffects
  useEffect(() => {
    if (!checkLogin(sessionStorage)) {
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

  // render
  const renderCancelPage = () => {
    switch (getLoginType(sessionStorage)) {
      case SOCIAL_TYPE.KAKAO: {
        return (
          <ButtonGroup>
            <Button tag={"a"} className={"bg-danger"} onClick={handleDelete}>탈퇴하기</Button>
          </ButtonGroup>
        );
      }
      case SOCIAL_TYPE.NONE: {
        return (<CancelMembership/>);
      }
      default: {
        return null;
      }
    }
  }


  return (
    <Container className="my-5">
      <h2 className={"text-center mb-4"}>회원 정보 관리</h2>
      <Row>
        <Col md={{size: 8, offset: 2}}>
          {/* Personal Information Section */}
          {userInfo !== null ? <UserInfo userInfo={userInfo}/> : null}
          {/* Password Management Section */}
          {userInfo !== null && userInfo.socialType === "NONE" ? <PasswordManagement userInfo={userInfo}/> : null}

          {/* Address Management Section */}
          {userInfo !== null ? <AddressManagement userInfo={userInfo}/> : null}

          {/* Order History Section */}
          {userInfo !== null ? <OrderHistory userInfo={userInfo}/> : null}

          {/* Wishlist or Saved List Section */}
          {userInfo !== null ? <CartList userInfo={userInfo}/> : null}

          {/* Review Management Section */}
          <ReviewManagement/>

          {/* Question Management Section */}
          <CommentManagement/>

          {renderCancelPage()}
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;