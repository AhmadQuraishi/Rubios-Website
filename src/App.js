import './App.css';
import RootRoutes from './routes';
import { connect } from 'react-redux';
import Header from "./components/header.component";


const App = (props) => {
  const { currentUser } = props;
 return (
   <div>
    <Header />
    { currentUser && <div>User is Logged-In</div> }
    <RootRoutes />
   </div>   
 );
}

const mapStateToProps = state => ({
 currentUser: state.user.currentUser
});


export default connect(mapStateToProps)(App);
