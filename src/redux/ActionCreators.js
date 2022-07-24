import * as ActionTypes from "./ActionTypes";
//* as nghĩa là import tất cả export dưới dạng action types trong file ActionTypes.js

export const addComment = (dishID, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: {
    dishId: dishID,
    rating: rating,
    author: author,
    comment: comment,
  },
});
