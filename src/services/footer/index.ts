import axios from 'axios';

export const getFooterMenu = () => {
  try {
    return axios(
      'https://rubioslivedev.wpengine.com/wp-json/wp-api-menus/v2/menus/6',
    ).then((response) => response.data);
  } catch (error) {
    throw error;
  }
};


