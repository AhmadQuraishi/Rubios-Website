
import { locationTypes as Type } from '../../types/location';

const initialState = {

  location: null,
  loading: false,
  error: {},
};

const locationReducer = (state = initialState, action: any) => {

  switch (action.type) {


    case Type.GET_LOCATIONS:
      return { ...state, loading: true };


    case Type.GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: action.payload,
        loading: false,
      };


    case Type.GET_LOCATIONS_FAILURE:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};

export default locationReducer;
