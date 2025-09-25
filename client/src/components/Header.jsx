import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useDispatch } from "react-redux";
import { handleLogout } from "../redux/user/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function logUserOut() {
    dispatch(handleLogout());
    navigate("/login");
  }

  return (
    <Navbar
      fluid
      rounded
      className="min-h-[4rem] sticky top-0 z-10 col-[1/-1] row-[1]  bg-sky-500 text-black"
    >
      <NavbarBrand as="a" href="https://flowbite-react.com">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          FeedBucket
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink
          as="div"
          onClick={() => navigate("/")}
          active={pathname === "/" ? true : false}
          className="text-xl"
        >
          <div className="text-white hover:text-black">Home</div>
        </NavbarLink>
        <NavbarLink
          as="div"
          onClick={logUserOut}
          active={pathname === "/login" ? true : false}
          className="cursor-pointer text-xl"
        >
          <div className="text-white hover:text-black">
            {pathname === "/login" ? "Login" : "Logout"}
          </div>
        </NavbarLink>
        <Link to="/students" className="nav-link">
          Student Management
        </Link>
      </NavbarCollapse>
    </Navbar>
  );
}
