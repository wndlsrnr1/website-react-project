import {Button} from "reactstrap";

const Star = (props) => {
  const star = props.star;
  const idx = props.idx;
  const handler = props.onClick;

  return (
    <>
      <a type={"button"} style={{
        background: idx < star ?
          "url('/images/star2.png') 0px 0px / 30px 30px no-repeat"
          : "url('/images/star.png') 0px 0px / 30px 30px no-repeat",
        width: "35px",
        height: "35px",
        border: "0px"
      }}
              className={"bg-white p-1"} onClick={handler}
      />
    </>
  )
}

export default Star;