import custom from '../axiosInceptor';

export const getFooterMenu = () => {
  try {
    const url = process.env.REACT_APP_FOOTER_URL || '';
    return custom(url).then((response) => response.data);
  } catch (error) {
    throw error;
  }
};
