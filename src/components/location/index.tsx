import { Button, Card, Grid, TextField, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import SearchIcon from '@mui/icons-material/Search';
import './location.css';

const LocationCard = () => {
  const restaurants = [
    {
      name: 'Broadway Blvd',
      address: '20212 North 59th Ave , Ste , 465A , san Diego , CA',
      distance: '4.2 Miles Away',
      city: 'san deigo',
    },
    {
      name: 'Broadway Blvd',
      address: '20212 North 59th Ave , Ste , 465A , san Diego , CA',
      distance: '4.2 Miles Away',
      city: 'san deigo',
    },
    {
      name: 'Broadway Blvd',
      address: '20212 North 59th Ave , Ste , 465A , san Diego , CA',
      distance: '4.2 Miles Away',
      city: 'san deigo',
    },
    {
      name: 'Broadway Blvd',
      address: '20212 North 59th Ave , Ste , 465A , san Diego , CA',
      distance: '4.2 Miles Away',
      city: 'san deigo',
    },
    {
      name: 'Broadway Blvd',
      address: '20212 North 59th Ave , Ste , 465A , san Jose , CA',
      distance: '4.2 Miles Away',
      city: 'san jose',
    },
    {
      name: 'Broadway Blvd',
      address: '20212 North 59th Ave , Ste , 465A , san jose , CA',
      distance: '4.2 Miles Away',
      city: 'san jose',
    },
    {
      name: 'Broadway Blvd',
      address: '20212 North 59th Ave , Ste , 465A , san Jose , CA',
      distance: '4.2 Miles Away',
      city: 'san jose',
    },
    {
      name: 'Broadway Blvd',
      address: '20212 North 59th Ave , Ste , 465A , san Jose , CA',
      distance: '4.2 Miles Away',
      city: 'san jose',
    },
    {
      name: 'Broadway Blvd',
      address: '20212 North 59th Ave , Ste , 465A , san Jose , CA',
      distance: '4.2 Miles Away',
      city: 'san jose',
    },
    {
      name: 'Broadway Blvd',
      address: '20212 North 59th Ave , Ste , 465A , san jose , CA',
      distance: '4.2 Miles Away',
      city: 'san jose',
    },
    {
      name: 'Broadway Blvd',
      address: '20212 North 59th Ave , Ste , 465A , san jose , CA',
      distance: '4.2 Miles Away',
      city: 'san jose',
    },
    {
      name: 'Broadway Blvd',
      address: '20212 North 59th Ave , Ste , 465A , san Jose , CA',
      distance: '4.2 Miles Away',
      city: 'san jose',
    },
  ];

  const [city, setCity] = useState('san deigo');
  const handleChange = (e: any) => {
    setCity(e.target.value);
    console.log(city);
  };

  const filteredRes = restaurants.filter((restaurant) => {
    return restaurant.city === city;
  });

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

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
                title={filteredRes[index].name}
                primary={filteredRes[index].name}
              />
            </ListItemButton>
          </Grid>

          <Grid item xs={12}>
            <ListItemButton>
              <ListItemText className="address"
                title={filteredRes[index].address}
                primary={filteredRes[index].address}
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" title="Pick up">
                PICK UP
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" title="Curbside">
                CURBSIDE
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" title="Delivery">
                DELIVERY
              </Button>
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
