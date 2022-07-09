import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./MenuComponent";
// import biến DISHES bao gồm thông tin các món ăn từ file dishes.js trong folder shared
import DishDetail from "./DishesDetail";
import { DISHES } from "../shared/dishes";

class Main extends Component {
  // Tiếp theo cần khai báo state chứa biến DISHES
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }
  onDishSelect(dishID) {
    this.setState({ selectedDish: dishID }); //Ở đây ta đang thay đổi thuộc tính của một state đó là selectedDish từ null => giá trị của biến dish
  }

  render() {
    return (
      <div>
        <Navbar dark color="warning">
          <div className="container ">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        {/* Gọi Menu component */}
        <Menu
          dishes={this.state.dishes}
          onClick={(dishID) => this.onDishSelect(dishID)}
        />
        {/* Gọi component DishDetail*/}
        <DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === this.state.selectedDish
            )[0]
          }
        />
      </div>
    );
  }
}

export default Main;
