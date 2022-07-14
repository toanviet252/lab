import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

// Hàm tính lương
function calcSalary(salaryScale, overTime) {
  const basicSal = 3000000;
  const overTimeSal = 200000;
  return salaryScale * basicSal + overTime * overTimeSal;
}

function RenderSalrary({ salary, salaryValue }) {
  return (
    <div className="container">
      <div className="row">
        <Card>
          <CardBody>
            <CardTitle>{salary.name}</CardTitle>
            <CardText>Mã nhân viên:{salary.id}</CardText>
            <CardText>Hệ số lương:{salary.salaryScale}</CardText>
            <CardText>Số ngày làm thêm:{salary.overTime}</CardText>
            <Card>
              <CardTitle>Lương:{salaryValue} VNĐ</CardTitle>
            </Card>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

const SalaryTable = function (props) {
  const salary = props.luong.map((salary) => {
    return (
      <div key={salary.id}>
        <RenderSalrary
          salary={salary}
          salaryValue={calcSalary(salary.salaryScale, salary.overTime)}
        />
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
          <BreadcrumbItem>Bảng lương</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">{salary}</div>
    </div>
  );
};

export default SalaryTable;
