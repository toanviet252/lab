import React, { Component } from "react";
import Staffs from "./StaffComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";

import { STAFFS, ROLE } from "../shared/staffs";
import { Switch, Route } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
      roles: ROLE,
      selectStaff: null,
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/nhanvien"
            component={() => <Staffs staffs={this.state.staffs} />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
