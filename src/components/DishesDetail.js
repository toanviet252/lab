import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import dateFormat from "dateformat";
import { NavLink, Link } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";

// Chuyển từ functional component sang class component
class DishDetail extends Component {
  RenderDish(dish) {
    return (
      <div className="col-12 ">
        <Card>
          <CardImg width="100%" src={dish.image} value={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
  RenderComments(comments) {
    console.log(comments);
    if (comments != null) {
      return (
        <div className="col-12">
          <h4>Comments</h4>
          {/* list-unstyled để bỏ dấu chấm của list li */}
          <ul className="list-unstyled">
            {comments.map((comment) => {
              return (
                <li key={comments.id}>
                  <p>{comment.comment}</p>
                  <p>
                    -- {comment.author},{" "}
                    {dateFormat(comment.date, "dd/mm/yyyy")}
                  </p>
                </li>
              );
            })}
          </ul>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg"></span>Submit comment
          </Button>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      yourname: "",
      touched: {
        yourname: false,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };
  handleInputChange(evt) {
    const target = evt.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  validate(yourname) {
    const errors = {
      yourname: "",
    };
    if (this.state.touched.yourname && yourname.length < 3)
      errors.yourname = "Should be more 2 characters";
    else if (this.state.touched.yourname && yourname.length > 15)
      errors.yourname = "Should be less 15 characters";
    return errors;
  }

  render() {
    const errors = this.validate(this.state.yourname);
    if (this.props.dish != null) {
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{this.props.dish.name}</h3>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-5 m-1">
              {this.RenderDish(this.props.dish)}
            </div>
            <div className="col-12 col-md-5 m-1">
              {this.RenderComments(this.props.comments)}
            </div>
          </div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>
              Submit Commnents
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label htmlFor="rate">Rate</Label>
                  <Input type="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="yourname">Your Name</Label>
                  <Input
                    type="text"
                    id="yourname"
                    name="yourname"
                    placeholder="Your name"
                    value={this.state.yourname}
                    onChange={this.handleInputChange}
                    valid={errors.yourname === ""}
                    invalid={errors.yourname !== ""}
                    onBlur={this.handleBlur("yourname")}
                  ></Input>
                  <FormFeedback>{errors.yourname}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="comment">Comment</Label>
                  <Input
                    type="textarea"
                    id="comment"
                    name="comment"
                    placeholder="Your comments"
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishDetail;
