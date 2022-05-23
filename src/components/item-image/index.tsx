import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress } from '@mui/material';

const ItemImage = (props: any) => {
  const { name, id, className, productImageURL, index } = props;

  const [imageURL, setImageURL] = useState<any>();
  const [loading, setLoading] = useState<any>(false);

  const getIngredientImage = (id: string) => {
    try {
      const url =
        process.env.REACT_APP_INGREDIENT_URL?.replace('*yourplu*', id) || '';
      const promise = axios.get(url);
      setLoading(true);
      setTimeout(() => {
        promise.then((response) => {
          setTimeout(() => {
            setLoading(false);
          }, 150);
          if (response.data.length > 0) {
            setImageURL(response.data[0].yoast_head_json.schema['@graph'][1]);
          } else {
            setImageURL([]);
          }
        });
      }, 100 * index + 1);
    } catch (error) {
      setImageURL([]);
      setTimeout(() => {
        setLoading(false);
      }, 150);
      throw error;
    }
  };

  useEffect(() => {
    getIngredientImage(id);
  }, []);

  return (
    <>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {(name.toLowerCase() == 'as is' || name.toLowerCase() == 'customize') && (
        <img
          aria-hidden="true"
          src={productImageURL}
          style={{
            height: '130px',
            width: 'auto',
            display: !loading ? 'block' : 'none',
          }}
          className={`${className}`}
        />
      )}

      {imageURL &&
        imageURL.contentUrl == null &&
        name.toLowerCase() != 'customize' &&
        name.toLowerCase() != 'as is' && (
          <img
            aria-hidden="true"
            src={require('../../assets/imgs/No ingredient.png')}
            style={{
              height: 'auto',
              width: '100%',
              display: !loading ? 'block' : 'none',
            }}
            className={`${className}`}
          />
        )}
      {imageURL &&
        imageURL.contentUrl &&
        name.toLowerCase() != 'customize' &&
        name.toLowerCase() != 'as is' && (
          <img
            aria-hidden="true"
            src={imageURL.contentUrl}
            style={{
              height: '120px',
              width: 'auto',
              display: !loading ? 'block' : 'none',
            }}
            className={`${className}`}
          />
        )}
    </>
  );
};

export default memo(ItemImage);
