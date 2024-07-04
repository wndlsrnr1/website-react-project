import {Button} from "reactstrap";

const ProductInquiry = (props) => {

  return (
    <div className={"content"}>
      <div>
        <Button>문의하기</Button>
      </div>
      <div>
        <div>
          <span>사람이름</span>
          <span>|</span>
          <span>날짜</span>
        </div>
        <div>글 내용</div>
        <div>답변 내용</div>
      </div>
      <div><Button>더보기</Button></div>
    </div>
  )
}

export default ProductInquiry;