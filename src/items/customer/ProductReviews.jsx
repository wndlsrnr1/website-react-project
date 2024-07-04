import {Button} from "reactstrap";

const ProductReviews = (props) => {
  return (
    <div className={"content"}>
      <div>
        <Button>후기작성</Button>
      </div>
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
  )
}

export default ProductReviews;