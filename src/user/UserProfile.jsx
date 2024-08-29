import {useContext, useEffect} from "react";
// <Button onClick={handleDelete}>카카오 회원 탈퇴하기</Button>
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

const UserProfile = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col md={{size: 8, offset: 2}}>
          {/* Personal Information Section */}
          <UserInfo/>
          {/* Password Management Section */}
          <PasswordManagement/>

          {/* Address Management Section */}
          <AddressManagement/>

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