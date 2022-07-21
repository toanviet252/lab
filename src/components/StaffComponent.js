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
  FormGroup,
  Label,
  Col,
  FormFeedback,
} from "reactstrap";

import { Link } from "react-router-dom";
import { Component } from "react/cjs/react.production.min";

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
      //state ban đầu khi chưa nhập
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: "Dept01",
      annualLeave: 1,
      overTime: 0,
      image: "/assets/images/alberto.png",
      touched: {
        name: false,
        doB: false,
        startDate: false,
        department: false,
        salaryScale: false,
      },
    };
    // gọi hàm để nhận event
    this.findStaff = this.findStaff.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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
  handleSubmit(event) {
    alert("Thêm nhân viên thành công");
    // Lấy thông tin nhân viên vừa nhập
    const newStaff = {
      name: this.state.name,
      doB: this.state.doB,
      startDate: this.state.startDate,
      department: this.state.department,
      salaryScale: this.state.salaryScale,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: this.state.image,
    };
    // Thêm nhân viên vào state của component cha
    this.props.onAdd(newStaff);
    //onAdd được viết trong MainComponent

    event.preventDefault();
  }
  // Hàm xử lý thay đổi input
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // Thay đổi giá trị state
    this.setState({
      [name]: value,
    });
  }
  // Hàm kiểm soát giá trị nhập vào input
  handleBlur = (field) => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };
  // Validate value input
  validate(name, doB, startDate, department) {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
      department: "",
    };
    if (this.state.touched.name && name.length < 5)
      errors.name = "Nhập đầy đủ họ và tên";
    if (this.state.touched.doB && doB.length < 1) errors.doB = "Yêu cầu nhập";
    if (this.state.touched.startDate && startDate.length < 1)
      errors.startDate = "Yêu cầu nhập";
    if (this.state.touched.department && department.value == "")
      errors.department = "Yêu cầu chọn";
    return errors;
  }

  render() {
    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.startDate,
      this.state.department
    );
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
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label htmlFor="name" md={4}>
                  Tên nhân viên
                </Label>
                <Col md={8}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nhập tên nhân viên"
                    value={this.state.name}
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur("name")}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="doB" md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="doB"
                    name="doB"
                    value={this.state.doB}
                    valid={errors.doB === ""}
                    invalid={errors.doB !== ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur("doB")}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="startDate" md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={this.state.startDate}
                    valid={errors.startDate === ""}
                    invalid={errors.startDate !== ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur("startDate")}
                  />
                  <FormFeedback>{errors.startDate} </FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="department" md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Input
                    type="select"
                    id="department"
                    name="department"
                    value={this.state.department}
                    valid={errors.department === ""}
                    invalid={errors.department !== ""}
                    onChange={this.handleInputChange}
                    onBlur={this.handleBlur("department")}
                  >
                    <option value="Dept01">Sale</option>
                    <option value="Dept02">HR</option>
                    <option value="Dept03">Marketing</option>
                    <option value="Dept04">IT</option>
                    <option value="Dept05">Finance</option>
                  </Input>
                  <FormFeedback>{errors.department}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="salaryScale" md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input
                    type="number"
                    id="salaryScale"
                    name="salaryScale"
                    value={this.state.salaryScale}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="annualLeave" md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Input
                    type="number"
                    id="annualLeave"
                    name="annualLeave"
                    value={this.state.annualLeave}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="overTime" md={4}>
                  Số ngày làm thêm
                </Label>
                <Col md={8}>
                  <Input
                    type="number"
                    id="overTime"
                    name="overTime"
                    value={this.state.overTime}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Button type="submit" color="primary" className="offset-10">
                  Thêm
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default Staffs;
