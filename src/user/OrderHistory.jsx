import {Card, CardBody, CardTitle, Table} from "reactstrap";

const OrderHistory = () => {
  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle tag="h4">Order History</CardTitle>
        <Table responsive>
          <thead>
          <tr>
            <th>#</th>
            <th>Order ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">1</th>
            <td>12345</td>
            <td>2023-08-28</td>
            <td>Shipped</td>
            <td>$99.99</td>
          </tr>
          {/* Add more orders here */}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  )
}
export default OrderHistory;