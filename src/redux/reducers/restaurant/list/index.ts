import { restaurantListDataActionsTypes } from '../../../types/restaurant/list';
import { userTypes } from '../../../types/user';


const INITIAL_STATE = {
  loading: false,
  restaurants: null,
  error: {},
};

const restaurantListReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case restaurantListDataActionsTypes.GET_RESTAURANT_LIST_REQUEST:
      return { ...state, loading: true, restaurants: null, error: {} };
    case restaurantListDataActionsTypes.GET_RESTAURANT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
        error: {},
      };
    case restaurantListDataActionsTypes.GET_RESTAURANT_LIST_FAILURE:
      return { ...state, loading: false, error: action.error };
    case userTypes.USER_LOGOUT: 
      return {
        ...INITIAL_STATE
      }    
    default:
      return state;
  }
};

export default restaurantListReducer;
