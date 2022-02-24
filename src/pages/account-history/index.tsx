import { Grid, Typography, Tabs, Box, Tab, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { Fragment } from 'react';

import HistoryGrid from '../../components/history-grid';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 15px',
    boxSizing: 'border-box',
  },
  heading: {
    paddingBottom: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px !important',
    },
  },
  tabspanel: {
    fontFamily: 'Poppins-Medium !important',
    color: theme.palette.secondary.main + ' !important',
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
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: '20px 0' }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AccountHistory = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            className={classes.heading}
            title="Account History"
          >
            ACCOUNT HISTORY
          </Typography>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Account History Tabs"
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#79C043',
                },
              }}
            >
              <Tab
                label="All History"
                className={classes.tabspanel}
                title="All History"
                {...a11yProps(0)}
              />
              <Tab
                className={classes.tabspanel}
                label="Transaction History"
                title="Transaction History"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <HistoryGrid />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HistoryGrid />
          </TabPanel>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AccountHistory;
