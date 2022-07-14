import React from "react";
import {
  Card,
  CardText,
  CardBody,
  CardImg,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

import { Link } from "react-router-dom";

// Hàm render toàn bộ staff
function RenderStaff({ staff }) {
  return (
    <div className="container">
      <div className="row">
        <Link to={`/nhanvien/${staff.id}`}>
          <CardBody>
            <CardImg src={staff.image}></CardImg>
            <CardText className="text-center"> {staff.name}</CardText>
          </CardBody>
        </Link>
      </div>
    </div>
  );
}
const Staffs = function (props) {
  // Lọc lấy dữ liệu staffs gồm các object

  const staffList = props.staffs.map((staff) => {
    return (
      <div key={staff.id} className="col-lg-2 col-md-3 col-sm-6">
        <Card className="mb-3">
          <RenderStaff staff={staff} onClick={props.onClick} />
        </Card>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/nhanvien">Nhân viên</Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Danh sách nhân viên</h3>
          <hr />
        </div>
      </div>
      <div className="row">{staffList}</div>
      <div className="row ml-1">
        <p>
          <em>Bấm vào nhân viên để xem thông tin chi tiết</em>
        </p>
      </div>
    </div>
  );
};
export default Staffs;
