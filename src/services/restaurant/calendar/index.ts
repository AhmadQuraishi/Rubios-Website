import axios from "axios";
import "./index";

export const getRestaurantCalendar = (
  id: number,
  dateFrom: string,
  dateTo: string
) => {
  try {
    const url = process.env.REACT_APP_OLO_API || "";
    return axios
      .get(url + `/restaurants/${id}/calendars?from=${dateFrom}&to=${dateTo}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
