import { Grid, Typography, Tabs, Box, Tab, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { getAccountHistory } from '../../redux/actions/account-history';
import Page from '../page-title';
import './index.css'
import CheckIn from './check-ins/index';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
  // padding: '0px 20px 40px 20px',
    maxWidth: '1260px',
    boxSizing: 'border-box',
    //margin: 'auto',
  },
  heading: {
    paddingBottom: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '22px !important',
    },
  },
  tabspanel: {
    fontFamily: "'grit_sansbold' !important",
    fontSize: '14px !important',
    color: theme.palette.secondary.main + ' !important',
    paddingLeft: '0px !important',
    paddingRight: '0px !important',
    marginRight: '40px !important',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
 
  const { children, value, index, ...other } = props;

  return (
    <Page title={'Account History'} className="">
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ padding: '0px 0' }}>
            <Typography component="div">{children}</Typography>
          </Box>
        )}
      </div>
    </Page>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const PointsGrid = () => {
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const [ event_filter,setEventFilter] = useState("checkins");
  useEffect(() => {
    dispatch(getAccountHistory(event_filter));
  }, [event_filter]);

  const classes = useStyles();
  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <TabPanel value={value} index={0}>
            <CheckIn />
          </TabPanel>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default PointsGrid;
