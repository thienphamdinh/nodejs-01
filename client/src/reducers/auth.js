import _ from "lodash";

const initialState = {
  profile: {},
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER": {
      return {
        ...state,
        profile: action.payload,
        isAuthenticated: !_.isEmpty(action.payload)
      };
    }
    default:
      return state;
  }
};

export default authReducer;
