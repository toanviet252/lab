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
} from "reactstrap";
import { Loading } from "./LoadingComponent";

function RenderStaffDetail({ staff, department }) {
  const staffDepart = department.filter((x) => x.id === staff.departmentId)[0];
  console.log(staffDepart);
  return (
    <div className="container">
      <div className="row">
        <CardImg src={staff.image} className="col-sm-12 col-md-3"></CardImg>
        <CardBody>
          <CardTitle heading>Tên nhân viên: {staff.name}</CardTitle>
          <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
          <CardText>
            Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
          </CardText>
          <CardText>Phòng ban: {staffDepart.name} </CardText>
          <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
          <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
        </CardBody>
      </div>
    </div>
  );
}

class StaffDetail extends Component {
  constructor(props) {
    super(props);
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
              <Button color="success">Cập nhật thông tin</Button>
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
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default StaffDetail;
