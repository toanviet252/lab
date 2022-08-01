import React, { Component } from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import {
  CardBody,
  CardText,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Col,
  Row,
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { LocalForm, Errors, Control } from "react-redux-form";
import { FadeTransform } from "react-animation-components";

function RenderStaffDetail({ staff, department }) {
  const staffDepart = department.filter((x) => x.id === staff.departmentId)[0];
  console.log(staffDepart);
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.8) translateY(-50%)",
      }}
    >
      <div className="container">
        <div className="row">
          <CardImg src={staff.image} className="col-sm-12 col-md-3"></CardImg>
          <CardBody>
            <CardTitle heading>Tên nhân viên: {staff.name}</CardTitle>
            <CardText>
              Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
            </CardText>
            <CardText>
              Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
            </CardText>
            <CardText>Phòng ban: {staffDepart && staffDepart.name}</CardText>
            <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
            <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
          </CardBody>
        </div>
      </div>
    </FadeTransform>
  );
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !Number.isNaN(Number(val));
const numRange = (val) => val > 0;

class StaffDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }
  // Hàm handle Submit
  handleSubmit(values) {
    console.log(values);
    this.toggleModal();
    // Lấy thông tin nhân viên vừa nhập
    this.props.updateStaff(
      this.props.staff.id,
      values.name,
      values.doB,
      values.startDate,
      values.departmentId,
      values.salaryScale,
      values.annualLeave,
      values.overTime
    );
  }
  render() {
    console.log(this.props.staff && this.props.staff.doB);
    console.log(this.props.staff && this.props.staff.id);
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
    } else if (this.props.staff != null) {
      return (
        <div className="container">
          <div className="row m-1">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/nhanvien">Nhân viên</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{this.props.staff.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{this.props.staff.name}</h3>
              <Button color="success" onClick={this.toggleModal}>
                Cập nhật thông tin
              </Button>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-12 ">
              <RenderStaffDetail
                staff={this.props.staff}
                department={this.props.departments}
              />
            </div>
          </div>
          {/* Modal window */}
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
            <ModalBody>
              {/* Controlled Form -Modal*/}
              <LocalForm
                onSubmit={(values) => this.handleSubmit(values)}
                initialState={{
                  ...this.props.staff,
                  ...{ doB: dateFormat(this.props.staff.doB, "yyyy-mm-dd") },
                  ...{
                    startDate: dateFormat(
                      this.props.staff.startDate,
                      "yyyy-mm-dd"
                    ),
                  },
                }}
              >
                <Row className="form-group">
                  <Label htmlFor="name" md={4}>
                    Cập nhật thông tin
                  </Label>
                  <Col md={8}>
                    <Control.text
                      model=".name"
                      id="name"
                      name="name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(30),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        required: "",
                        minLength: "Nhập nhiều hơn 3 ký tự",
                        maxLength: "Nhập ít hơn 30 ký tự",
                      }}
                    ></Errors>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="doB" md={4}>
                    Ngày sinh
                  </Label>
                  <Col md={8}>
                    <Control
                      type="date"
                      model=".doB"
                      id="doB"
                      name="doB"
                      className="form-control"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".doB"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập",
                      }}
                    ></Errors>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="startDate" md={4}>
                    Ngày vào công ty
                  </Label>
                  <Col md={8}>
                    <Control
                      type="date"
                      model=".startDate"
                      id="startDate"
                      name="startDate"
                      className="form-control"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".startDate"
                      show="touched"
                      messages={{
                        required: "Yêu cầu nhập",
                      }}
                    ></Errors>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="departmentId" md={4}>
                    Phòng ban
                  </Label>
                  <Col md={8}>
                    <Control.select
                      model=".departmentId"
                      id="departmentId"
                      name="departmentId"
                      className="form-control"
                    >
                      <option value="Dept01">Sale</option>
                      <option value="Dept02">HR</option>
                      <option value="Dept03">Marketing</option>
                      <option value="Dept04">IT</option>
                      <option value="Dept05">Finance</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="salaryScale" md={4}>
                    Hệ số lương
                  </Label>
                  <Col md={8}>
                    <Control.text
                      model=".salaryScale"
                      id="salaryScale"
                      name="salaryScale"
                      className="form-control"
                      validators={{
                        isNumber,
                        numRange,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".salaryScale"
                      show="touched"
                      messages={{
                        isNumber: "Vui lòng nhập số. ",
                        numRange: "Nhập số lớn hơn hoặc bằng 1",
                      }}
                    ></Errors>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="annualLeave" md={4}>
                    Số ngày nghỉ còn lại
                  </Label>
                  <Col md={8}>
                    <Control
                      type="text"
                      model=".annualLeave"
                      id="annualLeave"
                      name="annualLeave"
                      className="form-control"
                      validators={{
                        isNumber,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".annualLeave"
                      show="touched"
                      messages={{
                        isNumber: "Vui lòng nhập số",
                      }}
                    ></Errors>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="overTime" md={4}>
                    Số ngày làm thêm
                  </Label>
                  <Col md={8}>
                    <Control
                      type="text"
                      model=".overTime"
                      id="overTime"
                      name="overTime"
                      className="form-control"
                      validators={{
                        isNumber,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".overTime"
                      show="touched"
                      messages={{
                        isNumber: "Vui lòng nhập số",
                      }}
                    ></Errors>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Button type="submit" color="primary" className="offset-9">
                    Cập nhật
                  </Button>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default StaffDetail;
