import axios from 'axios';

export const getRestaurantInfo = (id: number) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axios
      .get(url + `/restaurants/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
