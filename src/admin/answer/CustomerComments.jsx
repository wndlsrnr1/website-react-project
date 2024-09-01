import React, {useEffect, useState} from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Input,
  Form,
  FormGroup,
  Label,
  Container,
  ButtonGroup
} from "reactstrap";
import {fetchWithAuth} from "../../utils/fetchUtils";
import {getKeyMapObject, removeDuplicated} from "../../utils/arrayUtils";

const CustomerComments = (props) => {
  //variables
  const [comments, setComments] = useState([]);
  const [firstLoad, setFirstLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);
  const [userMap, setUserMap] = useState(null);
  const [itemMap, setItemMap] = useState(null);
  const [commentToAnswer, setCommentToAnswer] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [errors, setErrors] = useState(null);

  //searching variable
  const [size, setSize] = useState(5);
  const [sorType, setSorType] = useState("RECENT");
  const [nextSearchAfter, setNextSearchAfter] = useState(null);
  const [isNoneWithAnswer, setIsNoneWithAnswer] = useState(false);

  //hooks

  //useEffects
  useEffect(() => {
    getCustomerComments();
  }, []);

  useEffect(() => {
    if (answers && commentToAnswer && userMap && itemMap && comments.length > 0) {
      setLoading(false);
    }
  }, [userMap, itemMap, comments]);

  useEffect(() => {
    setErrors(null);
  }, [content]);

  //onClicks

  //onSubmits

  //onChanges

  //requests

  const getCustomerComments = async () => {
    setLoading(true);
    try {
      let url = "/admin/comments";
      url += "?size="+size;
      url += "&sortType="+sorType;
      if (nextSearchAfter !== null) {
        url += "&nextSearchAfter="+nextSearchAfter;
      }
      url += "&isNoneWithAnswer="+isNoneWithAnswer;

      const commentsResponse = await fetchWithAuth(url, {method: "GET"});
      if (!commentsResponse.ok) {
        console.error("Failed to fetch customer comments");
        return;
      }

      const data = await commentsResponse.json();
      setComments(data.body.items);
      setNextSearchAfter(data.body.nextSearchAfter);


      const commentToAnswerObj = {};
      data.body.items.forEach((comment, idx) => {
        commentToAnswerObj[comment.commentId] = comment.answerId;
      });
      setCommentToAnswer(commentToAnswerObj);

      const commentExistsAnswer = data.body.items.filter((comment, idx) => {
        return comment.answerId;
      }).map((comment, idx) => {
        return {"commentId": comment.commentId, "answerId": comment.answerId};
      });

      console.log("commentExistsAnswer", commentExistsAnswer);
      const answerResponse = await Promise.all(commentExistsAnswer.map(elem => fetchWithAuth(`/admin/comments/${elem.commentId}/answers`, {method: "GET"}, true)));
      const answerNew = getKeyMapObject("commentId", answerResponse);
      setAnswers(answerNew);

      console.log("commentToAnswerObj", commentToAnswerObj)

      let itemIdArray = data.body.items.map((elem) => elem.itemId);
      itemIdArray = removeDuplicated(itemIdArray);
      const itemResponse = await Promise.all(
        itemIdArray.map((itemId, idx) => {
          return fetchWithAuth("/admin/items/v2/" + itemId, {method: "GET"}, true);
        })
      );

      setItemMap(getKeyMapObject("id", itemResponse));

      let userList = data.body.items.map((comment, idx) => comment.userId);
      userList = removeDuplicated(userList);

      const userResponse = await Promise.all(
        userList.map((userId, idx) => {
          return fetchWithAuth("/admin/users/" + userId, {method: "GET"}, true);
        })
      );
      setUserMap(getKeyMapObject("userId", userResponse));

    } catch (error) {
      console.error("An error occurred while fetching customer comments", error);
    }
  };

  // Handle answer to a customer comment
  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedComment);
    if (selectedComment && content) {
      try {
        const response = await fetchWithAuth(`/admin/comments/${selectedComment.commentId}/answers`, {
          method: "POST",
          body: JSON.stringify({"content": content}),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          alert("Answer sent successfully");
          setContent("");
          setSelectedComment(null);
          getCustomerComments(); // Refresh comments
        } else {
          response.json().then(data => {
            setErrors(data.body);
            console.error("Failed to send answer");
          });

        }
      } catch (error) {
        console.error("An error occurred while sending answer", error);
      }
    }
  };

  // Handle comment deletion
  const handleDeleteAnswer = async (commentId) => {
    try {
      const response = await fetchWithAuth(`/admin/comments/${commentId}/answers`, {method: "DELETE"});
      if (response.ok) {
        alert("Comment deleted successfully");
        getCustomerComments(); // Refresh comments
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("An error occurred while deleting the comment", error);
    }
  };



  return (
    <Container className={"w-75"}>
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h4" className={"text-center"}>이용자 문의</CardTitle>
          {loading ? (
            <p>이용자 문의가 없습니다</p>
          ) : (
            <>
              <ul className="list-unstyled">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <li key={comment.commentId} className="mb-3">
                      <Row className="border pb-2 pt-2">

                        <Col xs="8">
                          <p><strong>{userMap[comment.userId]["username"]}</strong>: {comment.commentContent}</p>
                          <p>
                            <a href={"/items/detail/" + comment.itemId}>
                              <strong>제품</strong>: {itemMap[comment.itemId]["nameKor"]}
                            </a>
                          </p>
                          {comment.commentId  && comment.answerId && answers[comment.commentId] && (
                            <p><strong>답변</strong>: {answers[comment.commentId]["content"]}</p>
                          )}
                        </Col>

                        <Col xs="4" className="d-flex align-items-center justify-content-end">

                          {
                            !comment.answerId &&
                            <Button color="primary" size="sm" className="me-2" onClick={() => setSelectedComment(comment)}>
                              답변
                            </Button>
                          }
                          {
                            comment.answerId &&
                            <Button color="danger" size="sm" onClick={() => handleDeleteAnswer(comment.commentId)}>
                              답변 삭제
                            </Button>
                          }
                        </Col>
                      </Row>
                    </li>
                  ))
                ) : (
                  <p>No customer comments available.</p>
                )}
              </ul>
              <ButtonGroup className={"d-flex justify-content-center"}>
                {
                  nextSearchAfter &&
                  <Button className={"bg-primary"} onClick={getCustomerComments}>다음</Button>
                }
              </ButtonGroup>
            </>

          )}

          {selectedComment && (
            <Form onSubmit={handleAnswerSubmit} className="mt-4">
              <FormGroup>
                <Label for="answer">Answer to {selectedComment.commentId}:</Label>
                <Input
                  type="textarea"
                  name="answer"
                  id="answer"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </FormGroup>
              {!errors?.content? null :
                <div><p className={"alert-danger text-end pe-3"}>{errors?.content}</p></div>}
              <Button type="submit" color="success">
                답변 작성
              </Button>
              <Button type="button" color="secondary" className="ms-2" onClick={() => setSelectedComment(null)}>
                취소
              </Button>
            </Form>
          )}
        </CardBody>
      </Card>
    </Container>

  );
};

export default CustomerComments;