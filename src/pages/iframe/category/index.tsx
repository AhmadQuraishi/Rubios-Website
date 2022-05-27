import ProductListing from '../../../components/iframe/product-listing';
import { Grid, Typography, Tabs, Tab, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesRequest } from '../../../redux/actions/category';
import { Category } from '../../../types/olo-api';
import ProductListingSkeletonUI from '../../../components/product-listing-skeleton-ui';
import {
  CATERING_CATEGORIES,
  HOME_PAGE_CATEGORIES,
} from '../../../helpers/category';
import { useLocation } from 'react-router-dom';
import './category.css';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{paddingBottom: 0}} p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const CategoryList = () => {
  const query = new URLSearchParams(useLocation().search);
  const catering = query.get('catering');
  const [value, setValue] = useState(0);
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  const [imagePath, setImagePath] = useState('');
  const { categories, loading, error } = useSelector(
    (state: any) => state.categoryReducer,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesRequest(60854));
  }, []);

  useEffect(() => {
    if (categories && categories.categories && categories.categories.length) {
      const filteredCategories: any = [];
      categories.categories.forEach((cat: any) => {
        const filterArray =
          catering === 'true' ? CATERING_CATEGORIES : HOME_PAGE_CATEGORIES;
        if (filterArray.includes(cat.name)) {
          filteredCategories.push(cat);
        }
      });
      if (categories.imagepath) {
        setImagePath(categories.imagepath);
      }
      setCategoriesWithProducts(filteredCategories);
    }
  }, [categories]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const fromatProductName = (name: string) => {
    return name.replace('CATERING ', '');
  };

  return (
    <Grid sx={{ minHeight: 'auto', padding: {xs:'0px 15px', sm:'0px 15px', md: '0px 20px', lg: '0px 20px'} }}>
      {loading === true && <ProductListingSkeletonUI />}
      {categoriesWithProducts && categoriesWithProducts.length > 0 && (
        <>
          <Box
            sx={{
              width: '100%',
              background: '#FFF',
              zIndex: '1099',
              padding: {
                xs: '0px 5px 10px 5px',
                sm: '0px 30px 5px 30px',
                lg: '0px 30px 5px 30px',
                boxSizing: 'border-box',
              },
            }}
            id="categoryMenu"
          >
            <Typography
              variant="h1"
              title="WHAT ARE YOU CRAVING?"
              sx={{ marginBottom: '20px' }}
            >
              WHAT ARE YOU CRAVING?
            </Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              sx={{ fontFamily: 'Poppins-Medium !important' }}
              role="region"
              aria-label="Food Menu"
            >
              {categoriesWithProducts.map((item: Category, index: number) => (
                <Tab
                  key={item.id}
                  value={index}
                  label={fromatProductName(item.name)}
                  title={fromatProductName(item.name)}
                  color="secondary.main"
                  sx={{
                    fontFamily: 'Poppins-Medium !important',
                    minWidth: 'auto',
                    padding: '12px 0px',
                    margin: '0px 16px',
                  }}
                  role="link"
                  className="tabs-btn"
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
        </>
      )}
      {categoriesWithProducts &&
        categoriesWithProducts.length > 0 &&
        categoriesWithProducts.map((item: Category, index: number) => (
          <TabPanel value={value} index={index}>
            <Grid item xs={12} sx={{ paddingBottom: '0px' }} role="list">
              <ProductListing
                productList={item.products}
                categoryID={item.id}
                imgPath={imagePath}
                shownItemsCount={4}
              />
            </Grid>
          </TabPanel>
        ))}
    </Grid>
  );
};

export default CategoryList;
