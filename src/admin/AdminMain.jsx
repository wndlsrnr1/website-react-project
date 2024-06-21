import {Link} from "react-router-dom";
import {Container} from "reactstrap";

const AdminMain = () => {

  return (
    <>
      <Container className={"mt-5"}>
        <ul>
          <li>
            <Link to={"/admin/categories"} className={"h-100"}>카테고리 관리</Link>
          </li>
          <li>
            <Link to={"/admin/subcategories"} className={"h-100"}>서브 카테고리 관리</Link>
          </li>
          <li>
            <Link to={"/admin/items"} className={"h-100"}>아이템 관리</Link>
          </li>
          <li>
            <Link to={"/admin/items"} className={"h-100"}>아이템 관리</Link>
          </li>
          <li>
            <Link to={"/admin/home/items/carousel"} className={"h-100"}>홈 캐러셀 관리</Link>
          </li>
        </ul>
      </Container>

    </>
  )
}

export default AdminMain;