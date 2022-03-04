import { ResponseRestaurant } from '../../../../types/olo-api';
import { favRestaurantActionsTypes as Type } from '../../../types/restaurant/fav-restaurant';

export function getSingleRestaurant(id: number) {
  return {
    type: Type.GET_SINGLE_RESTAURANT,
    payload: id
  };
}

export function getSingleRestaurantSuccess(data: ResponseRestaurant) {
 
  return {
    type: Type.GET_SINGLE_RESTAURANT_SUCCESS,
    payload: data,
  };
 
}

export function getSingleRestaurantFailure(error: any) {
  
  return {
    type: Type.GET_SINGLE_RESTAURANT_FAILURE,
    error: error,
  };
}


