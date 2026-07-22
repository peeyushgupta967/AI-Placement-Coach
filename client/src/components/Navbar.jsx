import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {

        dispatch(logout());

        navigate("/");

    };

    return (

        <div className="flex h-16 items-center justify-between border-b bg-white px-8 shadow">

            {/* <h2 className="text-2xl font-semibold">
                Dashboard
            </h2> */}

            

        </div>

    );

}

export default Navbar;