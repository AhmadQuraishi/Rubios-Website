import { Box } from '@mui/material';
import AccountLinks from '../account-links';
import './index.css'
const LeftMenuBar = () => {
  return (
    <Box
    className ='widthSetting'
      sx={{
        boxShadow: 2,
        width: '100%',
        bgcolor: 'background.paper',
        height: '100%',
      }}
    >
      <AccountLinks />
    </Box>
  );
};

export default LeftMenuBar;