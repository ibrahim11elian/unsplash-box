import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes, FaSignInAlt, FaBars } from "react-icons/fa"; // Import icons from React Icons
import useOutsideClick from "../hooks/useOutsideClick";
import Logout from "../features/authentication/Logout";
import { useUser } from "../features/authentication/useUser";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../context/DarkMode";

function Navigation() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useOutsideClick(() => setIsMenuOpen(false));
  const { currentUser } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <button
        className="block p-2 text-gray-900 sm:hidden"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes className="h-6 w-6" />
        ) : (
          <FaBars className="h-6 w-6" />
        )}
      </button>
      <ul
        ref={ref}
        className={`absolute left-0 top-16 w-screen flex-col gap-1 bg-white transition-transform duration-300 sm:static sm:flex sm:w-auto sm:flex-row sm:items-center ${
          isMenuOpen ? "flex border-b p-2" : "hidden"
        }`}
      >
        <li className="m-auto w-fit">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center rounded px-3 py-1.5 text-sm text-gray-600 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900 sm:px-4 sm:py-2 sm:text-base ${
                isActive ? "bg-gray-200 text-gray-900" : ""
              }`
            }
          >
            <span>Home</span>
          </NavLink>
        </li>
        <li className="m-auto w-fit">
          <NavLink
            to="/collections"
            className={({ isActive }) =>
              `flex items-center rounded px-3 py-1.5 text-sm text-gray-600 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900 sm:px-4 sm:py-2 sm:text-base ${
                isActive ? "bg-gray-200 text-gray-900" : ""
              }`
            }
          >
            <span>Collections</span>
          </NavLink>
        </li>

        <li className="m-auto w-fit">
          <button
            onClick={toggleDarkMode}
            className="rounded p-2 text-lg text-gray-800 hover:bg-gray-300"
          >
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
          </button>
        </li>

        <li className="m-auto w-fit">
          {currentUser ? (
            <Logout />
          ) : (
            <NavLink
              to={"/login"}
              className="flex items-center rounded border-2 px-3 py-1 text-sm text-gray-600 transition-colors duration-300 hover:bg-gray-200 hover:text-gray-900 disabled:cursor-not-allowed sm:px-4 sm:py-1.5 sm:text-base"
            >
              <span className="flex gap-2">
                <FaSignInAlt className="h-5 w-5 sm:hidden" /> Login
              </span>
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
