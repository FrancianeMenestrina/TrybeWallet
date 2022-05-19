// Coloque aqui suas actions
export const setUserEmail = (payload) => ({
  type: 'SET_USER_NAME',
  payload,
});

export const setUserPassword = (payload) => ({
  type: 'SET_PASSWORD',
  payload,
});

export const setCurrence = (moedas) => ({
  type: 'SET_CURRENCE',
  payload: moedas,
});

export const fetchCurrence = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await response.json();
    console.log('result', result);
    const currencies = Object.keys(result).filter((moeda) => moeda !== 'USDT');
    dispatch(setCurrence(currencies));
  } catch (error) {
    console.log(error);
  }
};
