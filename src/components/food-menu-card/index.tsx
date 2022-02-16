import { Grid, Typography, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { Option, OptionGroup } from '../../types/olo-api';
import './food-menu-card.css';

const FoodMenuCard = (props: any) => {
  const { menuItems, options, isSingleSelect } = props;

  let optionFound: any = null;
  const [viewUI, setViewUI] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [viewUIList, setViewUIList] = useState<{}[]>([]);

  useEffect(() => {
    const defaultItem = menuItems.find((x: any) => x.isdefault === true);
    if (defaultItem) {
      handleClick(defaultItem.id, false);
    }
  }, []);
  
  useEffect(() => {
    if (viewUI) {
      setViewUIList((viewUIList) => [
        ...viewUIList,
        { id: selectedItem[selectedItem.length - 1], viewUI: viewUI },
      ]);
    }
  }, [viewUI]);

  const handleClick = (id: number, selected: boolean) => {
    if (options === undefined) {
      return false;
    }
    optionFound = null;

    if (isSingleSelect) {
      removeItemFromSelection(0);
      removeItemFromViewUI(0);
      if (selectedItem.find((x: number) => x === id)) {
        return false;
      }
    }

    if (selectedItem.find((x: number) => x === id)) {
      removeItemFromSelection(id);
      removeItemFromViewUI(id);
      return false;
    }

    if (isSingleSelect) {
      setSelectedItem([id]);
    } else {
      setSelectedItem((selectedItem) => [...selectedItem, id]);
    }

    getOptionsByID(id, options);
    if (optionFound) {
      setViewUI(renderView(optionFound));
    }
  };

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
          <FoodMenuCard
            menuItems={modifier.options}
            isSingleSelect={modifier.mandatory}
            options={options}
          />
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
          <FoodMenuCard
            menuItems={option.modifiers}
            isSingleSelect={false}
            options={options}
          />
        </Card>
      ));
    } else {
      return <></>;
    }
  };

  const isItemSelected = (id: number): any => {
    if (selectedItem) {
      return selectedItem?.find((x: number) => x === id);
    }
  };

  const removeItemFromSelection = (id: number) => {
    if (id === 0) {
      setSelectedItem([]);
      return false;
    }
    const updatedList: number[] = [];
    selectedItem.forEach((item: number, index: number) => {
      if (item !== id) {
        updatedList.push(item);
      }
    });
    setSelectedItem(updatedList);
  };

  const removeItemFromViewUI = (id: number) => {
    if (id === 0) {
      setViewUIList([]);
      return false;
    }
    const updatedList: number[] = [];
    viewUIList.forEach((item: any, index: number) => {
      if (item.id !== id) {
        updatedList.push(item);
      }
    });
    setViewUIList(updatedList);
  };

  return (
    <>
      <Grid container>
        {menuItems.map((menuItem: any, index: number) => (
          <Grid item xs={12} md={6} lg={4}>
            <>
              <Card
                className={`reward-item${
                  selectedItem && isItemSelected(menuItem.id) ? ' selected' : ''
                }`}
                onClick={() =>
                  handleClick(
                    menuItem.id,
                    selectedItem && isItemSelected(menuItem.id),
                  )
                }
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
      {viewUIList && viewUIList.map((item: any, index: number) => item.viewUI)}
    </>
  );
};

export default FoodMenuCard;
