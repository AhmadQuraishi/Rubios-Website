import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
} from '@mui/material';
import FoodMenuCard from '../../components/food-menu-card';
import ArrowForward from '@mui/icons-material/ArrowForward';
import './product.css';
import StoreInfoBar from '../../components/store-info-bar';

const Product = () => {
  const menuItems1 = [
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Chips',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Maxicon Rice',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Citrus Rice',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Fresh Greens',
    },
  ];
  const menuItems2 = [
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Chips',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Maxicon Rice',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Citrus Rice',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Fresh Greens',
    },
  ];
  const drinks = [
    {
      image:
        'https://cdnprod.mafretailproxy.com/sys-master-root/hc0/h47/9843100844062/46332_main.jpg_480Wx480H',
      name: 'Pepsi',
    },
    {
      image:
        'https://cdnprod.mafretailproxy.com/sys-master-root/hc0/h47/9843100844062/46332_main.jpg_480Wx480H',
      name: 'Sprite',
    },
    {
      image:
        'https://cdnprod.mafretailproxy.com/sys-master-root/hc0/h47/9843100844062/46332_main.jpg_480Wx480H',
      name: 'Coke',
    },
    {
      image:
        'https://cdnprod.mafretailproxy.com/sys-master-root/hc0/h47/9843100844062/46332_main.jpg_480Wx480H',
      name: '7up',
    },
  ];
  return (
    <>
      <StoreInfoBar />
      <Grid container className="product-detail">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Typography
                variant="caption"
                title="PICK UP YOUR"
                className="label"
              >
                PICK UP YOUR
              </Typography>
              <Typography
                variant="h4"
                className="heading"
                title="Maxican Street Toca Plate"
              >
                Maxican Street Toca Plate
              </Typography>
              <Typography
                variant="h6"
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                ipsum lorem, laoreet vel nulla at, pellentesque rhoncus nibh.
                Suspendisse potenti. Vestibulum ante ipsum primis in faucibus
                orci luctus et ultrices posuere cubilia curae; Nam bibendum
                justo vel nunc ultrices bibendum. Sed in diam turpis. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra,
                per inceptos himenaeos. Duis eget luctus est, quis aliquam
                lorem. Nulla volutpat metus at felis faucibus, sit amet feugiat
                diam gravida. Donec vestibulum efficitur tincidunt. Duis at
                facilisis justo, sit amet tristique risus. Sed imperdiet
                malesuada lectus, a tempus nulla facilisis ut. Pellentesque
                sollicitudin tellus dictum nisi mattis gravida eu non lorem.
                Praesent eu viverra magna, eu cursus velit.
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
                    className="label bold"
                    title="1000 Cal"
                  >
                    1000 Cal
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" className="price" title="$9.69">
                    $9.69
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <CardMedia
                component="img"
                sx={{ width: 500 }}
                image=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU"
                alt="Maxican Street Toca Plate"
                aria-label="Maxican Street Toca Plate"
                title="Maxican Street Toca Plate"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Card elevation={6} className="single-product">
                <Grid container>
                  {/*<Grid item xs={8} sm={8} md={8} lg={5}>*/}
                  {/*<CardMedia*/}
                  {/*component="img"*/}
                  {/*sx={{ width: 200 }}*/}
                  {/*image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU"*/}
                  {/*alt="TACO ONE"*/}
                  {/*aria-label="TACO ONE"*/}
                  {/*title="TACO ONE"*/}
                  {/*/>*/}
                  {/*</Grid>*/}
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography
                      title="TACO ONE"
                      variant="caption"
                      className="label"
                    >
                      TACO ONE
                    </Typography>
                    <Typography
                      variant="h4"
                      title="MAXICAN STREET CORN SHRIMP TACO"
                    >
                      MAXICAN STREET CORN
                      <br /> SHRIMP TACO
                    </Typography>
                    <Button
                      title="Click to customize"
                      className="custom-btn"
                      endIcon={<ArrowForward />}
                    >
                      CLICK TO CUSTOMIZE
                    </Button>
                  </CardContent>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Card elevation={6} className="single-product">
                <Grid container>
                  {/*<Grid item xs={8} sm={8} md={8} lg={5}>*/}
                  {/*<CardMedia*/}
                  {/*component="img"*/}
                  {/*sx={{ width: 200 }}*/}
                  {/*image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU"*/}
                  {/*alt="TACO TWO"*/}
                  {/*aria-label="TACO TWO"*/}
                  {/*title="TACO TWO"*/}
                  {/*/>*/}
                  {/*</Grid>*/}
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography
                      title="TACO ONE"
                      variant="caption"
                      className="label"
                    >
                      TACO ONE
                    </Typography>
                    <Typography
                      variant="h4"
                      title="MAXICAN STREET CORN SHRIMP TACO"
                    >
                      MAXICAN STREET CORN
                      <br /> SHRIMP TACO
                    </Typography>
                    <Button
                      title="Click to customize"
                      className="custom-btn"
                      endIcon={<ArrowForward />}
                    >
                      CLICK TO CUSTOMIZE
                    </Button>
                  </CardContent>
                </Grid>
              </Card>
            </Grid>
          </Grid>
          <Grid container className="menu-items">
            <Typography variant="h4" title="SELECT SIDE ONE">
              SELECT SIDE ONE
            </Typography>
            <FoodMenuCard menuItems={menuItems1} />
            <Typography variant="h4" title="SELECT SIDE TWO">
              SELECT SIDE TWO
            </Typography>
            <FoodMenuCard menuItems={menuItems2} />
            <Typography variant="h4" title="ADD A DRINK">
              ADD A DRINK
            </Typography>
            <FoodMenuCard menuItems={drinks} />
            <br />
            <br />
          </Grid>
          <Grid container>
            <Grid item xs={12} md={8} lg={8}></Grid>
            <Grid item xs={12} md={2} lg={2}>
              <Button title="Quantity" className="label bold">
                QUANTITY
              </Button>
            </Grid>
            <Grid item xs={12} md={2} lg={2}>
              <Button
                aria-label="add to bag"
                title="ADD TO Bag"
                className="add-to-bag"
                variant="contained"
              >
                ADD TO Bag
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Product;
