import { STAFFS, ROLE, DEPARTMENTS } from "../shared/staffs";

export const initialState = {
  staffs: STAFFS,
  roles: ROLE,
  departments: DEPARTMENTS,
};
export const Reducer = (state = initialState, action) => {
  return state;
};
