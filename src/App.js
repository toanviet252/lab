import React, { Component } from "react";
import "./App.css";
import { Navbar, NavbarBrand } from "reactstrap";
import Staffs from "./components/StaffComponent";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container ">
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <Staffs />
      </div>
    );
  }
}

export default App;
