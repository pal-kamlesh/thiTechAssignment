import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import { HiAcademicCap, HiUsers, HiChartBar } from "react-icons/hi";

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function logUserOut() {
    logout();
    navigate("/login");
  }

  return (
    <Navbar
      fluid
      rounded
      className="min-h-[4rem] sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg"
    >
      <NavbarBrand as={Link} to="/" className="flex items-center space-x-3">
        <HiAcademicCap className="h-8 w-8 text-white" />
        <span className="self-center whitespace-nowrap text-2xl font-bold text-white">
          EduManage Pro
        </span>
      </NavbarBrand>
      <NavbarToggle className="text-white hover:bg-blue-700" />
      <NavbarCollapse>
        <NavbarLink
          as="div"
          onClick={() => navigate("/")}
          active={pathname === "/" ? true : false}
          className="cursor-pointer text-lg font-medium"
        >
          <div className="text-white hover:text-blue-200 transition-colors flex items-center space-x-2">
            <HiChartBar className="h-5 w-5" />
            <span>Home</span>
          </div>
        </NavbarLink>

        <NavbarLink
          as="div"
          onClick={() => navigate("/students")}
          active={pathname === "/students" ? true : false}
          className="cursor-pointer text-lg font-medium"
        >
          <div className="text-white hover:text-blue-200 transition-colors flex items-center space-x-2">
            <HiUsers className="h-5 w-5" />
            <span>Students</span>
          </div>
        </NavbarLink>

        {currentUser ? (
          <NavbarLink
            as="div"
            onClick={logUserOut}
            className="cursor-pointer text-lg font-medium"
          >
            <div className="text-white hover:text-red-200 transition-colors">
              Logout
            </div>
          </NavbarLink>
        ) : (
          <NavbarLink
            as="div"
            onClick={() => navigate("/login")}
            active={pathname === "/login" ? true : false}
            className="cursor-pointer text-lg font-medium"
          >
            <div className="text-white hover:text-blue-200 transition-colors">
              Login
            </div>
          </NavbarLink>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}
