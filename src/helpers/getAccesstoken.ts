import { useSelector } from 'react-redux';

export function GetAccesstoken() {
  const { providertoken } = useSelector(
    (state: any) => state.TokensReducer.providertoken,
  );
}
