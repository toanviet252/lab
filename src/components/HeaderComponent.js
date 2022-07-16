import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  handleLogin(event) {
    this.toggleModal();
    alert(`
    Username: ${this.username.value}
    Password: ${this.password.value}
    Remember user: ${this.remember.checked}
    `);
    event.prevenDefault();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container ">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                  <NavItem>
                    <NavLink className="nav-link" to="/home">
                      <img
                        src="assets/images/logo.png"
                        height="30"
                        width="41"
                        alt="Ristorante Con Fusion"
                      />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/home">
                      <span className="fa fa-home fa-lg">Home</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/aboutus">
                      <span className="fa fa-info fa-lg">About us</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/menu">
                      <span className="fa fa-list fa-lg">Menu</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/contactus">
                      <span className="fa fa-address-card fa-lg">
                        Contact us
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button oultine onClick={this.toggleModal}>
                  <span className="fa fa-sign-in fa-lg"></span>Login
                </Button>
              </NavItem>
            </Nav>
          </div>
        </Navbar>
        {/* Jumbotron là một phần không thể thiếu trong giao diện trong Bootstrap, tác dụng chính của Jumbotron làm tạo ra một vùng hiển thị nội dung quan trọng nhất của website như thông báo, giới thiệu, chương trình khuyến mại của doanh nghiệp đó. */}
        <Jumbotron>
          <div className="container">
            <div className="row row header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante con Fusion</h1>
                <p>
                  {" "}
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!{" "}
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={(input) => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={(input) => (this.password = input)}
                />
              </FormGroup>
              {/* checkbox */}
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remenber"
                    innerRef={(input) => (this.remember = input)}
                  />
                  Remember me
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}
export default Header;
