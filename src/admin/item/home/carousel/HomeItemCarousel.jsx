import {Badge, Button, Container, ListGroup, ListGroupItem, ListGroupItemText} from "reactstrap";
import {Link} from "react-router-dom";

const HomeItemCarousel = () => {


  return (
    <>
      <Container className={"w-50"}>
        <h1 className={"text-center p-4"}>캐러셀 관리</h1>
        <div className={"buttons d-flex justify-content-end p-4"}>
          <Link className={"btn bg-primary me-2 text-white"} to={"/admin/home/items/carousel/add"}>캐러셀 추가</Link>
          <Button className={"bg-primary"}>저장</Button>
        </div>
        <div>
          <ListGroup>
            <ListGroupItem className={"d-flex justify-content-between"}>
              <Link className={"text-decoration-none text-black"}>dfasdfasdfdasf</Link>
              <div className={"d-inline-block"}>
                <Badge tag={"button"} pill className={"text-white bg-primary me-2 "}>↑</Badge>
                <Badge tag={"button"} pill className={"text-white bg-primary me-2"}>↓</Badge>
              </div>
            </ListGroupItem>
            <ListGroupItem className={"d-flex justify-content-between"}>
              <Link className={"text-decoration-none text-black"}>dfasdfasdfdasf</Link>
              <div className={"d-inline-block"}>
                <Badge tag={"button"} pill className={"text-white bg-primary me-2 "}>↑</Badge>
                <Badge tag={"button"} pill className={"text-white bg-primary me-2"}>↓</Badge>
              </div>
            </ListGroupItem>
            <ListGroupItem className={"d-flex justify-content-between"}>
              <Link className={"text-decoration-none text-black"}>dfasdfasdfdasf</Link>
              <div className={"d-inline-block"}>
                <Badge tag={"button"} pill className={"text-white bg-primary me-2 "}>↑</Badge>
                <Badge tag={"button"} pill className={"text-white bg-primary me-2"}>↓</Badge>
              </div>
            </ListGroupItem>
            <ListGroupItem className={"d-flex justify-content-between"}>
              <Link className={"text-decoration-none text-black"}>dfasdfasdfdasf</Link>
              <div className={"d-inline-block"}>
                <Badge tag={"button"} pill className={"text-white bg-primary me-2 "}>↑</Badge>
                <Badge tag={"button"} pill className={"text-white bg-primary me-2"}>↓</Badge>
              </div>
            </ListGroupItem>
            <ListGroupItem className={"d-flex justify-content-between"}>
              <Link className={"text-decoration-none text-black"}>dfasdfasdfdasf</Link>
              <div className={"d-inline-block"}>
                <Badge tag={"button"} pill className={"text-white bg-primary me-2 "}>↑</Badge>
                <Badge tag={"button"} pill className={"text-white bg-primary me-2"}>↓</Badge>
              </div>
            </ListGroupItem>
            <ListGroupItem className={"d-flex justify-content-between"}>
              <Link className={"text-decoration-none text-black"}>dfasdfasdfdasf</Link>
              <div className={"d-inline-block"}>
                <Badge tag={"button"} pill className={"text-white bg-primary me-2 "}>↑</Badge>
                <Badge tag={"button"} pill className={"text-white bg-primary me-2"}>↓</Badge>
              </div>
            </ListGroupItem>
          </ListGroup>
        </div>
      </Container>
    </>
  )
}

export default HomeItemCarousel;