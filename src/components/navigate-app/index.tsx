import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { navigateAppActionRemove } from '../../redux/actions/navigate-app';

const NavigateApp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { url } = useSelector((state: any) => state.navigateAppReducer);

  useEffect(() => {
    if (url) {
      navigate(url);
      dispatch(navigateAppActionRemove());
    }
  }, [url]);

  return <></>;
};

export default NavigateApp;
