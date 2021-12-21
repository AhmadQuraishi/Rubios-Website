
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/user/user.action";

const Account = (props) => {
    const { currentUser, setCurrentUser } = props;
    return (<div>
       {
           !currentUser && <Navigate to="/Login" />
       }
       <button type="button" onClick={() => {setCurrentUser(false)}}></button> 
    </div>);
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);