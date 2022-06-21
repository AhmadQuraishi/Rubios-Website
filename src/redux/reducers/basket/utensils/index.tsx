import { basketActionsTypes } from '../../../types/basket';

const INITIAL_STATE = {
  loading: false,
  error: {}
};

const utensilsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case basketActionsTypes.ADD_UTENSILS_REQUEST:
    case basketActionsTypes.REMOVE_UTENSILS_REQUEST:
      return { ...state, loading: true, error: {}, action: null };
    case basketActionsTypes.ADD_UTENSILS_SUCCESS:
    case basketActionsTypes.REMOVE_UTENSILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {}
      };
    case basketActionsTypes.ADD_UTENSILS_FAILURE:
    case basketActionsTypes.REMOVE_UTENSILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default utensilsReducer;