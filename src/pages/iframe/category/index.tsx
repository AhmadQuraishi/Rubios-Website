import ProductListing from '../../../components/iframe/product-listing';
import { Grid, Typography, Tabs, Tab, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesRequest } from '../../../redux/actions/category';
import { Category, ResponseMenu } from '../../../types/olo-api';
import ProductListingSkeletonUI from '../../../components/product-listing-skeleton-ui';


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
        <Box p={3}>
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
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    maxWidth: 400,
    background: '#FFF',
    border: '1px solid #FFF',
  };
  const [value, setValue] = useState(0);
  const [categoriesWithProducts, setCategoriesWithProducts] =
    useState<ResponseMenu>();
  const { categories, loading, error } = useSelector(
    (state: any) => state.categoryReducer,
  );

  const dispatch = useDispatch();
  const body = document;

  useEffect(() => {
    dispatch(getCategoriesRequest(60854));
  }, []);


  useEffect(() => {
    if (categories && categories.categories) {
      setCategoriesWithProducts(categories);

      // body.addEventListener('scroll', (e) => {
      //   e.preventDefault();
      //   var categoryPanel = document.getElementById('categoryMenu');
      //   var dummyCategoryPanel = document.getElementById('dummyCategoryPanel');
      //
      //   //checkScrollIndex(scrollValues, window.scrollY);
      //   if (categoryPanel && dummyCategoryPanel) {
      //     if (window.scrollY > categoryPanel.offsetTop) {
      //       categoryPanel.style.position = 'fixed';
      //       // categoryPanel.style.top = '60px';
      //       dummyCategoryPanel.style.display = 'block';
      //     } else {
      //       categoryPanel.style.position = 'relative';
      //       categoryPanel.style.top = '0px';
      //       dummyCategoryPanel.style.display = 'none';
      //     }
      //   }
      // });
    }
  }, [categories]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div style={{ minHeight: '500px' }}>
      {loading === true && <ProductListingSkeletonUI />}
      {categoriesWithProducts?.categories &&
        categoriesWithProducts?.categories.length > 0 && (
          <>
            <Box
              sx={{
                width: '100%',
                background: '#FFF',
                zIndex: '1099',
                padding: {
                  xs: '20px 5px 10px 5px',
                  sm: '20px 30px 5px 30px',
                  lg: '20px 30px 5px 30px',
                  boxSizing: 'border-box',
                },
              }}
              id="categoryMenu"
            >
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
                {categoriesWithProducts?.categories.map(
                  (item: Category, index: number) => (
                    <Tab
                      key={item.id}
                      value={index}
                      label={item.name}
                      title={item.name}
                      color="secondary.main"
                      sx={{ fontFamily: 'Poppins-Medium !important' }}
                      role="link"
                      href={`#cat-panel-${index}`}
                      {...a11yProps(index)}
                    />
                  ),
                )}
              </Tabs>
            </Box>
          </>
        )}
      {categoriesWithProducts?.categories &&
        categoriesWithProducts?.categories.length > 0 &&
        categoriesWithProducts?.categories.map(
          (item: Category, index: number) => (
            <TabPanel value={value} index={index}>
              <Grid item xs={12} sx={{ paddingBottom: '20px' }} role="list">
                <ProductListing
                  productList={item.products}
                  categoryID={item.id}
                  imgPath={categoriesWithProducts.imagepath}
                  shownItemsCount={4}
                />
              </Grid>
            </TabPanel>
          ),
        )}
      <div style={{ paddingBottom: '30px' }}></div>
    </div>
  );
};

export default CategoryList;
