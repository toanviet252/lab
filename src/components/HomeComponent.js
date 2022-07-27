import React from "react";
import { Component } from "react/cjs/react.production.min";
import {
  Card,
  CardText,
  CardTitle,
  CardBody,
  CardImg,
  CardSubtitle,
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

function RenderCard({ item, isLoading, errMess }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else {
    return (
      <Card>
        <CardImg src={baseUrl + "/" + item.image} alt={item.name} />
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          {item.designation ? (
            <CardSubtitle>{item.designation}</CardSubtitle>
          ) : null}
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.promotion);
    console.log(this.props.leader);
    return (
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-md m-1">
            <RenderCard
              item={this.props.dish}
              isLoading={this.props.dishesLoading}
              errMess={this.props.dishesErrMess}
            />
          </div>
          <div className="col-12 col-md m-1">
            <RenderCard
              item={this.props.promotion}
              isLoading={this.props.promosLoading}
              errMess={this.props.promosErrMess}
            />
          </div>
          <div className="col-12 col-md m-1">
            <RenderCard item={this.props.leader} />
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
