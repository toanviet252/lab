import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
// Hàm tính lương
function calcSalary(salaryScale, overTime) {
  const basicSal = 3000000;
  const overTimeSal = 200000;
  return salaryScale * basicSal + overTime * overTimeSal;
}

function RenderSalrary({ salary, salaryValue }) {
  // format số lương

  return (
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
  );
}

// Container Component
const SalaryTable = function (props) {
  console.log(props.luong);
  const [staffList, setStaffList] = useState(props.luong);
  console.log([staffList]);
  function sortSalary(sorttype) {
    // copy mảng staffList để ko làm thay đổi giá trị
    let sortedStaffList = [...staffList];
    let salaryA = 0;
    let salaryB = 0;

    if (sorttype === "increase") {
      //array.sort có sẵn trong thư viện react
      sortedStaffList.sort(function (a, b) {
        salaryA = calcSalary(a.salaryScale, a.overTime);
        salaryB = calcSalary(b.salaryScale, b.overTime);
        return salaryA - salaryB;
      });
    }

    if (sorttype === "decrease") {
      sortedStaffList.sort(function (a, b) {
        salaryA = calcSalary(a.salaryScale, a.overTime);
        salaryB = calcSalary(b.salaryScale, b.overTime);
        return salaryB - salaryA;
      });
    }
    // Đổi state của array setstaffLish
    setStaffList(sortedStaffList);
  }
  // staffList sẽ thay đổi khi nhấn vào button => {salary} cũng thay đổi theo
  const salary = staffList.map((salary) => {
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
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/nhanvien">Nhân viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Bảng lương</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div id="sort" className="row">
        <div className="col-12">
          <h5>Sắp Xếp Theo Lương</h5>
        </div>
        <div className="col-12">
          <Button onClick={() => sortSalary("increase")}>
            <span class="fa fa-sort-amount-asc"></span> Lương Thấp
          </Button>

          <Button onClick={() => sortSalary("decrease")}>
            <span class="fa fa-sort-amount-desc"></span> Lương Cao
          </Button>
        </div>
      </div>
      <div className="row">{salary}</div>
    </div>
  );
};

export default SalaryTable;
