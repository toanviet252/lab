import React from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

// Biến class component thành 1 functional component
function RenderMenuItem({ dish, onClick }) {
  return (
    <Card>
      {/* Chuyển toàn bộ phần thông tin món ăn thành một link */}
      <Link to={`/menu/${dish.id}`}>
        <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
        <CardImgOverlay>
          <CardTitle heading>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

const Menu = function (props) {
  const menu = props.dishes.map((dish) => {
    return (
      //col-12 mt-5: độ rộng chiếm 12 cột và margin-top 5
      <div key={dish.id} className="col-12 col-md-5 m-1">
        {/* Gọi functional component ở phía trên */}
        <RenderMenuItem dish={dish} onClick={props.onClick} />
      </div>
    );
  });
  return (
    <div className="container">
      {/* Phần breadcrumb menu */}
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Menu</h3>
          <hr />
        </div>
      </div>
      <div className="row">{menu}</div>
    </div>
  );
};

export default Menu;
