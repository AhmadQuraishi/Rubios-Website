import './App.css';
import RootRoutes from './routes';
import { connect } from 'react-redux';
import Header from "./components/header.component";
import Login from './pages/login/login.component';


const App = (props) => {
 return (
   <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: 100 + "vh", width: 100 + "%"}}>
    <RootRoutes />
   </div>   
 );
}

const mapStateToProps = state => ({
 currentUser: state.user.currentUser
});


export default connect(mapStateToProps)(App);
