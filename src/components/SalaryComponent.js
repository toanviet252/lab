import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { FadeTransform } from "react-animation-components";

// Hàm tính lương
function calcSalary(salaryScale, overTime) {
  const basicSal = 3000000;
  const overTimeSal = 200000;
  return salaryScale * basicSal + overTime * overTimeSal;
}

function RenderSalrary({ salary, salaryValue }) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateX(-50%)",
      }}
    >
      <Card>
        <CardBody>
          <CardTitle>{salary.name}</CardTitle>
          <CardText>Mã nhân viên: {salary.id}</CardText>
          <CardText>Hệ số lương: {salary.salaryScale}</CardText>
          <CardText>Số ngày làm thêm: {salary.overTime}</CardText>
          <Card>
            <CardText>
              Lương:
              <NumberFormat
                value={salaryValue}
                displayType="text"
                thousandSeparator={true}
                decimalScale={0}
              />{" "}
              VNĐ
            </CardText>
          </Card>
        </CardBody>
      </Card>
    </FadeTransform>
  );
}

const SalaryTable = function (props) {
  const salary = props.salaryStaffs.map((salary) => {
    return (
      <div key={salary.id} className="col-12 col-md-5 col-lg-3 m-1">
        <RenderSalrary
          salary={salary}
          salaryValue={calcSalary(salary.salaryScale, salary.overTime)}
        />
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row mt-1">
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
