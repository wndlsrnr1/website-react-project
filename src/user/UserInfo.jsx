import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody, ModalFooter,
  ModalHeader
} from "reactstrap";
import {useEffect, useState} from "react";
import {parseDate} from "../utils/timeUtils";
import {fetchWithAuth} from "../utils/fetchUtils";

const UserInfo = (props) => {
  //variables
  /*
   private Long id;
    private String email;
    private String address;
    private String password;
    private SocialType socialType;
   */
  const socialMapping = {
    "KAKAO": "카카오",
    "NONE": "일반 회원가입",
  }

  const {userInfo} = props;
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState(userInfo.username);
  const [email, setEmail] = useState(userInfo.email);
  const [createdAt, setCreatedAt] = useState(userInfo.createdAt);
  const [address, setAddress] = useState(userInfo.address);
  const [socialType, setSocialType] = useState(userInfo.socialType);

  //hooks

  const toggleModal = () => {
    setModal(!modal);
  }

  //useEffects
  useEffect(() => {

  }, []);

  //onClicks

  const saveChangeOnclick = () => {
    toggleModal();
    requestEditUsername();
  };

  const cancelChangeOnclick = () => {
    toggleModal();
  }

  //onSubmits

  const changeNameOnSubmit = (event) => {
    event.preventDefault();
    toggleModal();
  }

  //onChanges

  const nameOnchange = (event) => {
    event.preventDefault();
    const name = event.target.value;
    setUsername(name);
  }

  //requests
  const requestEditUsername = () => {
    fetchWithAuth("/users/me", {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "address": address,
        "username": username,
      }, )
    }).then(resp => {
      if (resp.ok) {
        resp.json().then(data => {
          setAddress(data.body.address);
          setUsername(data.body.username);
        });
      } else {
        //todo: 에러 처리하기
        console.error("에러처리하기");
      }
    });
  }

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h4">회원 정보</CardTitle>
        <Form onSubmit={changeNameOnSubmit}>
          <FormGroup>
            <Label for="name">이름</Label>
            <Input type="text" name="name" id="name" placeholder="이름을 입력하세요" defaultValue="John Doe"
                   onChange={nameOnchange} value={username}/>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <div className={"form-control bg-dark bg-opacity-25"}>{email}</div>
          </FormGroup>
          <FormGroup>
            <Label for="createdAt">가입일</Label>
            <div className={"form-control bg-dark bg-opacity-25"}>{parseDate(createdAt)}</div>
          </FormGroup>
          <FormGroup>
            <Label for="socialType">회원가입 방식</Label>
            <div className={"form-control bg-dark bg-opacity-25"}>{socialMapping[socialType]}</div>
          </FormGroup>
          <Button type={"submit"} color="primary">변경</Button>
        </Form>
      </CardBody>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalBody>
          <div><span>정보를 업데이트 하시겠습니까?</span></div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={saveChangeOnclick}>네</Button>
          <Button onClick={cancelChangeOnclick}>아니오</Button>
        </ModalFooter>
      </Modal>
    </Card>
  )
}

export default UserInfo;