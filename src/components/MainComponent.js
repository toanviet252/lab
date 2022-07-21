import React, { Component } from "react";
import Staffs from "./StaffComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffDetail from "./StaffDetail";
import Department from "./DepartmentsComponent";
import { STAFFS, ROLE, DEPARTMENTS } from "../shared/staffs";
import { Switch, Route } from "react-router-dom";
import SalaryTable from "./SalaryComponent";

// Presentation Component
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      roles: ROLE,
      departments: DEPARTMENTS,
    };
    this.addStaff = this.addStaff.bind(this);
  }
  // Hàm thêm nhân viên
  addStaff = (staff) => {
    //Tìm kiếm giá trị department trùng với phần chọn trong select option
    const department = this.state.departments.find(
      (x) => x.id === staff.department
    );
    staff.department = department;
    const id = Math.floor(Math.random() * 10000 + 16);
    const newStaff = { id, ...staff };
    this.setState({
      staffs: [...this.state.staffs, newStaff],
    });
  };

  render() {
    const StaffId = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.state.staffs.filter(
              (staff) => staff.id === parseInt(match.params.staffID, 10)
            )[0]
          }
        />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/nhanvien"
            component={() => (
              <Staffs onAdd={this.addStaff} staffs={this.state.staffs} />
            )}
          />
          <Route path="/nhanvien/:staffID" component={StaffId} />
          <Route
            path="/phongban"
            component={() => (
              <Department departments={this.state.departments} />
            )}
          />
          <Route
            path="/bangluong"
            component={() => <SalaryTable luong={this.state.staffs} />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
