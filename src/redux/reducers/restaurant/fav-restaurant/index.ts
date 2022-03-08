import { favRestaurantActionsTypes as Type } from "../../../types/restaurant/fav-restaurant";

const INITIAL_STATE = {
  favloading: false,
  favRestaurant: null,
  error: {},
};

const favRestaurantReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Type.GET_FAV_RESTAURANT:
      return { ...state, favloading: true, favRestaurant: null, error: {} };
    case Type.GET_FAV_RESTAURANT_SUCCESS:
      return {
        ...state,
        favloading: false,
        favRestaurant: action.payload,
        error: {},
      };
    case Type.GET_FAV_RESTAURANT_FAILURE:
      return { ...state, favloading: false, error: action.error };
    default:
      return state;
  }
};

export default favRestaurantReducer;
