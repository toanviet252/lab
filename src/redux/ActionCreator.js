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
export const addStaffSucced = () => ({
  type: ActionTypes.ADD_STAFF_SUCCESS,
});
export const addStafFailed = () => ({
  type: ActionTypes.ADD_STAFF_FAILED,
});
