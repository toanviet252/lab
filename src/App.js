import React, { Component } from "react";
import "./App.css";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./components/MenuComponent";
// import biến DISHES bao gồm thông tin các món ăn từ file dishes.js trong folder shared
import { DISHES } from "./shared/dishes";

class App extends Component {
  // Tiếp theo cần khai báo state chứa biến DISHES
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  render() {
    return (
      <div>
        <Navbar dark color="warning">
          <div className="container ">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        {/* Bổ xung thêm đoạn code dishes={this.state.dishes} vào trong Menu */}
        <Menu dishes={this.state.dishes} />
      </div>
    );
  }
}

export default App;
