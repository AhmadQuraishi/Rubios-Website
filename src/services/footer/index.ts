import axios from 'axios';

export const getFooterMenu = () => {
  try {
    const url =  process.env.REACT_APP_FOOTER_URL ||"";
    return axios(
     url,
    ).then((response) => response.data);
  } catch (error) {
    throw error;
  }
};