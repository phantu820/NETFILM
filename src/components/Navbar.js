import { Navbar, Nav, Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";

const Navigation = (props) => {
  const navigate = useNavigate();
  const id = window.localStorage.getItem("id");
  const users = localStorage.getItem("users");
  const searchInputRef = useRef(null);
  const [usersList] = useState([JSON.parse(users)]);
  const handleLogout = () => {
    // Xử lý đăng xuất
    window.localStorage.removeItem("id");
    window.location.reload();
  };
  console.log(usersList[0]?.find((user) => user.id == id));

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">NetFilm</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Trang chủ</Nav.Link>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                ref={searchInputRef}
              />
              <Button
                variant="outline-success"
                onClick={() => {
                  navigate("/");
                  props.setSearchQuery != null &&
                    props.setSearchQuery(searchInputRef.current.value);
                  props.handleSearch != null && props.handleSearch();
                }}
              >
                Search
              </Button>
            </Form>
          </Nav>
          <Nav>
            {id ? (
              <>
                <Navbar.Text className="me-2">
                  {" "}
                  Chào mừng:{" "}
                  {usersList[0].find((user) => user.id == id).fullname}{" "}
                </Navbar.Text>
                <Nav.Link onClick={handleLogout}>Đăng xuất</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="#deets" onClick={() => navigate("/login")}>
                  Đăng nhập
                </Nav.Link>
                <Nav.Link
                  eventKey={2}
                  href="#memes"
                  onClick={() => navigate("/register")}
                >
                  Đăng ký
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
