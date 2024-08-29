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
  ModalBody,
  ModalFooter
} from "reactstrap";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "../utils/fetchUtils";

const PasswordManagement = (props) => {
  //variables
  const {userInfo} = props;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [errors, setErrors] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);

  //hooks
  const toggleModal = () => {
    setModal(!modal);
  }

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }

    setLoaded(true);
  }, []);


  //onClicks
  const updatePasswordOnClick = (event) => {
    event.preventDefault();
    updatePasswordRequest();
    setModal(false);
  }

  const cancelUpdatePasswordOnclick = (event) => {
    event.preventDefault();
    setModal(false);

  }
  //onSubmits

  const updatePasswordSubmit = (event) => {
    event.preventDefault();
    setModal(true);
  }

  //onChanges

  const currentPasswordOnChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setCurrentPassword(value);
  }

  const newPasswordOnChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setNewPassword(value);
  }

  const confirmPasswordOnChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setConfirmPassword(value);
  }

  //requests
  const updatePasswordRequest = () => {
    fetchWithAuth("/users/me/password",
      {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          "currentPassword": currentPassword,
          "newPassword": newPassword,
          "confirmPassword": confirmPassword
        }),
      }).then(resp => {
      if (resp.ok) {
        resp.json().then(data => {
          setModalSuccess(true);
          setCurrentPassword("");
          setConfirmPassword("");
          setNewPassword("");
          setErrors(null);
          setConfirmModal(true);
        });
      } else {
        //todo: error 처리하기
        console.error("update에러");
        resp.json().then(data => {
          setErrors(data.body);
          setCurrentPassword("");
          setConfirmPassword("");
          setNewPassword("");
          setErrors(null);
        });
      }
    });
  }

  return (
    <Card className="mb-4">
      <CardBody onSubmit={updatePasswordSubmit}>
        <CardTitle tag="h4">비밀번호 관리</CardTitle>
        <Form>
          <FormGroup>
            <Label for="currentPassword">현재 비밀번호</Label>
            <Input type="password" name="currentPassword" id="currentPassword"
                   placeholder="현재 비밀번호를 입력해주세요"
                   value={currentPassword}
                   onChange={currentPasswordOnChange}
            />
            {!errors?.currentPassword? null :
              <div><p className={"alert-danger text-end pe-3"}>{errors?.currentPassword}</p></div>}
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">변경할 비밀번호</Label>
            <Input type="password" name="newPassword" id="newPassword" placeholder="변경할 비밀번호를 입력해주세요"
                   value={newPassword}
                   onChange={newPasswordOnChange}
            />
            {!errors?.newPassword? null :
              <div><p className={"alert-danger text-end pe-3"}>{errors?.newPassword}</p></div>}
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">비밀번호 확인</Label>
            <Input type="password" name="confirmPassword" id="confirmPassword"
                   placeholder="변경할 비밀번호를 확인해주세요"
                   onChange={confirmPasswordOnChange}
                   value={confirmPassword}
            />
            {!errors?.confirmPassword? null :
              <div><p className={"alert-danger text-end pe-3"}>{errors?.confirmPassword}</p></div>}
          </FormGroup>
          <Button color="primary">Change Password</Button>
        </Form>
      </CardBody>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalBody>
          <div><span>비밀번호를 변경하시겠습니까?</span></div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={updatePasswordOnClick}>네</Button>
          <Button onClick={cancelUpdatePasswordOnclick}>아니오</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={confirmModal}>
        <ModalBody>
          <div><span>변경이 완료되었습니다.</span></div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setConfirmModal(!confirmModal)}>확인</Button>
        </ModalFooter>
      </Modal>
    </Card>
  )
}
export default PasswordManagement;