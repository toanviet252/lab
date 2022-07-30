import * as ActionTypes from "./ActionType";

export const Departments = (
  state = {
    errMess: null,
    departments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.DEPARTMENTS_ADDED:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        departments: action.payload,
      };
    case ActionTypes.DEPARTMENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        departments: [],
      };
    default:
      return state;
  }
};
