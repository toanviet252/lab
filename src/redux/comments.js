import { COMMENTS } from "../shared/comments";
import * as ActionTypes from "./ActionTypes";

export const Comments = (state = COMMENTS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      // Tạo biến comment và gán nó vào giá trị mà người dùng vừa nhập
      var comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      // trả về state ban đầu kết hợp thêm phần tử conmment vừa thêm
      return state.concat(comment);
    default:
      return state;
  }
};
