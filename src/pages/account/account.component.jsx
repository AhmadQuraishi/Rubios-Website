
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.action";
import { Button } from "@mui/material";

const Account = (props) => {
    const { currentUser, setCurrentUser } = props;
    return (<div style={{padding: 30 + "px"}}>
       {
           !currentUser && <Navigate to="/" />
       }
       {currentUser &&
       <Button  variant="contained" color="success" onClick={() => {setCurrentUser(false)}}>Logout</Button>}
    </div>);
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);