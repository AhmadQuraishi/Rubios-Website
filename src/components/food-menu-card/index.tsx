import { Grid, Typography, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { setTimeout } from 'timers/promises';
import { Option, OptionGroup } from '../../types/olo-api';
import './food-menu-card.css';

const FoodMenuCard = (props: any) => {
  const { menuItems, options } = props;

  let optionFound: any = null;
  const [viewUI, setViewUI] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<number>();

  const handleClick = (id: number) => {
    optionFound = null;
    setSelectedItem(id);
    getOptionsByID(id, options);
    if (optionFound) {
      console.log(optionFound);
      setViewUI(renderView(optionFound));
    }
  };

  useEffect(() => {
    const defaultItem = menuItems.find((x: any) => x.isdefault === true);
    if (defaultItem) {
      setSelectedItem(defaultItem.id);
      handleClick(defaultItem.id);
    }
  }, []);

  const getOptionsByID = (id: number, options: any) => {
    if (optionFound) {
      return false;
    }
    const obj = options.find((x: any) => x.id === id);
    if (obj) {
      optionFound = obj;
    } else {
      options.forEach((item: any) => {
        if (item.options) {
          const objVal = getOptionsByID(id, item.options);
          if (objVal) {
            optionFound = objVal;
          }
        } else if (item.modifiers) {
          const objVal = getOptionsByID(id, item.modifiers);
          if (objVal) {
            optionFound = objVal;
          }
        } else {
          return null;
        }
      });
    }
  };

  const renderView = (obj: any): any => {
    console.log(obj.modifiers);
    if (obj.modifiers) {
      return obj.modifiers.map((modifier: OptionGroup, index: number) => (
        <Card
          sx={{
            padding: '20px',
            border: '1px solid #ccc',
            marginTop: '20px',
            boxShadow: 'none',
          }}
        >
          <Typography variant="h5" title={modifier.description}>
            {modifier.description}
          </Typography>
          <FoodMenuCard menuItems={modifier.options} options={options} />
        </Card>
      ));
    } else if (obj.options) {
      return obj.options.map((option: Option, index: number) => (
        <Card
          sx={{
            padding: '20px',
            border: '1px solid #ccc',
            marginTop: '20px',
            boxShadow: 'none',
          }}
        >
          <Typography variant="h5" title={option.name}>
            {option.name}
          </Typography>
          <FoodMenuCard menuItems={option.modifiers} options={options} />
        </Card>
      ));
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Grid container>
        {menuItems.map((menuItem: any, index: number) => (
          <Grid item xs={12} md={6} lg={4}>
            <>
              <Card
                className={`reward-item${
                  selectedItem == menuItem.id ? ' selected' : ''
                }`}
                onClick={() => handleClick(menuItem.id)}
              >
                <div className="icon">✓</div>
                <Grid container className="rewards">
                  <Grid item xs={5}>
                    {menuItem.image ? (
                      <img
                        className="item-image"
                        src={menuItem.image}
                        alt={menuItem.name}
                        title={menuItem.name}
                      />
                    ) : (
                      <img
                        className="item-image"
                        src={require('../../assets/imgs/default_img.png')}
                        alt={menuItem.name}
                        title={menuItem.name}
                      />
                    )}
                  </Grid>
                  <Grid item xs={7}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography
                        variant="caption"
                        title={menuItem.name || menuItem.description}
                        className="item-name"
                      >
                        {menuItem.name || menuItem.description}
                        <br />
                        {menuItem.cost > 0 && (
                          <span className="price-tag">{`+$${menuItem.cost.toFixed(
                            2,
                          )}`}</span>
                        )}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </>
          </Grid>
        ))}
      </Grid>
      {viewUI}
    </>
  );
};

export default FoodMenuCard;
