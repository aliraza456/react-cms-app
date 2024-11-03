import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Form,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";

const Header = ({ setSearchQuery }) => {
  return (
    <Navbar color="dark" expand="md" dark container>
      <NavbarBrand tag={Link} to="/">
        Media CMS App
      </NavbarBrand>
      <NavbarToggler onClick={function noRefCheck() {}} />
      <Collapse navbar>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">
              All Media
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/admin">
              Admin
            </NavLink>
          </NavItem>
        </Nav>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Input
            type="search"
            placeholder="Search Media"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form>
      </Collapse>
    </Navbar>
  );
};

export default Header;