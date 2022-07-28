export const authReducer = (state={}, action) => {  
    switch(action.type) {
      case "LOGGED_IN_USER":
        return {...state, ...action.payload};  // reducer changes the state 
      case "LOGOUT":
        return action.payload;
      default:
        return state;
    }
  };