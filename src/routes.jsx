
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home.component";
import Login from "./pages/login/login.component";
import Account from "./pages/account/account.component";

const RootRoutes = () => {
return (
    <div>
        <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/account" element={<Account />}/>
        </Routes>
    </div>);
}

export default RootRoutes;