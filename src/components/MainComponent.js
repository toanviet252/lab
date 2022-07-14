import React, { Component } from "react";
import Staffs from "./StaffComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import StaffDetail from "./StaffDetail";
import Department from "./DepartmentsComponent";
import { STAFFS, ROLE, DEPARTMENTS } from "../shared/staffs";
import { Switch, Route } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      roles: ROLE,

      departments: DEPARTMENTS,
    };
  }

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
            component={() => <Staffs staffs={this.state.staffs} />}
          />
          <Route path="/nhanvien/:staffID" component={StaffId} />
          <Route
            path="/phongban"
            component={() => (
              <Department departments={this.state.departments} />
            )}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
