import { categoryActionsTypes } from '../../types/category';
import { userTypes } from '../../types/user';

const INITIAL_STATE = {
  loading: false,
  categories: null,
  error: {},
};

const categoryReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case categoryActionsTypes.GET_CATEGORY_ITMES_REQUEST:
      return { ...state, loading: true, categories: null, error: {} };
    case categoryActionsTypes.GET_CATEGORY_ITMES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: {},
      };
    case categoryActionsTypes.GET_CATEGORY_ITMES_FAILURE:
      return { ...state, loading: false, error: action.error };
    case userTypes.USER_LOGOUT: 
      return {
        ...INITIAL_STATE
      }   
    default:
      return state;
  }
};

export default categoryReducer;
