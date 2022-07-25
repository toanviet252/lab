// file này tạo ra các Action sau đó được chuyển đến Store
import { DISHES } from "../shared/dishes";
import * as ActionTypes from "./ActionTypes";
//* as nghĩa là import tất cả export dưới dạng action types trong file ActionTypes.js

// Từ đây trở xuống chính là các Action mà ta đang định nghĩa
export const addComment = (dishID, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: {
    dishId: dishID,
    rating: rating,
    author: author,
    comment: comment,
  },
});

// Định nghĩa một redux thunk
/*Nó đang thực hiện 2 công việc: Đầu tiên hàm fetchDish() trả về 1 hàm là dispatch()
1. Hàm dispatch thực hiện loading một món ăn
2. Sau 2 giây, hàm dispatch thực hiện thêm món ăn
*/
export const fetchDish = () => (dispatch) => {
  dispatch(dishesLoading(true));
  setTimeout(() => {
    dispatch(addDishes(DISHES));
  }, 2000);
};

export const dishesLoading = () => {
  type: ActionTypes.DISHES_LOADING;
};
// hàm dishesFailed trả về 1 action nên cần viết ({})
export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess,
});
export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});
