import axios from 'axios';

export const requestLocations = () => {
  try {
    const url = `https://sandbox.punchh.com/api2/dashboard/locations`;

    return axios
      .get(url, {
        headers: {
          Authorization: `Bearer ieyeYKm1mJ_zad_zXTtE`,
        },
      })
      .then((response) => response.data);
  } catch (error) {
    throw error;
  }
};

export const getNearByRestaurants = (
  lat: number,
  long: number,
  radius: number,
  limit: number,
  startDate: string,
  endDate: string,
) => {
  try {
    const url = process.env.REACT_APP_OLO_API_URL || '';
    return axios
      .get(
        url +
          `/restaurants/near?lat=${lat}&long=${long}&radius=${radius}&limit=${limit}&calendarstart=${startDate}&calendarend=${endDate}`,
        {
          headers: {
            Authorization: process.env.REACT_APP_OLO_AUTH_KEY || '',
          },
        },
      )
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

export const getAllResturants = () => {
  try {
    const url = process.env.REACT_APP_OLO_API_URL || '';
    return axios
      .get(url + `/restaurants?includePrivate=false`, {
        headers: {
          Authorization: process.env.REACT_APP_OLO_AUTH_KEY || '',
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
