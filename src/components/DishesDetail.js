import React, { Component } from "react";
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
  Label,
  Row,
} from "reactstrap";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";

// Chuyển từ functional component sang class component
class DishDetail extends Component {
  constructor(props) {
    super(props);
  }
  RenderDish(dish) {
    console.log(dish);
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
  RenderComments(comments, addComment, dishID) {
    console.log("addComment", addComment);
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
          <CommentForm dishID={dishID} addComment={addComment} />
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>
              <this.props.errMess />
            </h4>
          </div>
        </div>
      );
    } else if (this.props.dish != null) {
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
              {this.RenderComments(
                this.props.comments,
                this.props.addComment,
                this.props.dish.id
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}
//////////////////////////////////////////////////////////
const requried = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => !val || val.length >= len;
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(
      this.props.dishID,
      values.rating,
      values.author,
      values.comment
    );
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span>Submit comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Commnents</ModalHeader>
          <ModalBody>
            <LocalForm
              onSubmit={(values) => this.handleSubmit(values)}
              className="ml-2"
            >
              <Row className="form-group">
                <Label htmlFor="rating">Rate</Label>
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author">Author</Label>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Your name"
                  className="form-control"
                  validators={{
                    requried,
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                ></Control.text>
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    requried: "Required",
                    minLength: "Must be more 2 characters",
                    maxLength: "Must be fewer 15 chacracters",
                  }}
                ></Errors>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  placeholder="Your comments"
                  className="form-control"
                ></Control.textarea>
              </Row>
              <Row className="form-group">
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default DishDetail;
