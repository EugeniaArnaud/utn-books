import "./App.css";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";


function Layout() {
  const { user, logout } = useAuth();
  const loggedLayout = (
    <>
    <NavLink to={"/home"}>Home</NavLink>
      <NavLink to={"/homecrud"}>Update delete</NavLink>
      <NavLink to={"/crud"}>Add product</NavLink>
      <button className="logout-button" onClick={logout}>Logout</button>
    </>
  );
  const notLoggedLayout = (
    <>
     <NavLink to={"/home"}>Home</NavLink>
      <NavLink to={"/register"}>Register</NavLink>
      <NavLink to={"/login"}>Login</NavLink>
    </>
  );
  return (
    <div className="bodydiv">
      <nav>
        <h1>Bookstore</h1>
        {user ? loggedLayout : notLoggedLayout}       
      </nav>
      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
