import React, { Component } from "react";
import { Card, CardTitle, CardBody, CardImg, CardText } from "reactstrap";
import dateFormat from "dateformat";

class Staffs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null,
      className: "col-12 col-md-5 col-lg-3 m-2 ",
    };
  }
  //   Hàm lấy giá trị render cho staff
  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }
  //   Hàm lấy giá trị render cho số cột
  onClassSelect(col) {
    this.setState({ className: col });
  }
  // Hàm render từng staff
  renderStaff(staff, role) {
    if (staff != null) {
      return (
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
              <CardText>Phòng ban: {staff.department.name}</CardText>
              <CardText>Chức danh: {role.NORMAL_STAFF}</CardText>
              <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
              <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
            </CardBody>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    console.log(this.props);
    // Lọc lấy dữ liệu staffs gồm các object
    const staff = this.props.staffs.map((staff) => {
      return (
        <div key={staff.id} className={this.state.className}>
          <Card onClick={() => this.onStaffSelect(staff)}>
            <CardText className="btn btn-light">{staff.name} </CardText>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row col-12">
          <button
            onClick={() => this.onClassSelect("col-2 mb-2")}
            className="btn btn-success m-3"
          >
            6 cột
          </button>
          <button
            onClick={() => this.onClassSelect("col-2 mr-3 mb-2")}
            className="btn btn-success m-3"
          >
            5 cột
          </button>
          <button
            onClick={() => this.onClassSelect("col-3 mb-2")}
            className="btn btn-success m-3"
          >
            4 cột
          </button>
          <button
            onClick={() => this.onClassSelect("col-4 mb-2 ")}
            className="btn btn-success m-3"
          >
            3 cột
          </button>
          <button
            onClick={() => this.onClassSelect("col-6 mb-2")}
            className="btn btn-success m-3"
          >
            2 cột
          </button>
          <button
            onClick={() => this.onClassSelect("col-12 mb-2")}
            className="btn btn-success m-3"
          >
            1 cột
          </button>
        </div>
        <div className="row">{staff}</div>
        <div className="row ml-1">
          <p>Bấm vào tên nhân viên để xem thông tin</p>
        </div>
        <div className="row">
          {this.renderStaff(this.state.selectedStaff, this.props.roles)}
        </div>
      </div>
    );
  }
}
export default Staffs;
