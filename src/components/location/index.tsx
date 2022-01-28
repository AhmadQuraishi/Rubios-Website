import {  Button , Card,Grid , TextField  , Box , Typography} from '@mui/material'
import React, { Fragment, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import {Link} from "react-router-dom";

const LocationCard = () => {

  const restaurants = [
    { name: 'Broadway Blvd' , address : '20212 North 59th Ave , Ste , 465A , san Diego , CA' , distance : '4.2 Miles Away' , city : 'san deigo' },
    { name: 'Broadway Blvd' , address : '20212 North 59th Ave , Ste , 465A , san Diego , CA' , distance : '4.2 Miles Away' , city : 'san deigo'  },
    { name: 'Broadway Blvd' , address : '20212 North 59th Ave , Ste , 465A , san Diego , CA' , distance : '4.2 Miles Away', city : 'san deigo'  },
    { name: 'Broadway Blvd' , address : '20212 North 59th Ave , Ste , 465A , san Diego , CA' , distance : '4.2 Miles Away' , city : 'san deigo' },
    { name: 'Broadway Blvd' , address : '20212 North 59th Ave , Ste , 465A , san Diego , CA' , distance : '4.2 Miles Away' ,  city : 'mexico' },
    { name: 'Broadway Blvd' , address : '20212 North 59th Ave , Ste , 465A , san Diego , CA' , distance : '4.2 Miles Away' ,  city : 'mexico'},
    { name: 'Broadway Blvd' , address : '20212 North 59th Ave , Ste , 465A , san Diego , CA' , distance : '4.2 Miles Away' ,  city : 'mexico' },
    { name: 'Broadway Blvd' , address : '20212 North 59th Ave , Ste , 465A , san Diego , CA' , distance : '4.2 Miles Away' },
    { name: 'Broadway Blvd' , address : '20212 North 59th Ave , Ste , 465A , san Diego , CA' , distance : '4.2 Miles Away' },
    { name: 'Broadway Blvd' , address : '20212 North 59th Ave , Ste , 465A , san Diego , CA' , distance : '4.2 Miles Away' },
    { name: 'Broadway Blvd' , address : '20212 North 59th Ave , Ste , 465A , san Diego , CA' , distance : '4.2 Miles Away' },
    { name: 'Broadway Blvd' , address : '20212 North 59th Ave , Ste , 465A , san Diego , CA' , distance : '4.2 Miles Away' }
  ]

  const [city , setCity] = useState('Enter City');
  const handleChange = (e: any) =>{

    setCity(e.target.value);
    console.log(city);

  }

  const filteredRes = restaurants.filter((restaurant)=> {
    return restaurant.city == city
  })

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" >

        <Grid container >

          <Grid item xs={12}  >
        <ListItemButton>
          <ListItemText primary={filteredRes[index].name} />
        </ListItemButton>
          </Grid>

            <Grid item xs={12}  >

          <ListItemButton>
          <ListItemText primary={filteredRes[index].address} />
          </ListItemButton>
            </Grid>

          <Grid item xs={12}  >
            <ListItemButton>
          <ListItemText primary={filteredRes[index].distance} />
        </ListItemButton>
          </Grid>

          <Grid item xs={12}  >
          </Grid>

        </Grid>

      </ListItem>
    );
  }


  return (

    <Grid container  >

      <Grid item xs={12} sm={4} md={4} lg = {3}  sx = {{zIndex : 1 , margin : '20px 30px' }} >

        <Card >

          <Grid container spacing = {2}  sx = {{textAlign : 'center'}}>

            <Grid item xs={12}  >
              <Button color = 'primary' variant="contained" size="large">PICK UP</Button>
            </Grid>

            <Grid item xs={12} >
              <Button color = 'primary' variant="contained" size="medium">CURBSIDE</Button>
            </Grid>

            <Grid item xs={12} >
              <Button color = 'primary' variant="contained" size="medium">DELIVERY</Button>
            </Grid>

            <Grid item xs={12} >
              <TextField
                value={city}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} >
              <Typography variant = 'h5'>NEARBY LOCATIONS</Typography>
            </Grid>


            {/*<Grid item xs={12} sm={12} md={12}  >*/}

            {/*  {*/}
            {/*    filteredRes.map((restaurant , index)=>(*/}
            {/*      <Link to = '/'>*/}
            {/*      <Box key = {index.toString()}>*/}
            {/*        <Typography variant = 'h4'>{restaurant.name}</Typography>*/}
            {/*        <Typography variant = 'h6'>{restaurant.address}</Typography>*/}
            {/*        <Typography variant = 'h6' color = 'primary'>{restaurant.distance}</Typography>*/}
            {/*      </Box>*/}
            {/*      </Link>*/}
            {/*    ))*/}
            {/*  }*/}

            {/*</Grid>*/}


            <Grid item xs={12}   >


              <FixedSizeList
                height={400}
                itemSize={130}
                width='auto'
                itemCount={filteredRes.length}
                overscanCount={5}
              >
                {renderRow}

              </FixedSizeList>



            </Grid>





          </Grid>
        </Card>
      </Grid>

    </Grid>

  )
}

export default LocationCard
