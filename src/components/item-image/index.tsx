import { memo, useEffect, useState } from 'react';
import axios from 'axios';

const ItemImage = (props: any) => {
  const { name, id, className } = props;

  const [imageURL, setImageURL] = useState<any>();

  const getIngredientImage = (id: string) => {
    try {
      const url =
        process.env.REACT_APP_INGREDIENT_URL?.replace('*yourplu*', id) || '';
      const promise = axios.get(url);
      promise.then((response) => {
        if (response.data.length > 0) {
          setImageURL(response.data[0].yoast_head_json.schema['@graph'][1]);
        }
      });
    } catch (error) {
      setImageURL(undefined);
      throw error;
    }
  };

  useEffect(() => {
    getIngredientImage(id);
  }, []);

  return (
    <img
      src={
        imageURL == undefined || imageURL.contentUrl == null
          ? require('../../assets/imgs/default_img.png')
          : imageURL.contentUrl
      }
      alt=""
      className={`${className}`}
    />
  );
};

export default memo(ItemImage);
