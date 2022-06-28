import axios from "axios";

export const requestLocations = () => {
  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api2/dashboard/locations`;
    return axios
      .get(url, {
        headers: {
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
    const url = process.env.REACT_APP_OLO_API || "";
    return axios
      .get(
        url +
        `/restaurants/near?lat=${lat}&long=${long}&radius=${radius}&limit=${limit}&calendarstart=${startDate}&calendarend=${endDate}`
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
    const url = process.env.REACT_APP_OLO_API || "";
    return axios
      .get(url + `/restaurants?includePrivate=true`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
