import React, { Component } from "react";
import Menu from "./MenuComponent";
import DishDetail from "./DishesDetail";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
// ../folder để import file nằm khác thư mục
// ./folder để import file cùng thư mục với file đang sử dụng
import About from "./AboutUs.Component";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

class Main extends Component {
  // Tiếp theo cần khai báo state chứa biến DISHES
  constructor(props) {
    super(props);
  }

  render() {
    const DishWithID = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishID, 10)
              //parseInt phân tích cú pháp một giá trị dạng string và trả về số nguyên đầu tiên, 10 ở đây là chọn hệ số thập phân
            )[0]
          } //trả về index đầu tiên từ object dishes
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishID, 10)
          )}
        />
      );
    };

    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishID" component={DishWithID} />
          <Route exact path="/contactus" component={Contact} />
          <Route
            path="/aboutus"
            component={() => <About leaders={this.props.leaders} />}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps(Main)));
