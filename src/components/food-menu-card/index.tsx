import { Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import './food-menu-card.css';

const FoodMenuCard = (props: any) => {
  return (
    <Grid container>
      {props.menuItems.map((menuItem: any, index: number) => (
        <Grid item xs={12} md={6} lg={4}>
          <Card key={menuItem.name + index} className="reward-item">
            <Grid container className="rewards">
              <Grid item xs={6}>
                <CardMedia
                  component="img"
                  className="item-image"
                  image={menuItem.image}
                  alt={menuItem.name}
                  title={menuItem.name}
                />
              </Grid>
              <Grid item xs={6}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography
                    variant="caption"
                    title={menuItem.name}
                    className="item-name"
                  >
                    {menuItem.name}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FoodMenuCard;
