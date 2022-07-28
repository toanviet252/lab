// file này tạo ra các Action sau đó được chuyển đến Store
import * as ActionTypes from "./ActionTypes";
//* as nghĩa là import tất cả export dưới dạng action types trong file ActionTypes.js
import { baseUrl } from "../shared/baseUrl";

// Từ đây trở xuống chính là các Action mà ta đang định nghĩa
export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    comment: comment,
  },
});

export const postComment = (dishID, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishID,
    rating: rating,
    author: author,
    comment: comment,
  };
  newComment.date = new Date().toISOString();
  //Tiếp theo post lên server trong object comments
  return (
    fetch(baseUrl + "/comments", {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      //Phần hiển thị lỗi khi fetch từ server
      .then(
        (response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error(
              "Error" + response.status + ":" + response.statusText
            );
            error.response = response;
            throw error;
          }
        },
        (error) => {
          var errMess = new Error(error.message);
          throw errMess;
        }
      )
      .then((res) => res.json())
      .then((res) => dispatch(addComment(res)))
      .catch((err) => {
        console.log("POST commnet", err.message);
        alert(`Your comment couldn't posted
        ${err.message}`);
      })
  );
};

//////////////////////////////////////////////
// Định nghĩa một redux thunk
/*Nó đang thực hiện 2 công việc: Đầu tiên hàm fetchDish() trả về 1 hàm là dispatch()
1. Hàm dispatch thực hiện loading một món ăn
2. Sau 2 giây, hàm dispatch thực hiện thêm món ăn
*/
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));
  return fetch(baseUrl + "/dishes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => dispatch(dishesFailed(error.message)));
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
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commnetsFailed(error.message)));
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
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error" + response.status + ":" + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        var errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => dispatch(promosFailed(error.message)));
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
