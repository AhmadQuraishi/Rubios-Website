import { favRestaurantActionsTypes as Type } from '../../../types/restaurant/fav-restaurant';

const INITIAL_STATE = {
  loading: false,
  favRestaurant: null,
  error: {},
};

const favRestaurantReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Type.GET_SINGLE_RESTAURANT:
      return { ...state, loading: true, favRestaurant: null };
    case Type.GET_SINGLE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        favRestaurant: action.payload,
        error: {},
      };
    case Type.GET_SINGLE_RESTAURANT_FAILURE:
      return { ...state, loading: false, error: action.error };    
    default:
      return state;
  }
};

export default favRestaurantReducer;
