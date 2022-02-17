import { restaurantActionsTypes } from '../../types/restaurant';

const INITIAL_STATE = {
  loading: false,
  restaurant: null,
  error: {},
};

const restaurantInfoReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case restaurantActionsTypes.GET_RESTAURANT_INFO_REQUEST:
      return { ...state, loading: true };
    case restaurantActionsTypes.GET_RESTAURANT_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
        error: {},
      };
    case restaurantActionsTypes.GET_RESTAURANT_INFO_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default restaurantInfoReducer;
