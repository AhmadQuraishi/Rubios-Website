import { connect } from "react-redux";
import { setCurrentUser } from "../redux/user/user.action"

const Header = (props) => {
    const { setCurrentUser } = props;
 return(
     <button type="button" onClick={() => {setCurrentUser(true)}}>Make User Online</button>
 );
}

const mapDisptachToProps = dispatch => ({
 setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDisptachToProps)(Header);