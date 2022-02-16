import axios from 'axios';

export const requestLocations = () => {
  try {
    const url = `https://sandbox.punchh.com/api2/dashboard/locations`;

    return axios.get(url, {
      headers: {
        Authorization: `Bearer ieyeYKm1mJ_zad_zXTtE`,
      },

    }).then((response) => response.data);
  } catch (error) {
    throw error;
  }
};
