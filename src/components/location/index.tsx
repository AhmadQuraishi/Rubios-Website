import { Button, Card, Grid, TextField, Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import './location.css';

const LocationCard = (data :any) => {
  const restaurants = data.respondData.restaurants;
 
  console.log("child comp : ")
  console.log( data.respondData.restaurants)
  const [city, setCity] = useState('New York');
  const handleChange = (e: any) => {
    setCity(e.target.value);
    console.log(city);
  };

  const [alignment, setAlignment] = React.useState('web');
  const onServiceSelect = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const filteredRes = restaurants.filter((restaurant :any) => {
    return restaurant.city === city;
  });

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;
   
    console.log( filteredRes)
    return (
      <ListItem
        style={style}
        key={index}
        component="div"
        aria-label="Nearby Location"
        role="list"
        title="Nearby Location"
        className="listing"
      >
        <Grid container>
          <Grid item xs={12}>
            <ListItemButton>
              <ListItemText className="name"
                title={filteredRes[index].storename}
                primary={filteredRes[index].storename}
              />
            </ListItemButton>
          </Grid>

          <Grid item xs={12}>
            <ListItemButton>
              <ListItemText className="address"
                title={filteredRes[index].streetaddress}
                primary={filteredRes[index].streetaddress}
              />
            </ListItemButton>
          </Grid>

          <Grid item xs={12}>
            <ListItemButton>
              <ListItemText className="label"
                title={filteredRes[index].distance}
                primary={filteredRes[index].distance}
              />
            </ListItemButton>
          </Grid>
        </Grid>
      </ListItem>
    );
  }

  const Icon = () => (
    <Button
      className="search-field"
      aria-label="search nearby locations"
      title="search nearby locations"
    >
      <SearchIcon />
    </Button>
  );

  return (
    <Grid container className="list-wrapper">
      <Grid
        item
        xs={12}
        sm={4}
        md={4}
        lg={3}
        sx={{ zIndex: 1, margin: '20px 30px' }}
      >
        <Card>
          <Grid container spacing={2} className="location-sidebar">
            <Grid item xs={12}>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={onServiceSelect}
              >
                <ToggleButton value="Pick up" className="selected-btn">
                  Pick Up
                </ToggleButton>
                <ToggleButton value="Curbside" className="selected-btn">
                  Curbside
                </ToggleButton>
                <ToggleButton value="Delivery" className="selected-btn">
                  Delivery
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="Enter City"
                label="Enter City"
                title="Enter City"
                aria-required="true"
                value={city}
                onChange={handleChange}
                InputProps={{ endAdornment: <Icon /> }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className="label" title="NEARBY LOCATIONS">
                NEARBY LOCATIONS
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FixedSizeList
                height={400}
                itemSize={130}
                width="auto"
                itemCount={filteredRes.length}
                overscanCount={5}
                aria-label="Nearby Locations"
              >
                {renderRow}
              </FixedSizeList>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LocationCard;
