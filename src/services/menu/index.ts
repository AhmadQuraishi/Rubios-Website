import axios from "axios";

export const getMenuItem = (id: number) => {
  try {
    const url = process.env.REACT_APP_OLO_API || "";
    return axios
      .get(url + `/restaurants/${id}/menu?includedisabled=false`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
