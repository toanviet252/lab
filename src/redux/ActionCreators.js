// file này tạo ra các Action sau đó được chuyển đến Store
import { DISHES } from "../shared/dishes";
import * as ActionTypes from "./ActionTypes";
//* as nghĩa là import tất cả export dưới dạng action types trong file ActionTypes.js
import { baseUrl } from "../shared/baseUrl";

// Từ đây trở xuống chính là các Action mà ta đang định nghĩa
export const addComment = (dishID, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId: dishID,
    rating: rating,
    author: author,
    comment: comment,
  },
});
//////////////////////////////////////////////
// Định nghĩa một redux thunk
/*Nó đang thực hiện 2 công việc: Đầu tiên hàm fetchDish() trả về 1 hàm là dispatch()
1. Hàm dispatch thực hiện loading một món ăn
2. Sau 2 giây, hàm dispatch thực hiện thêm món ăn
*/
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));
  return fetch(baseUrl + "/dishes")
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)));
};

// Lưu ý: Khi viết một action cần viết dưới dạng () => () để trả về 1 giá trị nào đó
export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});
// hàm dishesFailed trả về 1 action nên cần viết ({})
export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});
export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

////////////////////////////////////////////////////
// Comment action
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "/comments")
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)));
};
export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});
export const commnetsFailed = (errMess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess,
});

//////////////////////////////////////////////////////
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));
  return fetch(baseUrl + "/promotions")
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)));
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});
export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess,
});
export const addPromos = (promotions) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promotions,
});
