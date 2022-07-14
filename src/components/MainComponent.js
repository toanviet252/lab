import React, { Component } from "react";
import Staffs from "./StaffComponent";

import { STAFFS, ROLE } from "../shared/staffs";

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
    return <div></div>;
  }
}

export default Main;
