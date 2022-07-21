import React from "react";
import {
  Card,
  CardText,
  CardBody,
  CardImg,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Col,
  Row,
} from "reactstrap";

import { Link } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !Number.isNaN(Number(val));
const numRange = (val) => val > 0;

// Hàm render toàn bộ staff
function RenderStaff({ staff }) {
  return (
    <Link to={`/nhanvien/${staff.id}`}>
      <CardBody>
        <CardImg src={staff.image}></CardImg>
        <CardText className="text-center"> {staff.name}</CardText>
      </CardBody>
    </Link>
  );
}

class Staffs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameF: "",
      isModalOpen: false,
    };
    // gọi hàm để nhận event
    this.findStaff = this.findStaff.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // Hàm tìm kiếm nhân viên
  findStaff(event) {
    const nameS = event.target.nameS.value;
    this.setState({ nameF: nameS });
    event.preventDefault();
  }
  // Modal open function
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  // Hàm xử lý khi nhấn button 'thêm'
  handleSubmit(values) {
    alert("Thêm nhân viên thành công");
    // Lấy thông tin nhân viên vừa nhập
    const newStaff = {
      name: values.name,
      doB: values.doB,
      startDate: values.startDate,
      department: values.department,
      salaryScale: values.salaryScale,
      annualLeave: values.annualLeave,
      overTime: values.overTime,
      image: "/assets/images/alberto.png",
    };
    // Thêm nhân viên vào state của component cha
    if (newStaff.name.trim() === "") {
      alert("Vui lòng nhập đủ các trường");
    } else {
      this.props.onAdd(newStaff);
      //onAdd được viết trong MainComponent
    }
  }

  render() {
    const staffList = this.props.staffs
      .filter((val) => {
        // Nếu người dùng ko nhập ký tự gì thì trả về toàn bộ mảng
        if (this.state.nameF === "") {
          return val;
        }
        // Nếu tên nhân viên chứa ký tự trong input tìm kiếm (chuyển tất cả tên về dạng chữ thường)
        else if (
          val.name.toLowerCase().includes(this.state.nameF.toLowerCase())
        )
          return val;
      })
      .map((staff) => {
        return (
          <div key={staff.id} className="col-lg-2 col-md-3 col-sm-6">
            <Card className="mb-3">
              <RenderStaff staff={staff} onClick={this.props.onClick} />
            </Card>
          </div>
        );
      });
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb className="ml-3">
            <BreadcrumbItem>
              <Link to="/nhanvien">Nhân viên</Link>
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-4">
            <Button className="ml-auto mt-1" onClick={this.toggleModal}>
              <span className="fa fa-plus fa-lg"></span>
            </Button>
          </div>
          <div className="col-12 col-md-6">
            <Form onSubmit={this.findStaff} className="form-group row">
              <div className="col-8 mt-1">
                <Input
                  type="text"
                  id="nameS"
                  name="nameS"
                  placeholder="Tìm kiến tên nhân viên"
                />
              </div>
              <div className="col-4 mt-1">
                <Button color="primary" type="submit" className="search">
                  Tìm kiếm
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <div className="row ml-1">
          <p>
            <em>Bấm vào nhân viên để xem thông tin chi tiết</em>
          </p>
        </div>
        <div className="row">{staffList}</div>
        {/* Modal Controlled Form */}
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            {/* Controlled Form -Modal*/}
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="name" md={4}>
                  Tên nhân viên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Nhập tên nhân viên"
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
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.select
                    model=".department"
                    id="department"
                    name="department"
                    defaultValue="Dept01"
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
                    model=".annualLeave"
                    show="touched"
                    messages={{
                      isNumber: "Vui lòng nhập số",
                    }}
                  ></Errors>
                </Col>
              </Row>
              <Row className="form-group">
                <Button type="submit" color="primary" className="offset-10">
                  Thêm
                </Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default Staffs;
