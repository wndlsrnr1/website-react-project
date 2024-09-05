import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "../utils/fetchUtils";
import {parseDate} from "../utils/timeUtils";
import {removeDuplicated} from "../utils/arrayUtils";
import Star from "../common/Star";


const ReviewManagement = () => {
  //variables
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [editingStars, setEditingStars] = useState(0);
  const [isFirstFetch, setIsFirstFetch] = useState(true);

  //searching variable
  const [size, setSize] = useState(10);
  const [nextSearchAfter, setNextSearchAfter] = useState(null);
  const [withTotalCount, setWithTotalCount] = useState(false);
  const [sortType, setSortType] = useState("RECENT");

  //hooks

  //useEffects
  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(() => {
    if (reviews.length <= 0) {
      return;
    }


  }, [reviews]);



  //onClicks

  const handleStarClick = (stars) => {
    setEditingStars(stars);
  };

  const fetchNext = (firstFetch) => {
    loadReviews();
    setIsFirstFetch(firstFetch);
  }

  //onSubmits

  //onChanges

  //requests

  const loadReviews = async () => {
    try {
      let url = "/reviews/me";
      url += "?size=" + size;
      if (nextSearchAfter !== null) {
        url += "&nextSearchAfter=" + nextSearchAfter;
      }
      url += "&withTotalCount=" + withTotalCount;
      url += "&sortType=" + sortType;

      const response = await fetchWithAuth(url, {method: "GET"});
      if (response.ok) {
        const data = await response.json();

        setNextSearchAfter(data.body.nextSearchAfter);

        const items = data.body.items;

        const itemIdList = removeDuplicated(items.map((item) => item.itemId));


        const thumbnailResponse = await Promise.all(itemIdList.map((itemId) =>
            fetchWithAuth("/items/thumbnail?itemId=" + itemId,
              {}, true)
          )
        );

        //makeThumbnail
        const thumbnailIdMap = {};
        thumbnailResponse.forEach((elem) => {
          thumbnailIdMap[elem.data.itemId] = elem.data.fileId;
        });

        // makeItem
        const itemInfoResponse = await Promise.all(itemIdList.map((itemId) =>
            fetchWithAuth("/items/basic/" + itemId, {}, true)
          )
        );
        const itemMap = {};
        itemInfoResponse.map((elem) => {
          const item = elem.data;
          itemMap[item.itemId] = item;
        });

        const reviewsForUpdate = items.map((item, idx) => {
          return {...item, "item": itemMap[item.itemId], "thumbnail": thumbnailIdMap[item.itemId]}
        });
        setReviews(reviewsForUpdate);
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetchWithAuth(`/reviews/${reviewId}`, {method: "DELETE"});
      if (response.ok) {
        alert("리뷰가 성공적으로 삭제되었습니다.");
        loadReviews();
      } else {
        console.error("리뷰 삭제하는 중 오류가 생겼습니다.");
      }
    } catch (error) {
      console.error("리뷰 삭제하는 중 오류가 생겼습니다", error);
    }
  };

  const handleUpdateReview = async (reviewId) => {
    try {
      const response = await fetchWithAuth(`/reviews/${reviewId}`, {
        method: "PATCH",
        body: JSON.stringify({"content": editingContent, "star": editingStars}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("리뷰가 성공적으로 저장되었습니다.");
        setEditingReviewId(null);
        await loadReviews();
      } else {
        console.error("Failed to update review");
      }
    } catch (error) {
      console.error("Error updating review", error);
    }
  };

  //renders
  /*
  <a key={i} type={"button"} style={{
                      background: getStarImage(idx, star), backgroundSize: "30px 30px",
                      width: "35px",
                      height: "35px",
                      border: "0px"
                    }}
                       className={"bg-white p-1"}
                       onClick={() => setStarOnClick(idx)}
                    />
   */

  const renderStars = (stars, isEditable = false) => {
    const starElements = [];
    for (let i = 0; i < 5; i++) {
      starElements.push(
        <Star idx={i} star={stars} onClick={() => isEditable && handleStarClick(i + 1)}/>
      );
    }
    return starElements;
  };

  const renderButton = (isFirstFetch, nextSearchAfter, reviews) => {
    if (!isFirstFetch && nextSearchAfter == null) {
      return (
        <ButtonGroup className={"d-flex"}>
          <Button className={"bg-primary"} onClick={() => fetchNext(true)}>처음으로</Button>
        </ButtonGroup>
      )
    }

    if (nextSearchAfter) {
      return (
        <ButtonGroup className={"d-flex"}>
          <Button className={"bg-primary"} onClick={() => fetchNext(false)}>다음</Button>
        </ButtonGroup>
      )
    }

    return null;
  }

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">리뷰 관리</h2>
      {
        reviews.length !== 0 ? reviews.map((review) => (
          <Card key={review.id} className="mb-4 shadow-sm">
            <CardBody>
              <Row>
                <Col xs="2">
                  <img
                    src={`/attachment/${review.thumbnail}`}
                    alt={review.item.nameKor}
                    className="img-fluid"
                  />
                </Col>
                <Col xs="7">
                  <CardTitle tag="h5">{review.item.nameKor}</CardTitle>
                  <p>{parseDate(review.createdAt)}</p>
                  {editingReviewId === review.id ? (
                    <Form>
                      <FormGroup>
                        <Label for="content">내용</Label>
                        <Input
                          type="textarea"
                          name="content"
                          id="content"
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>평점</Label>
                        <div>
                          <ButtonGroup>
                            {
                              renderStars(editingStars, editingContent)
                            }
                          </ButtonGroup>
                        </div>
                      </FormGroup>
                      <Button color="success" onClick={() => handleUpdateReview(review.id)}>
                        저장
                      </Button>
                      <Button color="secondary" onClick={() => setEditingReviewId(null)} className="ms-2">
                        취소
                      </Button>
                    </Form>
                  ) : (
                    <>
                      <p>{review.content}</p>
                      <div>{renderStars(review.star)}</div>
                    </>
                  )}
                </Col>
                <Col xs="3" className="text-right">
                  {editingReviewId === review.id ? (
                    <></>
                  ) : (
                    <>
                      <Button color="primary" size="sm" onClick={() => {
                        setEditingReviewId(review.id);
                        setEditingContent(review.content);
                        setEditingStars(review.star);
                      }}>
                        수정
                      </Button>
                      <Button color="danger" size="sm" onClick={() => handleDeleteReview(review.id)} className="ms-2">
                        삭제
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        )) : (
          <Card>
            <CardTitle/>
            <CardBody>
              <Row>
                <Col xs="2"/>
                <Col>
                  <p>리뷰 목록이 없습니다</p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )
      }
      {
        renderButton(isFirstFetch, nextSearchAfter, reviews)
      }
    </Container>
  );
}
export default ReviewManagement;