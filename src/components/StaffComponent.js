import React, { Component } from "react";
import { Card, CardTitle } from "reactstrap";

class Staffs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null,
      className: "col-12 col-6 col-4 col-2 ",
    };
  }
  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }

  render() {
    console.log(this.props);
    // Lọc lấy dữ liệu staffs gồm các object
    const staff = this.props.staffs.map((staff) => {
      return (
        <div key={staff.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onStaffSelect(staff)}>
            <CardTitle>{staff.name} </CardTitle>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <button className="bg-primary m-3">6 cột</button>
          <button className="bg-primary m-3">5 cột</button>
          <button className="bg-primary m-3">4 cột</button>
          <button className="bg-primary m-3">3 cột</button>
          <button className="bg-primary m-3">2 cột</button>
          <button className="bg-primary m-3">1 cột</button>
        </div>
        <div className="row">{staff}</div>
        <div className="row ml-1">
          <p>Bấm vào tên nhân viên để xem thông tin</p>
        </div>
      </div>
    );
  }
}
export default Staffs;
