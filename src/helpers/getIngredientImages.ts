import axios from 'axios';

function getIngredientImage(id: string) {
  try {
    const url =
      process.env.REACT_APP_INGREDIENT_URL?.replaceAll('*yourplu*', id) || '';
    const promise = axios.get(url);
    // using .then, create a new promise which extracts the data
    const dataPromise = promise.then((response) => response.data);
    // return it
    return dataPromise;
  } catch (error) {
    throw error;
  }
}
export default getIngredientImage;
