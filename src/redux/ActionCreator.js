import * as ActionTypes from "./ActionType";
import { baseUrl } from "../shared/baseUrl";

//Fetch Staffs
export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));
  return fetch(baseUrl + "staffs")
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          var error = new Error(`'Error'+ ${res.status}':' ${res.statusText}`);
          error.respones = res;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((res) => res.json())
    .then((staffs) => dispatch(staffsAdded(staffs)))
    .catch((err) => dispatch(staffFailed(err.message)));
};

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING,
});
export const staffFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});
export const staffsAdded = (staffs) => ({
  type: ActionTypes.STAFFS_ADDED,
  payload: staffs,
});

//Fetch department
export const fetchDepartments = () => (dispatch) => {
  return fetch(baseUrl + "departments")
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          var error = new Error(`'Error'+ ${res.status}':' ${res.statusText}`);
          error.respones = res;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((res) => res.json())
    .then((departments) => dispatch(departmentsAdded(departments)))
    .catch((err) => dispatch(departmentsFailed(err.message)));
};

export const departmentsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});
export const departmentsAdded = (departments) => ({
  type: ActionTypes.DEPARTMENTS_ADDED,
  payload: departments,
});

//Fetch salary
export const fetchSalarys = () => (dispatch) => {
  dispatch(salarysLoading(true));
  return fetch(baseUrl + "staffsSalary")
    .then(
      (res) => {
        if (res.ok) {
          return res;
        } else {
          var error = new Error(`'Error'+ ${res.status}':' ${res.statusText}`);
          error.respones = res;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((res) => res.json())
    .then((salarys) => dispatch(salarysAdded(salarys)))
    .catch((err) => dispatch(salaryFailed(err.message)));
};

export const salarysLoading = () => ({
  type: ActionTypes.SALARY_LOADING,
});
export const salaryFailed = (errmess) => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errmess,
});
export const salarysAdded = (salarys) => ({
  type: ActionTypes.SALARY_ADDED,
  payload: salarys,
});

//Add new Staff
export const addStaffSucced = (staff) => ({
  type: ActionTypes.ADD_STAFF_SUCCESS,
  payload: staff,
});
export const addStafFailed = (errmess) => ({
  type: ActionTypes.ADD_STAFF_FAILED,
  payload: errmess,
});

export const addNewStaff =
  (name, doB, startDate, departmentId, salaryScale, annualLeave, overTime) =>
  (dispatch) => {
    const newStaff = {
      name: name,
      doB: doB,
      startDate: startDate,
      departmentId: departmentId,
      salaryScale: salaryScale,
      annualLeave: annualLeave,
      overTime: overTime,
      image: "/assets/images/alberto.png",
    };
    console.log(newStaff);
    return fetch(baseUrl + "staffs", {
      method: "POST",
      body: JSON.stringify(newStaff),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error" + response.status + ":" + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((res) => res.json())
      .then((res) => {
        dispatch(addStaffSucced(res));
        dispatch(fetchSalarys());
        dispatch(fetchDepartments());
      })
      .catch((err) => {
        console.log("ADD STAFF", err.message);
        alert(`
      Your Staff couldn't posted!
      ${err.message}`);
      });
  };

//Update staff
export const updateStaffSucced = (staff) => ({
  type: ActionTypes.UPDATE_STAFF_SUCCESS,
  payload: staff,
});
export const updateStafFailed = (errmess) => ({
  type: ActionTypes.UPDATE_STAFF_FAILED,
  payload: errmess,
});

export const updateStaff =
  (
    staffId,
    name,
    doB,
    startDate,
    departmentId,
    salaryScale,
    annualLeave,
    overTime
  ) =>
  (dispatch) => {
    const update = {
      id: staffId,
      name: name,
      doB: doB,
      startDate: startDate,
      departmentId: departmentId,
      salaryScale: salaryScale,
      annualLeave: annualLeave,
      overTime: overTime,
      image: "/assets/images/alberto.png",
    };
    console.log(update);
    return fetch(baseUrl + "staffs", {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error" + response.status + ":" + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((res) => res.json())
      .then((res) => dispatch(updateStaffSucced(res)))
      .catch((err) => {
        console.log("UPDATE STAFF", err.message);
        alert(`
      Your Staff couldn't UPDATE!
      ${err.message}`);
      });
  };

// Delete staff
export const deleteStaff = (staffId) => (dispatch) => {
  return fetch(baseUrl + "staffs/" + staffId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  })
    .then((res) => res.json())
    .then((res) => dispatch(deletedStaff(res)));
};

export const deletedStaff = (staffId) => ({
  type: ActionTypes.DELETE_STAFF,
  payload: staffId,
});
