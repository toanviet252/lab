import React from "react";
import { Link } from "react-router-dom";
import {
  CardBody,
  CardText,
  CardImg,
  Breadcrumb,
  BreadcrumbItem,
  Card,
} from "reactstrap";
import { Loading } from "./LoadingComponent";

function RenderStaffDetail({ staff }) {
  return (
    <Card className="col-12 col-md-5 col-lg-2 m-2">
      <Link to={`/nhanvien/${staff.id}`}>
        <CardBody>
          <CardImg src={staff.image}></CardImg>
          <CardText className="text-center"> {staff.name}</CardText>
        </CardBody>
      </Link>
    </Card>
  );
}

const DepartDetail = function (props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>
            <props.errMess />
          </h4>
        </div>
      </div>
    );
  } else if (props.staffOfDepart != null) {
    return (
      <div className="container">
        <div className="row mt-2">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/phongban">Phòng Ban</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              Danh sách nhân viên trong phòng ban
            </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.staffOfDepart.name}</h3>
            <hr />
          </div>
        </div>

        <div className="row">
          {props.staffOfDepart.map((staff) => {
            return (
              <RenderStaffDetail staff={staff} department={props.departments} />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DepartDetail;
