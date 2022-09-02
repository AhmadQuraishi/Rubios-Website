import { memo, useEffect, useState } from 'react';
import { checkTacoMatch } from '../../helpers/common';

const ItemImage = (props: any) => {
  const { name, id, className, productImageURL, optionImages, isdefault } =
    props;

  const [imageURL, setImageURL] = useState<any>(null);

  useEffect(() => {
    if (
      !optionImages ||
      name.toLowerCase() === 'as is' ||
      name.toLowerCase() === 'customize' ||
      checkTacoMatch(name, isdefault)
    ) {
      return;
    }
    optionImages.map((item: any) => {
      if (process.env.REACT_APP_NODE_ENV !== 'production') {
        if (item.sandbox_plu_names.indexOf(id.toString()) != -1) {
          // setImageURL(item.yoast_head_json.schema['@graph'][1].contentUrl);
          setImageURL(item.fimg_url);
        }
      } else {
        if (item.production_plu_names.indexOf(id.toString()) != -1) {
          // setImageURL(item.yoast_head_json.schema['@graph'][1].contentUrl);
          setImageURL(item.fimg_url);
        }
      }
    });
  }, []);

  return (
    <>
      {(name.toLowerCase() === 'as is' ||
        name.toLowerCase() === 'customize' ||
        checkTacoMatch(name, isdefault)) && (
        <img
          aria-hidden="true"
          src={productImageURL}
          alt=""
          className={`${className}`}
        />
      )}

      {name.toLowerCase() !== 'customize' &&
        name.toLowerCase() !== 'as is' &&
        !checkTacoMatch(name, isdefault) &&
        (name.toLowerCase().indexOf('no rice') !== -1 ||
          name.toLowerCase().indexOf('no beans') !== -1) && (
          <img
            aria-hidden="true"
            alt=""
            src={require('../../assets/imgs/No ingredient.png')}
            className={`${className}`}
          />
        )}

      {imageURL &&
        name.toLowerCase() !== 'customize' &&
        name.toLowerCase() !== 'as is' &&
        !checkTacoMatch(name, isdefault) &&
        name.toLowerCase().indexOf('no rice') === -1 &&
        name.toLowerCase().indexOf('no beans') === -1 && (
          <img
            aria-hidden="true"
            alt=""
            src={imageURL}
            className={`${className}`}
          />
        )}
    </>
  );
};

export default memo(ItemImage);
