import { Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';

const FoodMenuCard = (props: any) => {
  return (
    <>
      <Grid container>
        {props.menuItems.map((menuItem: any) => (
          <Grid item xs={6} sm={6} md={6} lg={4}>
            <Card elevation={6}>
              <Grid container>
                <Grid item xs={8} sm={8} md={8} lg={6}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={menuItem.image}
                    alt="Live from space album cover"
                    title="Live from space album cover"
                  />
                </Grid>
                <Grid item xs={8} sm={8} md={8} lg={6}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="caption" title={menuItem.name}>
                      {menuItem.name}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default FoodMenuCard;
