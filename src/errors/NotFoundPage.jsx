import {Button, Col, Container, Row} from "reactstrap";

const NotFoundPage = () => {
  return (
    <div className="not-found-page" style={styles.page}>
      <Container>
        <Row className="justify-content-center align-items-center" style={styles.row}>
          <Col md="6" className="text-center">
            <h1 style={styles.header}>404</h1>
            <p style={styles.message}>이런! 찾는 페이지가 존재하지 않습니다. </p>
            <Button color="primary" style={styles.button} href="/">메인 페이지로 돌아가기</Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: 'linear-gradient(to right, #ff4b2b, #ff416c)',
    color: '#fff',
    textAlign: 'center',
  },
  row: {
    height: '100%',
  },
  header: {
    fontSize: '10rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
  },
};

export default NotFoundPage;