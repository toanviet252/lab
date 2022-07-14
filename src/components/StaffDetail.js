import React from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import {
  Card,
  CardBody,
  CardText,
  CardImg,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

function RenderStaffDetail({ staff }) {
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
          <CardText>Phòng ban: {staff.department.name}</CardText>
          <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
          <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
        </CardBody>
      </div>
    </div>
  );
}

const StaffDetail = function (props) {
  if (props.staff != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/nhanvien">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.staff.name}</h3>
            <hr />
          </div>
        </div>

        <div className="row">
          <div className="col-12 m-1">
            <RenderStaffDetail staff={props.staff} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default StaffDetail;
