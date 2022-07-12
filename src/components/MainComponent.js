import React, { Component } from "react";
import Menu from "./MenuComponent";
import DishDetail from "./DishesDetail";
import { DISHES } from "../shared/dishes";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
// ../folder để import file nằm khác thư mục
// ./folder để import file cùng thư mục với file đang sử dụng
import { Switch, Route, Redirect } from "react-router-dom";
import { Navbar, NavbarBrand } from "reactstrap";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

class Main extends Component {
  // Tiếp theo cần khai báo state chứa biến DISHES
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS,
    };
  }
  onDishSelect(dishID) {
    this.setState({ selectedDish: dishID }); //Ở đây ta đang thay đổi thuộc tính của một state đó là selectedDish từ null => giá trị của biến dish
  }

  render() {
    const DishWithID = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishID, 10)
            )[0]
          } //trả về index đầu tiên từ object dishes
          comments={this.state.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishID, 10)
          )}
        />
      );
    };
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };
    console.log(this.state.leaders.filter((leader) => leader.featured));
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.state.dishes} />}
          />
          <Route path="/menu/:dishID" component={DishWithID} />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
