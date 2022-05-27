import MainApp from './MainApp';
import IframeApp from './IframeApp';

const isIframe =
  window.location.href.toLocaleLowerCase().indexOf('/iframe') !== -1;

function App(props: any) {
  return <>{isIframe ? <IframeApp /> : <MainApp />}</>;
}
export default App;
