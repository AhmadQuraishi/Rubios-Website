import { memo, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, CircularProgress } from '@mui/material';

const ItemImage = (props: any) => {
  const { name, id, className, productImageURL, optionImages } = props;

  const [imageURL, setImageURL] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    if (name.toLowerCase() == 'as is' || name.toLowerCase() == 'customize') {
      return;
    }
    optionImages.map((item: any) => {
      if (process.env.NODE_ENV !== 'production') {
        if (item.sandbox_plu_names.indexOf(id.toString()) != -1) {
          setImageURL(item.yoast_head_json.schema['@graph'][1].contentUrl);
        }
      } else {
        if (item.sandbox_plu_names.indexOf(id.toString()) != -1) {
          setImageURL(item.yoast_head_json.schema['@graph'][1].contentUrl);
        }
      }
    });
  }, []);

  return (
    <>
      {(name.toLowerCase() == 'as is' || name.toLowerCase() == 'customize') && (
        <img
          aria-hidden="true"
          src={productImageURL}
          style={{
            height: '120px',
            width: '120px',
          }}
          className={`${className}`}
        />
      )}

      {imageURL == null &&
        name.toLowerCase() != 'customize' &&
        name.toLowerCase() != 'as is' && (
          <img
            aria-hidden="true"
            src={require('../../assets/imgs/No ingredient.png')}
            style={{
              height: '120px',
              width: '120px',
            }}
            className={`${className}`}
          />
        )}

      {imageURL &&
        name.toLowerCase() != 'customize' &&
        name.toLowerCase() != 'as is' && (
          <img
            aria-hidden="true"
            src={imageURL}
            style={{
              height: '120px',
              width: '120px',
            }}
            className={`${className}`}
          />
        )}
    </>
  );
};

export default memo(ItemImage);
