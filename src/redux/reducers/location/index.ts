import { locationTypes as Type } from '../../types/location';
import { userTypes } from '../../types/user';

const initialState = {
  location: null,
  loading: false,
  error: {},
};

const locationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Type.GET_LOCATIONS:
      return { ...state, loading: true, error: {} };

    case Type.GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.payload,
        loading: false,
        error: {},
      };

    case Type.GET_LOCATIONS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case userTypes.USER_LOGOUT: 
      return {
        ...initialState
      }   
    default:
      return state;
  }
};

export default locationReducer;
