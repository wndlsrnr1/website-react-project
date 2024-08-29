import {Button, Card, CardBody, CardTitle, Form, FormGroup, Input, Label} from "reactstrap";

const PasswordManagement = () => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h4">Password Management</CardTitle>
        <Form>
          <FormGroup>
            <Label for="currentPassword">Current Password</Label>
            <Input type="password" name="currentPassword" id="currentPassword"
                   placeholder="Enter current password"/>
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">New Password</Label>
            <Input type="password" name="newPassword" id="newPassword" placeholder="Enter new password"/>
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm New Password</Label>
            <Input type="password" name="confirmPassword" id="confirmPassword"
                   placeholder="Confirm new password"/>
          </FormGroup>
          <Button color="primary">Change Password</Button>
        </Form>
      </CardBody>
    </Card>
  )
}
export default PasswordManagement;