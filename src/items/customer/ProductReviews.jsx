import {Button, ButtonGroup, Input, InputGroup, InputGroupText} from "reactstrap";
import {useState} from "react";

const ProductReviews = (props) => {

  //variables
  const [toggleReviewValue, setToggleReviewValue] = useState(false);
  const [content, setContent] = useState("");

  //hooks

  //useEffects

  //onClicks

  const toggleReview = (trv) => {
    setToggleReviewValue(!trv);
  }

  //onSubmits

  //onChanges

  const contentOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setContent(value);
  }

  //requests
  return (
    <div className={"content"}>
      <div>
        <Button className={"w-100 bg-primary mb-3"} onClick={() => toggleReview(toggleReviewValue)}>후기작성</Button>
      </div>
      {
        toggleReviewValue ? (
          <div className={"mb-3 border p-2"}>
            <ButtonGroup className={"mb-3"}>
              <button style={{background: "url('/attachment/1') 0 0px no-repeat", backgroundSize: "30px 30px", width: "35px", height: "35px", border: "0px"}} className={"bg-white p-1"}/>
              <button style={{background: "url('/attachment/1') 0 0px no-repeat", backgroundSize: "30px 30px", width: "35px", height: "35px", border: "0px"}} className={"bg-white p-1"}/>
              <button style={{background: "url('/attachment/1') 0 0px no-repeat", backgroundSize: "30px 30px", width: "35px", height: "35px", border: "0px"}} className={"bg-white p-1"}/>
              <button style={{background: "url('/attachment/1') 0 0px no-repeat", backgroundSize: "30px 30px", width: "35px", height: "35px", border: "0px"}} className={"bg-white p-1"}/>
              <button style={{background: "url('/attachment/1') 0 0px no-repeat", backgroundSize: "30px 30px", width: "35px", height: "35px", border: "0px"}} className={"bg-white p-1"}/>
            </ButtonGroup>
            <InputGroup className={"mb-3"}>
              <InputGroupText>리뷰</InputGroupText>
              <Input className={"bg-white"} type={"textarea"} onChange={contentOnChangeInput} value={content}/>
            </InputGroup>
            <div className={"d-flex justify-content-between"}>
              <div><span>1 / 300</span></div>
              <Button>등록</Button>
            </div>
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