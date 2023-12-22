import {Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {useEffect, useState} from "react";

const Categories = () => {

  const [dropDownList, setDropDownList] = useState({});
  const [categories, setCategories] = useState(null);
  const [subCategories, setSubCategories] = useState(null);
  const [loaded, setLoaded] = useState(false);

  //눌렀을 떄 반응, reactstrap에서 설명한 토글이 이벤트가 발생할때 모두 발생
  const toggle = (id) => {
    // console.log(id);
    // console.log(dropDownList[id]);
    // console.log(dropDownList)
    if (dropDownList[id] === true) {
      dropDownList[id] = false;
      setDropDownList({...dropDownList});
      return;
    }
    dropDownList[id] = true;
    setDropDownList({...dropDownList});
  };

  const dropdownOpen = (id) => {
    if (dropDownList?.id === null) {
      return false;
    }

    return dropDownList[id];
  }

  useEffect(() => {
    if (loaded) {
      return;
    }
    fetch("/category", {method: "get"}).then((resp) => {
      return resp.json()
    }).then((data) => {
      console.log(data);
      setCategories(data.data);
    });
    setLoaded(true);
  }, [categories, subCategories, loaded])

  //forCheck
  useEffect(() => {
    // console.dir(categories);
  });

  // fetch("/category", {method: "get"})
  //   .then((resp) => resp.json())
  //   .then((data) => {
  //     console.log(data);
  //   });

  return (<Container className={"d-flex justify-content-center"}>
      {categories !== null ? categories.map((element, index) => {
          return (
            <Dropdown isOpen={dropdownOpen(element.id)} toggle={() => toggle(element.id)}
                      className={"flex-grow-1 pe-1"} key={element + index}>
              <DropdownToggle itemID={element.id} caret size="lg" className={"w-100"}>
                {element.nameKor}
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem header>{element.nameKor + "의관련 항목"}</DropdownItem>
                {
                  element.subcategories.map((subElement) => {
                    return < DropdownItem itemID={subElement.id} tag={"a"} href={"/subcategory/" + subElement.id}> {subElement.name} < /DropdownItem>
                  })
                }
              </DropdownMenu>
            </Dropdown>
          )
        }) :
        null
      }
    </Container>
  );
}

export default Categories;