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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesRequest } from '../../redux/actions/category';
import { useParams } from 'react-router-dom';
import LoadingBar from '../../components/loading-bar';

const Product = () => {
  const initValue: any = null;
  const [product, setProduct] = useState(initValue);
  const { categoryID, id } = useParams();
  const { categories, loading } = useSelector(
    (state: any) => state.categoryReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //TODO: StoreID will get from State when select store work will be done
    const storeID = 60854;
    dispatch(getCategoriesRequest(storeID));
  }, []);

  useEffect(() => {
    if (categories && categories.categories) {
      if (id && categoryID) {
        const category = categories.categories.find((obj: any) => {
          return obj.id == categoryID;
        });
        if (category) {
          const product = category.products.find((obj: any) => {
            return obj.id == id;
          });
          setProduct(product);
        }
      }
    }
  }, [categories]);

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
      {loading == true && product == null && <LoadingBar />}
      {product && (
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
                  title={product.name}
                >
                  {product.name}
                </Typography>
                <Typography variant="h6" title={product.description}>
                  {product.description}
                </Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      variant="caption"
                      className="label bold"
                      aria-label={`${product.basecalories} Cal`}
                      title={`${product.basecalories} Cal`}
                    >
                      {product.basecalories} Cal
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      className="price"
                      title={`$${parseFloat(product.cost).toFixed(2)}`}
                    >
                      ${parseFloat(product.cost).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    aria-label={product.name}
                    title={product.name}
                  />
                ) : (
                  <img
                    style={{ width: '80%', display: 'block', margin: 'auto' }}
                    src={require('../../assets/imgs/default_img.png')}
                    alt={product.name}
                    aria-label={product.name}
                    title={product.name}
                  />
                )}
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
      )}
    </>
  );
};

export default Product;
