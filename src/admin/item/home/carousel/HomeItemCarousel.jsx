import {Badge, Button, Container, ListGroup, ListGroupItem, ListGroupItemText} from "reactstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const HomeItemCarousel = () => {

  //variables

  const [carouselList, setCarouselList] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //requests

  const carouselListRequest = () => {
    fetch("/admin/home/carousels")
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setCarouselList(data.data.content);
      });
  };

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }
    carouselListRequest();
    setLoaded(true);
  }, []);

  useEffect(() => {
    console.log(carouselList);
  }, [carouselList]);

  //onClicks
  const buttonUpOnclick = ((carouselId, idx) => {
    //
  });

  const buttonDownOnClick = ((carouselId, idx) => {

  });

  //onSubmits

  //onChanges

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
            {
              carouselList.length !== 0 ? carouselList.map((carousel, idx) => {
                return (
                  <ListGroupItem className={"d-flex justify-content-between align-items-center"}>
                    <div className={"d-inline-block"}>
                      <img style={{maxHeight: "100px"}} src={"/attachment/" + carousel.attachmentId} alt={carousel.requestedNameOfAttachment}/>
                    </div>
                    <Link className={"text-decoration-none text-black"} to={"/admin/home/items/carousel/" + carousel.id}>{carousel.itemNameKor + " (" + carousel.itemName + ")"}</Link>
                    <div className={"d-inline-block"}>
                      <Badge tag={"button"} pill className={"text-white bg-primary me-2 "}>↑</Badge>
                      <Badge tag={"button"} pill className={"text-white bg-primary me-2"}>↓</Badge>
                    </div>
                  </ListGroupItem>
                )
              }) : null
            }

          </ListGroup>
        </div>
      </Container>
    </>
  );
}

export default HomeItemCarousel;