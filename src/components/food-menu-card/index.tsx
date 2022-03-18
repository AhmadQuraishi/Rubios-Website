import { Grid, Typography, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { Option, OptionGroup } from '../../types/olo-api';
import './food-menu-card.css';
import getIngredientImage from '../../helpers/getIngredientImages';

const FoodMenuCard = (props: any) => {
  const { menuItems, options, isSingleSelect, showDDL } = props;
  let optionFound: any = null;
  const [viewUI, setViewUI] = useState<any>();
  const [selectedItem, setSelectedItem] = useState<number[]>([]);
  const [viewUIList, setViewUIList] = useState<{}[]>([]);

  useEffect(() => {
    const defaultItem = menuItems.find((x: any) => x.isdefault === true);
    if (defaultItem) {
      handleClick(defaultItem.id, true, true);
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

  const handleClick = (
    id: number,
    isFunctional: boolean = true,
    firstLoad: boolean = false,
  ) => {
    if (options === undefined) {
      return false;
    }
    optionFound = null;
    if (!firstLoad) {
      if (isSingleSelect) {
        if (selectedItem.find((x: number) => x === id)) {
          return false;
        }
        removeItemFromSelection(0);
        removeItemFromViewUI(0);
      }
      if (selectedItem.find((x: number) => x === id)) {
        removeItemFromSelection(id);
        removeItemFromViewUI(id);
        return false;
      }
    }

    if (isSingleSelect) {
      setSelectedItem([id]);
    } else {
      setSelectedItem((selectedItem) => [...selectedItem, id]);
    }
    if (isFunctional) {
      getOptionsByID(id, options);
      if (optionFound) {
        setViewUI(renderView(optionFound));
      }
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
            marginTop: '20px',
            boxShadow: 'none',
          }}
          key={Math.random() + modifier.id}
        >
          <Typography variant="h5" title={modifier.description}>
            {modifier.description}
          </Typography>
          <FoodMenuCard
            menuItems={modifier.options}
            isSingleSelect={modifier.mandatory}
            showDDL={!modifier.mandatory}
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
          key={Math.random() + option.id}
        >
          <Typography variant="h5" title={option.name}>
            {option.name}
          </Typography>
          <FoodMenuCard
            menuItems={option.modifiers}
            isSingleSelect={false}
            options={options}
            showDDL={false}
          />
        </Card>
      ));
    } else {
      return <></>;
    }
  };

  const isItemSelected = (id: number): any => {
    if (selectedItem.length > 0) {
      return selectedItem?.find((x: number) => x === id) ? true : false;
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

  const setOptionsToSelect = (val: any) => {};

  return (
    <>
      <Grid container spacing={2}>
        {menuItems.map((menuItem: any, index: number) => (
          <Grid item xs={12} md={4} key={Math.random() + index}>
            <Card
              className={`reward-item${
                selectedItem.length > 0 && isItemSelected(menuItem.id)
                  ? ' reward-item-selected'
                  : ''
              }`}
              option-id={menuItem.id}
              onClick={() => handleClick(menuItem.id, !showDDL)}
            >
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
                      src={
                        getIngredientImage(menuItem.id) ||
                        require('../../assets/imgs/default_img.png')
                      }
                      alt={menuItem.name}
                      title={menuItem.name}
                    />
                  )}
                </Grid>
                <Grid item xs={7}>
                  <CardContent
                    sx={{
                      flex: '1 0 auto',
                      textAlign: 'left',
                      paddingLeft: '20px',
                    }}
                  >
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
                    {!isSingleSelect &&
                      showDDL &&
                      menuItem.modifiers &&
                      menuItem.modifiers.map((item: any, index: number) => (
                        <select
                          key={Math.random() + index + '-select'}
                          className="select"
                          onClick={(e) => e.stopPropagation()}
                          style={{ width: '115px', fontSize: '12px' }}
                          onChange={(e) => setOptionsToSelect(e.target)}
                          parent-option-id={menuItem.id}
                        >
                          <option value="0">Please choose</option>
                          {item.options &&
                            item.options.map((item: any, index: number) => (
                              <option
                                id={item.id}
                                key={Math.random() + index}
                                value={item.id}
                              >
                                {item.name}
                                {item.cost > 0 ? ' + $' + item.cost : ''}
                              </option>
                            ))}
                        </select>
                      ))}
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
      {viewUIList && viewUIList.map((item: any, index: number) => item.viewUI)}
    </>
  );
};

export default FoodMenuCard;
