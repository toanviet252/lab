import * as ActionTypes from "./ActionType";

export const SalaryStaffs = (
  state = {
    isLoading: true,
    errMess: null,
    salarys: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.SALARY_ADDED:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        salarys: action.payload,
      };
    case ActionTypes.SALARY_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        salarys: [],
      };
    case ActionTypes.SALARY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        salarys: [],
      };

    default:
      return state;
  }
};
