import { COMMENTS } from "../shared/comments";
import * as ActionTypes from "./ActionTypes";

export const Comments = (
  state = {
    errMess: null,
    comments: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        comments: action.payload,
      };
    case ActionTypes.PROMOS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        comments: [],
      };
    case ActionTypes.ADD_COMMENT:
      // Tạo biến comment và gán nó vào giá trị mà người dùng vừa nhập
      var comment = action.payload;
      comment.id = state.comments.length;
      comment.date = new Date().toISOString();
      // trả về state ban đầu kết hợp thêm phần tử conmment vừa thêm
      return { ...state, comments: state.comments.concat(comment) };
    default:
      return state;
  }
};
