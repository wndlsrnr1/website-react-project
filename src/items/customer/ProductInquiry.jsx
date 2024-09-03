import {Button, ButtonGroup, Input, InputGroup, InputGroupText} from "reactstrap";
import {useEffect, useState} from "react";
import {parseDate} from "../../utils/timeUtils";
import {fetchWithAuth} from "../../utils/fetchUtils";

const ProductInquiry = (props) => {

  //variables
  const itemId = props.itemId;
  const [toggleInquiryValue, setToggleInquiryValue] = useState(false);
  const [content, setContent] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [star, setStar] = useState(5);
  const [inquiryList, setInquiryList] = useState([]);

  //searching variables
  const [nextSearchAfter, setNextSearchAfter] = useState(null);
  const [sortType, setSortType] = useState("RECENT");
  const [withTotalCount, setWithTotalCount] = useState(false);

  //hooks

  const toggleInquiry = (toggleInquiryValue) => {
    setToggleInquiryValue(!toggleInquiryValue);
    setStar(5);
    setContent("");
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

    requestSearchInquiry();

    setLoaded(true);
  }, []);

  //onClicks
  const setStarOnClick = (idx) => {
    setStar(idx + 1);
  }

  //onSubmits
  const inquiryAddOnSubmit = (event) => {
    event.preventDefault();
    requestAddInquiry();
  }

  //onChanges
  const contentOnChangeInput = (event) => {
    event.preventDefault();
    const value = event.currentTarget.value;
    setContent(value);
  }

  //requests
  const requestAddInquiry = () => {
    const inquiryBody = {
      "itemId": itemId,
      "star": star,
      "content": content
    };
    fetchWithAuth("/comments", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(inquiryBody)
      }
    ).then(resp => {
      if (!resp.ok) {

        return;
      } else {
        setStar(5);
        setToggleInquiryValue(false);
        setContent("");
        requestSearchInquiry(true);
        //todo: request comment again.
      }
    })
  }

  const requestSearchInquiry = (reset) => {
    let path = "/comments"
    path += "?size=5";
    if (nextSearchAfter !== null && !reset) {
      path += "&searchAfter=" + nextSearchAfter;
    }
    path += "&withTotalCount=" + withTotalCount;
    path += "&sortType=" + sortType;
    path += "&itemId=" + itemId;
    fetchWithAuth(path, {method: "get"})
      .then(resp => {
        if (!resp.ok) {
          //todo: implement case in error
          return;
        } else {
          resp.json().then(data => {
            if (reset) {
              setInquiryList(data.body.items);
              setNextSearchAfter(data.body.nextSearchAfter);
              return;
            }
            const listForUpdate = [...inquiryList, ...data.body.items];
            setInquiryList(listForUpdate);
            setNextSearchAfter(data.body.nextSearchAfter);
          });
        }
      });
  }

  return (
    <div className={"content"}>
      <div>
        <Button className={"w-100 bg-primary mb-3"} onClick={() => toggleInquiry(toggleInquiryValue)}>문의하기</Button>
      </div>
      {
        toggleInquiryValue ? (
          <div className={"mb-3 border p-2"}>
            <form onSubmit={inquiryAddOnSubmit}>
              {/*<ButtonGroup className={"mb-1"}>*/}
              {/*  {*/}
              {/*    new Array(5).fill(0).map((elem, idx) => {*/}
              {/*      return (*/}
              {/*        <a key={elem.toString() + idx.toString()} style={{*/}
              {/*          background: getStarImage(idx, star), backgroundSize: "30px 30px",*/}
              {/*          width: "35px",*/}
              {/*          height: "35px",*/}
              {/*          border: "0px"*/}
              {/*        }}*/}
              {/*           className={"bg-white p-1"}*/}
              {/*           onClick={() => setStarOnClick(idx)}*/}
              {/*        />*/}
              {/*      )*/}
              {/*    })*/}
              {/*  }*/}
              {/*</ButtonGroup>*/}
              <InputGroup className={"mb-3"}>
                <InputGroupText>문의</InputGroupText>
                <Input className={"bg-white"} type={"textarea"} onChange={contentOnChangeInput} value={content}
                       maxLength={100} placeholder={"글을 입력해주세요."}/>
              </InputGroup>
              <div className={"d-flex justify-content-between"}>
                <div><span>{content.length} / 300</span></div>
                <Button>등록</Button>
              </div>
            </form>
          </div>
        ) : null
      }
      <div className={"mb-2"}>
        {
          inquiryList.length !== 0 ? (
              inquiryList.map((inquiry, idx) => {
                return (
                  <div className={"border-bottom pb-2 pt-2"}>
                    <div>
                      <span>{inquiry.username}</span>
                      <span className={"ms-2 me-2"}>|</span>
                      <span>{parseDate(inquiry["createdAt"])}</span>
                    </div>
                    <div>{inquiry.content}</div>
                  </div>
                )
              })
            ) :
            <div className={"border-bottom pb-2 pt-2"}>
              <div><span>문의 내용이 없습니다</span></div>
            </div>
        }

      </div>
      {
        nextSearchAfter !== null ?
          <div><Button onClick={() => requestSearchInquiry()}>더보기</Button></div>
          : null
      }
    </div>
  );
}

export default ProductInquiry;