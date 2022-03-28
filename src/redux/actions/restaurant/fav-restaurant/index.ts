import { displayToast } from "../../../../helpers/toast";
import { ResponseRestaurant } from "../../../../types/olo-api";
import { favRestaurantActionsTypes as Type } from "../../../types/restaurant/fav-restaurant";



export function getFavRestaurant(id: number) {
  return {
    type: Type.GET_FAV_RESTAURANT,
    restaurantID: id,
  };
}

export function getFavRestaurantSuccess(data: ResponseRestaurant) {
  return {
    type: Type.GET_FAV_RESTAURANT_SUCCESS,
    payload: data,
  };
}

export function getFavRestaurantFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: Type.GET_FAV_RESTAURANT_FAILURE,
    error: error,
  };
}