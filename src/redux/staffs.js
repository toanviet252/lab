import * as ActionTypes from "./ActionType";

export const Staffs = (
  state = {
    isLoading: true,
    errMess: null,
    staffs: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.STAFFS_ADDED:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };
    case ActionTypes.STAFFS_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        staffs: [],
      };
    case ActionTypes.STAFFS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        staffs: [],
      };
    //ADD new Staff
    case ActionTypes.ADD_STAFF_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        staffs: action.payload,
      };

    default:
      return state;
  }
};
