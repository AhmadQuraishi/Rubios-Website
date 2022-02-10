import { useSelector } from 'react-redux';

export function GetAccesstoken() {
  debugger;
  const { providertoken } = useSelector(
    (state: any) => state.TokensReducer.providertoken,
  );
}
