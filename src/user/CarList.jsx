import {Button, Card, CardBody, CardTitle, Col, Row} from "reactstrap";

const CartList = () => {

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h4">Wishlist</CardTitle>
        <ul className="list-unstyled">
          <li>
            <Row>
              <Col xs="8">Product Name 1</Col>
              <Col xs="4">
                <Button color="danger" size="sm">Remove</Button>
              </Col>
            </Row>
          </li>
          {/* Add more wishlist items here */}
        </ul>
      </CardBody>
    </Card>
  )
}

export default CartList;
