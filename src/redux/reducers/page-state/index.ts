import { pageStateType as Type } from '../../types/page-state';

const initialState = {
  pageURL: null,
  loading: false,
  error: {},
};

const pageStateReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Type.SET_PAGE_STATE_REQUEST:
      return { ...state, loading: true, error: {} };

    case Type.SET_PAGE_STATE_SUCCESS:
      return {
        ...state,
        pageURL: action.payload,
        loading: false,
        error: {},
      };

    case Type.SET_PAGE_STATE_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default pageStateReducer;
