import {Button, Card, CardBody, CardTitle, Form, FormGroup, Input, Label} from "reactstrap";

const AddressManagement = () => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h4">Address Management</CardTitle>
        <Form>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input type="text" name="address" id="address" placeholder="Enter your address"
                   defaultValue="123 Main St"/>
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input type="text" name="city" id="city" placeholder="Enter your city" defaultValue="Anytown"/>
          </FormGroup>
          <FormGroup>
            <Label for="postalCode">Postal Code</Label>
            <Input type="text" name="postalCode" id="postalCode" placeholder="Enter your postal code"
                   defaultValue="12345"/>
          </FormGroup>
          <Button color="primary">Update Address</Button>
        </Form>
      </CardBody>
    </Card>
  )
}
export default AddressManagement;