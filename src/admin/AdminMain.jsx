import {Link, Redirect} from "react-router-dom";
import {Button, Card, CardBody, CardTitle, Col, Container, Row} from "reactstrap";
import * as PropTypes from "prop-types";


function FaTags(props) {
  return null;
}

FaTags.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
};

function FaListAlt(props) {
  return null;
}

FaListAlt.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
};

function FaBoxes(props) {
  return null;
}

FaBoxes.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
};

function FaHome(props) {
  return null;
}

FaHome.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
};

function FaComments(props) {
  return null;
}

FaComments.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
};
const AdminMain = () => {

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md="8">
            <h2 className="text-center mb-4">관리자 대시보드</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {/* Category Management */}
          <Col md="4" className="mb-4">
            <Card className="shadow-sm">
              <CardBody className="text-center">
                <FaTags size={40} className="mb-3" />
                <CardTitle tag="h5">카테고리 관리</CardTitle>
                <Link to="/admin/categories">
                  <Button color="primary" className="mt-3">
                    카테고리 관리하기
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </Col>

          {/* Subcategory Management */}
          <Col md="4" className="mb-4">
            <Card className="shadow-sm">
              <CardBody className="text-center">
                <FaListAlt size={40} className="mb-3" />
                <CardTitle tag="h5">서브카테고리 관리</CardTitle>
                <Link to="/admin/subcategories">
                  <Button color="primary" className="mt-3">
                    서브카테고리 관리하기
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </Col>

          {/* Item Management */}
          <Col md="4" className="mb-4">
            <Card className="shadow-sm">
              <CardBody className="text-center">
                <FaBoxes size={40} className="mb-3" />
                <CardTitle tag="h5">아이템 관리</CardTitle>
                <Link to="/admin/items">
                  <Button color="primary" className="mt-3">
                    아이템 관리하기
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </Col>

          {/* Home Carousel Management */}
          <Col md="4" className="mb-4">
            <Card className="shadow-sm">
              <CardBody className="text-center">
                <FaHome size={40} className="mb-3" />
                <CardTitle tag="h5">캐러셀 관리</CardTitle>
                <Link to="/admin/home/items/carousel">
                  <Button color="primary" className="mt-3">
                    캐러셀 관리하기
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </Col>

          {/* Comments Management */}
          <Col md="4" className="mb-4">
            <Card className="shadow-sm">
              <CardBody className="text-center">
                <FaComments size={40} className="mb-3" />
                <CardTitle tag="h5">이용자 문의관리</CardTitle>
                <Link to="/admin/comments">
                  <Button color="primary" className="mt-3">
                    이용자 문의관리하기
                  </Button>
                </Link>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AdminMain;