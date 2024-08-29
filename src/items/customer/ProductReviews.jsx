import {Button, ButtonGroup, Input, InputGroup, InputGroupText} from "reactstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import redirect from "react-router-dom/es/Redirect";
import {parseDate} from "../../utils/timeUtils";
import {fetchWithAuth} from "../../utils/fetchUtils";

const ProductReviews = (props) => {

  //variables
  const itemId = props.itemId;
  const [toggleReviewValue, setToggleReviewValue] = useState(false);
  const [content, setContent] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [star, setStar] = useState(5);
  const [reviewList, setReviewList] = useState([]);

  //searching
  const [nextSearchAfter, setNextSearchAfter] = useState(null);
  const [sortType, setSortType] = useState("RECENT");
  const [withTotalCount, setWithTotalCount] = useState(false);




  //hooks
  const getStarImage = (idx, star) => {
    if (idx < star) {
      return "url('/images/star2.png') 0px 0px / 30px 30px no-repeat"
    } else {
      return "url('/images/star.png') 0px 0px / 30px 30px no-repeat"
    }
  }

  const starImages = (star) => {
    const starNumber = parseInt(star);
    return new Array(5).fill(0).map((elem, idx) => {
      return (
        <div style={{
          background: getStarImage(idx, starNumber), backgroundSize: "17px 17px",
          width: "17px",
          height: "17px",
          border: "0px"
        }}
             className={"bg-white p-1 d-inline-block"}
             onClick={() => setStarOnClick(idx)}
        />
      )
    });
  }

  const moveMyPage = () => {
    window.location.href = "/user/profile/orders"
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

  const addReviews = () => {
    requestReviews()
  }



  //onSubmits
  const reviewAddOnSubmit = (event) => {
    event.preventDefault();
    // requestAddReview();
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
    fetchWithAuth("/reviews?" +
      "size=5" +
      "&itemId=" + itemId + "" +
      "&withTotalCount=" + false +
      "&sortType=" + sortType +
      (nextSearchAfter == null ? "" : "&nextSearchAfter=" + nextSearchAfter),
      {method: "get", headers: {"Content-Type": "application/json"}})
      .then(resp => {
        if (!resp.ok) {
          return;
        } else {
          resp.json().then(data => {
            const items = [...reviewList, ...data.body.items];
            setReviewList(items);
            setNextSearchAfter(data.body.nextSearchAfter);
          });
        }
      });

  }

  const requestFindOrders = () => {
    fetchWithAuth("/item/{itemId}/purchases",
      {method: "get", headers: {"Content-Type": "application/json"}}
    ).then(resp => {
      if (!resp.ok) {
        resp.json().then(data => {

        });
      } else {
        return resp.json().then(data => {

        });
      }
    });
  }

  // const requestAddReview = () => {
  //   const reviewBody = {
  //     "itemId": itemId,
  //     "star": star,
  //     "content": content
  //   };
  //   fetch("/reviews", {
  //       method: "POST",
  //       headers: {"Content-Type": "application/json"},
  //       body: JSON.stringify(reviewBody)
  //     }
  //   ).then(resp => {
  //     if (!resp.ok) {
  //
  //       return;
  //     } else {
  //       const href = window.location.href;
  //       window.location.href = href;
  //     }
  //   })
  // }

  return (
    <div className={"content"}>
      <div>
        <Button className={"w-100 bg-primary mb-3"} onClick={() => moveMyPage()}>후기작성</Button>
      </div>
      {/*{
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
      }*/}

      <div>
        <div className={"mb-2"}>
          {
            reviewList.length != 0 ? reviewList.map((review, idx) => {
              return (<>
                  <div className={"border-bottom pb-2 pt-2"}>
                    <div>
                      <span>{review.username}</span>
                      <span className={"ms-2 me-2"}>|</span>
                      <span>{parseDate(review["createdAt"])}</span>
                    </div>
                    <div>{review.content}</div>
                    <div>{starImages(review.star)}</div>
                  </div>
                </>
              )
            }) : (
              <div className={"border-bottom pb-2 pt-2"}>
                <div><span>후기가 없습니다</span></div>
              </div>
            )
          }
        </div>
        <div>
          {
            nextSearchAfter == null ? null :
              <Button onClick={() => addReviews()}>더보기</Button>
          }
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;