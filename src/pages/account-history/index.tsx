import { Grid, Typography, Tabs, Box, Tab } from '@mui/material';
import { useState } from 'react';
import LeftMenuBar from '../../components/left-menu-bar';

import HistoryGrid from '../../components/history-grid';

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
          <Typography>{children}</Typography>
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

  return (
    <>
      <Grid container spacing={0}>
        <Grid
          item
          xs={0}
          sm={3}
          lg={2}
          sx={{ display: { xs: 'none', sm: 'grid' } }}
        >
          <LeftMenuBar />
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          lg={10}
          sx={{ padding: { xs: '30px 20px', sm: '30px 40px' } }}
        >
          <Typography
            variant="h5"
            sx={{
              paddingBottom: '10px',
              color: 'secondary.main',
              fontWeight: 700,
              fontFamily: 'Poppins-Bold !important',              
              textTransform: 'uppercase'
            }}
          >
            Account History
          </Typography>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Account History Tabs"
              indicatorColor="primary"
            >
              <Tab label="All History" {...a11yProps(0)} />
              <Tab label="Transaction History" {...a11yProps(1)} />
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
    </>
  );
};

export default AccountHistory;
