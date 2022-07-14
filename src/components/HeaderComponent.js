import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
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
            <NavbarBrand className=" mr-auto">
              <NavLink className="nav-link" to="/nhanvien">
                <img
                  src="assets/images/logo.png"
                  height="30"
                  width="41"
                  alt="Ristorante Con Fusion"
                />
              </NavLink>
              <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                  <NavItem className="mr-2">
                    <NavLink className="nav-link" to="/nhanvien">
                      <span className="fa fa-users fa-lg"> Nhân viên</span>
                    </NavLink>
                  </NavItem>
                  <NavItem className="mr-2">
                    <NavLink className="nav-link" to="/phongban">
                      <span className="fa fa-briefcase fa-lg"> Phòng ban</span>
                    </NavLink>
                  </NavItem>
                  <NavItem className="mr-2">
                    <NavLink className="nav-link" to="/bangluong">
                      <span className="fa fa-money fa-lg"> Bảng lương</span>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </NavbarBrand>
          </div>
        </Navbar>
      </React.Fragment>
    );
  }
}
export default Header;
