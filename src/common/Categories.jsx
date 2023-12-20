import {Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import List from "reactstrap/es/List";
import {useState} from "react";

const Categories = () => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Container className={"d-flex justify-content-center"}>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} className={"flex-grow-1 pe-1"}>
        <DropdownToggle caret size="lg" className={"w-100"}>
          Category1
        </DropdownToggle>
        <DropdownMenu className={"w-100"}>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem>Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} className={"flex-grow-1 pe-1"}>
        <DropdownToggle caret size="lg" className={"w-100"}>
          Category2
        </DropdownToggle>
        <DropdownMenu className={"w-100"}>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem>Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} className={"flex-grow-1 pe-1"}>
        <DropdownToggle caret size="lg" className={"w-100"}>
          Category3
        </DropdownToggle>
        <DropdownMenu className={"w-100"}>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem>Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} className={"flex-grow-1 pe-1"}>
        <DropdownToggle caret size="lg" className={"w-100"}>
          Category4
        </DropdownToggle>
        <DropdownMenu className={"w-100"}>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem>Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} className={"flex-grow-1 pe-1"}>
        <DropdownToggle caret size="lg" className={"w-100"}>
          Category5
        </DropdownToggle>
        <DropdownMenu className={"w-100"}>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem>Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Container>


  )
}

export default Categories;