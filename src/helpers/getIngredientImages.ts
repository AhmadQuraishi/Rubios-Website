import axios from 'axios';

const getIngredientImage = (id: string): string => {
  try {
    const url =
      process.env.REACT_APP_INGREDIENT_URL?.replaceAll('*yourplu*', id) || '';
    axios
      .get(url)
      .then((response) => {
        if (response.data) {
          if (
            response.data.yoast_head_json &&
            response.data.yoast_head_json.og_image.length > 0
          ) {
            return response.data.yoast_head_json.og_image[0].url;
          }
        }
      })
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
  return '';
};
export default getIngredientImage;
