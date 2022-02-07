import { footerActionsTypes as Type } from '../../types/footer';

const INITIAL_STATE = {
  loading: false,
  menu: [],
  error: {},
};

const footerReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case Type.GET_FOOTER_ITMES_REQUEST:
      return { ...state, loading: true };
    case Type.GET_FOOTER_ITMES_SUCCESS:
      return { ...state, loading: false, menu: action.payload };
    case Type.GET_FOOTER_ITMES_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return { state };
  }
};

export default footerReducer;
