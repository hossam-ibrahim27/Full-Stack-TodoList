import toast from "react-hot-toast";
import { Link, NavLink, useLocation } from "react-router";

const Navbar = () => {
    const { pathname } = useLocation();
    const userDataString = localStorage.getItem("loggedUserData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const onLogOut = () => {
        localStorage.removeItem("loggedUserData");
        toast.success('You Make Logout , So Now Navigate to Login after 2 seconds.', {
            duration: 1500,
            style: {
                padding: '16px',
                color: '#FFFAEE',
                backgroundColor: "#1d293d",
                width: "fit-content"
            },
            iconTheme: {
                primary: '#FFFAEE',
                secondary: '#1d293d',
            },
        })
        setTimeout(() => {
            location.replace(pathname);
        }, 2000)
    }
    return (
        <header className="@container">
            <nav className="w-[90%] @md:w-[85%] @2xl:w-[75%] @4xl:w-[60%] @6xl:w-[40%] m-auto text-slate-800 flex justify-between items-center text-lg py-2">
                <span><Link className="font-bold text-2xl" to={"/"}>ZONETODOS</Link></span>
                <ul className="flex justify-between items-center font-medium space-x-4">
                    {
                        userData ?
                            <>
                                <li>
                                    <NavLink className={"hover:text-indigo-800"} to={"todos"}>
                                        Todos
                                    </NavLink>
                                </li>
                                <li>
                                    <span className={"hover:text-indigo-800 cursor-pointer"} onClick={onLogOut}>Logout</span>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink className={"hover:text-indigo-800"} to={"register"}>
                                        Register
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={"hover:text-indigo-800"} to={"login"}>
                                        Login
                                    </NavLink>
                                </li>
                            </>
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;