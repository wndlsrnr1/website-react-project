import {Button, Card, CardBody, CardTitle, Col, Row} from "reactstrap";

const ReviewAndCommentManagement = () => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h4">Review and Question Management</CardTitle>
        <ul className="list-unstyled">
          <li>
            <Row>
              <Col xs="8">Product Name - "Great product!"</Col>
              <Col xs="4">
                <Button color="danger" size="sm">Delete</Button>
              </Col>
            </Row>
          </li>
          {/* Add more reviews or questions here */}
        </ul>
      </CardBody>
    </Card>
  )
}
export default ReviewAndCommentManagement;