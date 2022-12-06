import { locationTypes as Type } from '../../types/location';
import { userTypes } from '../../types/user';

const initialState = {
  location: null,
  loading: false,
  error: {},
  singleLocation: {
    loading: false,
    error: {},
    data: null,
  },
};

const locationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Type.GET_LOCATIONS:
      return {
        ...state,
        loading: true,
        error: {},
        singleLocation: initialState.singleLocation,
      };

    case Type.GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.payload,
        loading: false,
        error: {},
      };

    case Type.GET_LOCATIONS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case Type.GET_SINGLE_LOCATION:
      return {
        ...state,
        singleLocation: {
          loading: true,
          error: {},
          data: null,
        },
      };

    case Type.GET_SINGLE_LOCATION_SUCCESS:
      return {
        ...state,
        singleLocation: {
          loading: false,
          error: {},
          data: action.payload,
        },
      };

    case Type.GET_SINGLE_LOCATION_FAILURE:
      return {
        ...state,
        singleLocation: {
          loading: false,
          error: action.error,
          data: null,
        },
      };
    case userTypes.USER_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default locationReducer;
