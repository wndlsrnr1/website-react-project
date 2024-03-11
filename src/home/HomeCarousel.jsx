import {Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem, Container} from "reactstrap";
import {useEffect, useState} from "react";
import carousel from "bootstrap/js/src/carousel";


const HomeCarousel = (args) => {

  //variables

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [homeCarousels, setHomeCarousels] = useState([]);

  //hooks

  const getItems = (itemsData) => {

  }

  const displayNone = (idx) => {
    if (activeIndex !== idx) {
      return "d-none";
    }
  }

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  //useEffects

  useEffect(() => {
    if (loaded) {
      return;
    }

    homeCarouselsRequest();

    setLoaded(true);
  }, [loaded]);

  //onClicks

  //onSubmits

  //onChanges

  //requests

  const homeCarouselsRequest = () => {
    const path = "/home/carousels";
    fetch(path, {method: "get"})
      .then(resp => resp.json())
      .then(data => {
        console.log(data.data);
        setHomeCarousels(data.data);
        /*
         src: 'https://picsum.photos/id/123/1200/400',
    altText: 'Slide 1',
    caption: 'Slide 1',
    key: 1,
         */
        const itemsNew = data.data.map((carousel, idx) => {
          return {
            src: "/attachment/" + carousel.attachmentId,
            altText: carousel.itemNameKor,
            key: carousel.itemNameKor + idx,
            itemId: carousel.itemId,
          };
        });
        setItems(itemsNew);
      });
  }

  const slides = items.map((item, idx) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        className={"d-flex justify-content-center"}
      >
        <a href={"/item/" + item.itemId} className={displayNone(idx)}>
          <img src={item.src} alt={item.altText} style={{height: "400px"}}/>
        </a>
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
          className={"text-break"}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}{...args} key={"123"} className={"bg-black rounded-3"} slide={false} fade={true}>
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex}/>
      {slides}
      <CarouselControl direction="prev" directionText=" " onClickHandler={previous}/>
      <CarouselControl direction="next" directionText=" " onClickHandler={next}/>
    </Carousel>
  );
}

export default HomeCarousel;