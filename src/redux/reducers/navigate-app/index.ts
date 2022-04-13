import { navigateAppTypes as Type } from '../../types/navigate-app';

const initialState = {
  url: null,
};

const navigateAppReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Type.UPDATE_NAVIGATE_APP:
      return {
        ...state,
        url: action.payload,
      };
    case Type.REMOVE_NAVIGATE_APP:
      return { ...state, url: null };
    default:
      return state;
  }
};

export default navigateAppReducer;
