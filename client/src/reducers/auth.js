let userState;

if (window.localStorage.getItem('auth')) {
  // for allowing redux to store the user information as a state (give access to redux)
  // the key name 'auth' was set by 'setItem' when store the user information in local storage 
  userState = JSON.parse(window.localStorage.getItem('auth'));  // JSON.parse converts Json to js object
} else {
  userState = null;  // {}
}

export const authReducer = (state=userState, action) => {  
    switch(action.type) {
      case "LOGGED_IN_USER":
        return {...state, ...action.payload};  // reducer changes the state 
      case "LOGOUT":
        return action.payload;
      default:
        return state;
    }
  };