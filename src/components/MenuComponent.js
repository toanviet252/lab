import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";

class Menu extends Component {
  constructor(props) {
    super(props); //Lấy thuộc tính props từ class cha "Component"
    this.state = {
      selectedDish: null,
    };
  }
  onDishSelect(dish) {
    this.setState({ selectedDish: dish }); //Ở đây ta đang thay đổi thuộc tính của một state đó là selectedDish từ null => giá trị của biến dish
  }
  //   Tạo hàm render các món ăn
  renderDish(dish) {
    if (dish != null) {
      return (
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
          <CardBody>
            <CardTitle heading>{dish.name}</CardTitle>
            <CardText>{dish.description} </CardText>
          </CardBody>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    // Đổi state thành props từ lab3.01
    const menu = this.props.dishes.map((dish) => {
      return (
        //col-12 mt-5: độ rộng chiếm 12 cột và margin-top 5
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
            <CardImgOverlay>
              <CardTitle heading>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row">{this.renderDish(this.state.selectedDish)}</div>
      </div>
    );
  }
}

export default Menu;
