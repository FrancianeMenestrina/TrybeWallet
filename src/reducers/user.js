// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  console.log('userReducer');
  switch (action.type) {
  case 'SET_USER_NAME':
    return { ...state, email: action.payload };
  case 'SET_PASSWORD':
    return { ...state, password: action.payload };
  default:
    return state;
  }
};

export default userReducer;
