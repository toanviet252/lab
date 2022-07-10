import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
    };
  }
  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container ">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-autp" href="/">
              <img
                src="assets/images/logo.png"
                height="30"
                width="41"
                alt="Ristorante Con Fusion"
              />
              <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                  <NavItem>
                    <NavLink className="nav-link" to="/home">
                      <span className="fa fa-home fa-lg">Home</span>
                    </NavLink>
                    <NavLink className="nav-link" to="/aboutus">
                      <span className="fa fa-info fa-lg">About us</span>
                    </NavLink>
                    <NavLink className="nav-link" to="/menu">
                      <span className="fa fa-list fa-lg">Menu</span>
                    </NavLink>
                    <NavLink className="nav-link" to="/contactus">
                      <span className="fa fa-address-card fa-lg">
                        Contact us
                      </span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </NavbarBrand>
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
      </React.Fragment>
    );
  }
}
export default Header;
