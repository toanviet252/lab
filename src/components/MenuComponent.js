import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";

// Biến class component thành 1 functional component
function RenderMenuItem({ dish, onClick }) {
  return (
    <Card>
      <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
      <CardImgOverlay>
        <CardTitle heading>{dish.name}</CardTitle>
      </CardImgOverlay>
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
      <div className="row">{menu}</div>
    </div>
  );
};

export default Menu;
