import { checkinTypes as Type } from '../../types/check-in';

const initialState = {
  
  data: {},
  loading: true,
  error: {},
  
};

const checkInReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case Type.CREATE_CHECK_IN:

      return { ...state, loading: true };

   
      case Type.CHECK_IN_SUCCESS:
        return {
          ...state,
          data: action.payload,
          loading: false
        };

  
    case Type.CHECK_IN_FAILURE:
      return { ...state, error: action.error  , loading :  false};

    default:
      return state;
  }
};

export default checkInReducer;
