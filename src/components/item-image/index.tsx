import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress } from '@mui/material';

const ItemImage = (props: any) => {
  const { name, id, className } = props;

  const [imageURL, setImageURL] = useState<any>();
  const [loading, setLoading] = useState<any>(false);

  const getIngredientImage = (id: string) => {
    try {
      const url =
        process.env.REACT_APP_INGREDIENT_URL?.replace('*yourplu*', id) || '';
      const promise = axios.get(url);
      setLoading(true);
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
      {imageURL && imageURL.contentUrl == null && (
        <img
          aria-hidden="true"
          src={require('../../assets/imgs/default_img.jpg')}
          style={{
            height: '120px',
            width: '100%',
            display: !loading ? 'block' : 'none',
          }}
          className={`${className}`}
        />
      )}
      {imageURL && imageURL.contentUrl && (
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
