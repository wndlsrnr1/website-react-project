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
import {useState} from "react";

const UserInfo = () => {
  //variables
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");

  //hooks

  const toggleModal = () => {
    setModal(!modal);
  }

  //useEffects

  //onClicks

  const saveChangeOnclick = () => {
    toggleModal();
    return true;
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
    setName(name);
  }

  //requests

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h4">회원 정보</CardTitle>
        <Form onSubmit={changeNameOnSubmit}>
          <FormGroup>
            <Label for="name">이름</Label>
            <Input type="text" name="name" id="name" placeholder="이름을 입력하세요" defaultValue="John Doe" onChange={nameOnchange} value={name}/>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <div className={"form-control bg-dark bg-opacity-25"}>yourEmail@naver.com</div>
          </FormGroup>
          <FormGroup>
            <Label for="createdAt">가입일</Label>
            <div className={"form-control bg-dark bg-opacity-25"}>2024-08-11</div>
          </FormGroup>
          <FormGroup>
            <Label for="socialType">회원가입 방식</Label>
            <div className={"form-control bg-dark bg-opacity-25"}>일반 회원가입</div>
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