import {Button, ButtonGroup, Input, InputGroup, InputGroupText} from "reactstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import redirect from "react-router-dom/es/Redirect";

const ProductReviews = (props) => {

  //variables
  const itemId = props.itemId;
  const [toggleReviewValue, setToggleReviewValue] = useState(false);
  const [content, setContent] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [star, setStar] = useState(5);
  /**
   * review: {
   *   user: {}
   *    content:
   *    star:
   *    updatedDate:
   * }
   */
  const [reviewList, setReviewList] = useState([]);

  //hooks
  const getStarImage = (idx, star) => {
    if (idx < star) {
      return "url('/images/star2.png') 0px 0px / 30px 30px no-repeat"
    } else {
      return "url('/images/star.png') 0px 0px / 30px 30px no-repeat"
    }
  }

  //useEffects
  useEffect(() => {
    if (loaded) {
      return;
    }
    console.log("itemId = " + itemId);
    requestReviews();
    setLoaded(true);
  }, [])

  //onClicks
  const setStarOnClick = (idx) => {
    setStar(idx + 1);
  }

  const toggleReview = (trv) => {
    setToggleReviewValue(!trv);
    setStar(5);
    setContent("");
  }

  //onSubmits
  const reviewAddOnSubmit = (event) => {
    event.preventDefault();
    requestAddReview();
  }

  //onChanges
  const contentOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setContent(value);
  }

  //requests
  const requestReviews = () => {
    console.log("??");
    fetch("/reviews?" +
      "size=5" +
      "&itemId=" + itemId + "" +
      "&withTotalCount=true" +
      "&sortType=RECENT",
      {method: "get", headers: {"Content-Type": "application/json"}})
      .then(resp => resp.json())
      .then(data => {
        console.log("asdf", data);
      });
  }

  const requestAddReview = () => {
    const reviewBody = {
      "itemId": itemId,
      "star": star,
      "content": content
    };
    fetch("/reviews", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reviewBody)
      }
    ).then(resp => {
      if (!resp.ok) {
        return;
      } else {
        const href = window.location.href;
        window.location.href = href;
      }
    })
  }

  return (
    <div className={"content"}>
      <div>
        <Button className={"w-100 bg-primary mb-3"} onClick={() => toggleReview(toggleReviewValue)}>후기작성</Button>
      </div>
      {
        toggleReviewValue ? (
          <div className={"mb-3 border p-2"}>
            <form onSubmit={reviewAddOnSubmit}>
              <ButtonGroup className={"mb-1"}>
                {
                  new Array(5).fill(0).map((elem, idx) => {
                    return (
                      <button style={{
                        background: getStarImage(idx, star), backgroundSize: "30px 30px",
                        width: "35px",
                        height: "35px",
                        border: "0px"
                      }}
                              className={"bg-white p-1"}
                              onClick={() => setStarOnClick(idx)}
                      />
                    )
                  })
                }
              </ButtonGroup>
              <InputGroup className={"mb-3"}>
                <InputGroupText>리뷰</InputGroupText>
                <Input className={"bg-white"} type={"textarea"} onChange={contentOnChangeInput} value={content}
                       maxLength={100} placeholder={"리뷰를 입력해주세요."}/>
              </InputGroup>
              <div className={"d-flex justify-content-between"}>
                <div><span>{content.length} / 300</span></div>
                <Button>등록</Button>
              </div>
            </form>
          </div>
        ) : null
      }

      <div>
        <div>
          <span>사람이름</span>
          <span>|</span>
          <span>날짜</span>
        </div>
        <div>글 내용</div>
        <div>별 이미지</div>
        <div><Button>더보기</Button></div>
      </div>
    </div>
  );
}

export default ProductReviews;