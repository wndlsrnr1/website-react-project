import {Badge, Button, Container, ListGroup, ListGroupItem, ListGroupItemText} from "reactstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import carousel from "bootstrap/js/src/carousel";

const HomeItemCarousel = () => {

  //variables

  const [carouselList, setCarouselList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [lastClicked, setLastClicked] = useState(null);
  const activation = (carouselId) => {
    if (carouselId === lastClicked) {
      return " text-white"
    }
  }
  //requests
  const updatePriorityRequest = () => {
    const formData = new FormData();
    formData.append("carouselList", carouselList);
    fetch("/admin/home/carousel/update/all", {method: "post", body: formData})
      .then(resp => {
        if (resp.ok) {
          console.log(200);
        } else {
          console.log(400);
        }
      });

  }

  const carouselListRequest = () => {
    fetch("/admin/home/carousels")
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        const sortedList = data.data.content.sort((a, b) => a.priority - b.priority);
        setCarouselList(sortedList);
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

  }, [carouselList]);

  //onClicks
  const buttonUpOnclick = (carouselId, priority) => {
    setLastClicked(carouselId);
    const minValue = carouselList[0].priority;
    if (parseInt(minValue) === parseInt(priority)) {
      return;
    }
    const newOne = carouselList.map((carousel, idx) => {
      if (parseInt(carousel.priority) === parseInt(priority) - 1) {
        carousel.priority = carousel.priority + 1;
        return carousel;
      }
      if (parseInt(carousel.priority) === parseInt(priority)) {
        carousel.priority = carousel.priority - 1;
        return carousel;
      }
      return carousel;
    }).sort((carousel1, carousel2) => carousel1.priority - carousel2.priority);

    setCarouselList([...newOne]);
  };

  const buttonDownOnClick = ((carouselId, priority) => {
    const maxValue = carouselList[carouselList.length - 1].priority;
    setLastClicked(carouselId);
    if (parseInt(maxValue) === parseInt(priority)) {
      return;
    }
    const newOne = carouselList.map((carousel, idx) => {
      if (parseInt(carousel.priority) === parseInt(priority) + 1) {
        carousel.priority = carousel.priority - 1;
        return carousel;
      }
      if (parseInt(carousel.priority) === parseInt(priority)) {
        carousel.priority = carousel.priority + 1;
        return carousel;
      }
      return carousel;
    }).sort((carousel1, carousel2) => carousel1.priority - carousel2.priority);

    setCarouselList([...newOne]);
  });

  const updatePriorityOnClick = () => {
    updatePriorityRequest();
  }

  //onSubmits

  //onChanges

  return (
    <>
      <Container className={"w-50"}>
        <h1 className={"text-center p-4"}>캐러셀 관리</h1>
        <div className={"buttons d-flex justify-content-end p-4"}>
          <Link className={"btn bg-primary me-2 text-white"} to={"/admin/home/items/carousel/add"}>캐러셀 추가</Link>
          <Button className={"bg-primary"} onClick={updatePriorityOnClick}>저장</Button>
        </div>

        <div>
          <ListGroup>
            {
              carouselList.length !== 0 ? carouselList.map((carousel, idx) => {
                return (
                  <ListGroupItem className={"d-flex justify-content-between align-items-center"}
                                 active={carousel.id === lastClicked}>
                    <div className={"d-inline-block"}>
                      <img style={{maxHeight: "100px"}} src={"/attachment/" + carousel.attachmentId}
                           alt={carousel.requestedNameOfAttachment}/>
                    </div>
                    <Link className={"text-decoration-none text-black" + activation(carousel.id)}
                          to={"/admin/home/items/carousel/" + carousel.id}>{carousel.itemNameKor + " (" + carousel.itemName + ")"}</Link>
                    <div className={"d-inline-block"}>
                      <Badge tag={"button"} pill className={"text-white bg-secondary opacity-75 me-2 "}
                             onClick={() => buttonUpOnclick(carousel.id, carousel.priority)}>↑</Badge>
                      <Badge tag={"button"} pill className={"text-white bg-secondary opacity-75 me-2"}
                             onClick={() => buttonDownOnClick(carousel.id, carousel.priority)}>↓</Badge>
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