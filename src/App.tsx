import { useEffect, useState } from 'react';
import MainApp from './MainApp';
import IframeApp from './IframeApp';

function App(props: any) {
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    if (window.location.href.toLocaleLowerCase().indexOf('/iframe') !== -1) {
      setIsIframe(true);
    }
  }, []);
  return <>{!isIframe ? <MainApp /> : <IframeApp />}</>;
}
export default App;
