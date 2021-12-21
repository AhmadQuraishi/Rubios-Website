import "./login.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../redux/user/user.action";
import { connect } from "react-redux";

const Login = (props) => {
    const location  = useNavigate();
    const { setCurrentUser } = props;
    return(
        <div style={{boxSizing: "border-box" ,width:"500px", margin: "auto", border: "1px solid #ddd", padding: 20 + "px", backgroundColor: "#FFF"}}>
            <div style={{ paddingBottom: 10 + "px"}}>
                <TextField fullWidth
                    id="username-required"
                    label="Username"
                />
            </div>
            <div>
                <TextField fullWidth
                    id="password-required"
                    label="Password"
                />
            </div>
            <div style={{ paddingTop: 10 + "px", display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                <Button variant="contained" color="secondary">Cancel</Button>&nbsp;&nbsp;&nbsp;<Button variant="contained" onClick={() => { setCurrentUser(true); location("/account") }}>Login</Button>
            </div>
        </div>
    );
}
const mapDisptachToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
   });
   
export default connect(null, mapDisptachToProps)(Login);