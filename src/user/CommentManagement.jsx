import {useEffect, useState} from "react";
import Star from "../common/Star";
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
import {parseDate} from "../utils/timeUtils";
import {fetchWithAuth} from "../utils/fetchUtils";
import {removeDuplicated} from "../utils/arrayUtils";

const CommentManagement = (props) => {
  //variables
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [isFirstFetch, setIsFirstFetch] = useState(true);

  //searching variable
  const [size, setSize] = useState(1);
  const [nextSearchAfter, setNextSearchAfter] = useState(null);
  const [withTotalCount, setWithTotalCount] = useState(false);
  const [sortType, setSortType] = useState("RECENT");

  //hooks
  useEffect(() => {
    loadComments();
  }, []);

  //useEffects
  useEffect(() => {
    if (comments.length <= 0) {
      return;
    }

  }, [comments])


  //onClicks

  const fetchNext = (firstFetch) => {
    loadComments();
    setIsFirstFetch(firstFetch);
  }

  //onSubmits

  //onChanges

  //requests
  const loadComments = async () => {
    try {
      //todo: implement method
      let url = "/v2/comments/me";
      url += "?size=" + size;
      if (nextSearchAfter !== null) {
        url += "&nextSearchAfter=" + nextSearchAfter;
      }
      url += "&withTotalCount=" + withTotalCount;
      url += "&sortType=" + sortType;

      const response = await fetchWithAuth(url, {method: "GET"});
      if (!response.ok) {
        console.error("Failed to fetch comments");
      }

      const data = await response.json();
      setNextSearchAfter(data.body.nextSearchAfter);
      const items = data.body.items;
      console.log("items", items);
      const itemIdList = removeDuplicated(items.map((item) => item.itemId));
      console.log("itemIdList", itemIdList);
      const commentIdList = removeDuplicated(items.map((e) => e.id));
      const thumbnailResponse = await Promise.all(itemIdList.map((itemId) =>
          fetchWithAuth("/item/thumbnail?itemId=" + itemId,
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
          fetchWithAuth("/item/basic/" + itemId, {}, true)
        )
      );
      const itemMap = {};
      itemInfoResponse.map((elem) => {
        const item = elem.data;
        itemMap[item.itemId] = item;
      });

      const commentForUpdate = items.map((item) => {
        return {...item, "item": itemMap[item.itemId], "imageId": thumbnailIdMap[item.itemId]}
      });

      console.log("commentForUpdate", commentForUpdate);
      setComments(commentForUpdate);


    } catch (error) {
      console.error("Error fetching comments", error);
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetchWithAuth(`/comments/${commentId}`, {method: "DELETE"});
      if (response.ok) {
        alert("문의가 성공적으로 삭제되었습니다.");
        loadComments();
      } else {
        console.error("문의 삭제하는 중 오류가 생겼습니다.");
      }
    } catch (error) {
      console.error("문의 삭제하는 중 오류가 생겼습니다", error);
    }
  }

  const handleUpdateComment = async (commentId) => {
    try {
      const response = await fetchWithAuth(`/comments/${commentId}`, {
        method: "PATCH",
        body: JSON.stringify({"content": editingContent}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("문의가 성공적으로 저장되었습니다")
        setEditingCommentId(null);
        await loadComments();
      }

    } catch (error) {
      console.error("Error updating comments", error);
    }
  }

  // render


  const renderButton = (isFirstFetch, nextSearchAfter, comments) => {
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
      <h2 className="text-center mb-4">문의 관리</h2>
      {
        comments.length !== 0 ? comments.map((comment) => (
          <Card key={comment.id} className="mb-4 shadow-sm">
            <CardBody>
              <Row>
                <Col xs="2">
                  <img
                    src={`/attachment/${comment.imageId}`}
                    alt={comment.item.nameKor}
                    className="img-fluid"
                  />
                </Col>
                <Col xs="7">
                  <CardTitle tag="h5">{comment.item.nameKor}</CardTitle>
                  <p>{parseDate(comment.createdAt)}</p>
                  {editingCommentId === comment.id ? (
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
                      <Button color="success" onClick={() => handleUpdateComment(comment.id)}>
                        저장
                      </Button>
                      <Button color="secondary" onClick={() => setEditingCommentId(null)} className="ms-2">
                        취소
                      </Button>
                    </Form>
                  ) : (
                    <>
                      <p>{comment.content}</p>
                      {comment.answerContent && <p><strong>답변: </strong> {comment.answerContent}</p>}
                    </>
                  )}
                </Col>
                <Col xs="3" className="text-right">
                  {editingCommentId === comment.id ? (
                    <></>
                  ) : (
                    <>
                      <Button color="primary" size="sm" onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditingContent(comment.content);
                      }}>
                        수정
                      </Button>
                      <Button color="danger" size="sm" onClick={() => handleDeleteComment(comment.id)} className="ms-2">
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
                  <p>문의 목록이 없습니다</p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        )
      }
      {
        renderButton(isFirstFetch, nextSearchAfter, comments)
      }
    </Container>
  )
}

export default CommentManagement;