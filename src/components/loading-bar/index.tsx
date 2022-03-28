import './index.css';
import { CircularProgress } from '@mui/material';
const LoadingBar = () => {
  return (
    <div className="spinner-container">
      <CircularProgress />
    </div>
  );
};

export default LoadingBar;
