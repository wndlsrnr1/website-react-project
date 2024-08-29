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
import {fetchWithAuth} from "../utils/fetchUtils";
import {useEffect, useState} from "react";

const AddressManagement = (props) => {
  //variables
  const [confirmModal, setConfirmModal] = useState(false);
  const [address, setAddress] = useState(props.userInfo.address);
  const [loaded, setLoaded] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [errors, setErrors] = useState(null);
  //hooks

  //useEffects
  useEffect(() => {
    if (loaded) return false;
    console.log(props);
    setLoaded(true);
  }, []);

  //onClicks

  const updateAddressOnClick = (event) => {
    event.preventDefault();
    requestUpdateAddress();
  }

  //onSubmits
  const addressUpdateOnSubmit = (event) => {
    event.preventDefault();
    requestUpdateAddress();
  }

  //onChanges
  const addressOnChange = (event) => {
    if (errors) {
      setErrors(null);
    }
    event.preventDefault();
    const value = event.target.value;
    setAddress(value);
  };

  //requests
  const requestUpdateAddress = () => {
    fetchWithAuth("/users/me/address",
      {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({"address": address}),
      }).then(resp => {
      if (resp.ok) {
        resp.json().then(data => {
          setAddress(data.body.address);
          setConfirmModal(true);
          setResultMessage("주소변경에 성공하였습니다.");
        });
      } else {
        resp.json().then(data => {
          setErrors(data.body);
          setAddress(props.userInfo.address);
          setConfirmModal(true);
          setResultMessage("주소변경에 실패하였습니다.")
        });
      }
    });
  }

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h4">주소 관리</CardTitle>
        <Form onSubmit={addressUpdateOnSubmit}>
          <FormGroup>
            <Label for="address">주소</Label>
            <Input type="text" name="address" id="address" placeholder="주소를 입력해주세요"
                   defaultValue={address ? address : "등록되지 않음"}
                   onChange={addressOnChange}
                   value={address}
            />
            {errors!== null && errors?.address ? <div><p className={"alert-danger text-end pe-3"}>{errors.address}</p></div> :
              null}
          </FormGroup>
          <Button color="primary">Update Address</Button>
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
    </Card>
  )
}
export default AddressManagement;