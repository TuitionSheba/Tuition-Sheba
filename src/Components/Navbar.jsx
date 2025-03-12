import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
import { AuthContext } from "../Auth Provider/AuthContext";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const Links = (
    <>
      <li>
        <NavLink className="hover:opacity-80">Available Tuitions</NavLink>
      </li>
      <li>
        <NavLink className="hover:opacity-80">Find Tutor</NavLink>
      </li>
      <li>
        <Scroll
          to="target"
          smooth="true"
          duration={500}
          className="hover:opacity-80 cursor-pointer"
        >
          About Us
        </Scroll>
      </li>
      <li>
        <NavLink
          className="hover:opacity-80 cursor-pointer"
          to={"/Requirements-Forum"}
        >
          Get a Tutor
        </NavLink>
      </li>
      <li>
        {user ? (
          <>
            <div className="dropdown dropdown-left dropdown-bottom">
              <div tabIndex={0} role="button">
                {user?.photoURL ? (
                  <img
                    className="w-[40px] h-[40px] rounded-full"
                    src={user.photoURL}
                    alt=""
                  />
                ) : (
                  <CgProfile className="text-[40px]" />
                )}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-black"
              >
                <li>
                  <NavLink to={"/dashboard/user-profile"}>Dashboard</NavLink>
                </li>
                <li>
                  <span
                    onClick={() => {
                      logOut();
                    }}
                    className="cursor-pointer"
                  >
                    Log Out
                  </span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </li>
    </>
  );
  const mobileLinks = (
    <>
      <li>
        <NavLink to={"/dashboard/user-profile"}>Dashboard</NavLink>
      </li>
      <li>
        <NavLink className="hover:opacity-80">Available Tuitions</NavLink>
      </li>
      <li>
        <NavLink className="hover:opacity-80">Find Tutor</NavLink>
      </li>
      <li>
        <Scroll
          to="target"
          smooth="true"
          duration={500}
          className="hover:opacity-80 cursor-pointer"
        >
          About Us
        </Scroll>
      </li>
      <li>
        <NavLink
          className="hover:opacity-80 cursor-pointer"
          to={"/Requirements-Forum"}
        >
          Become a Teacher
        </NavLink>
      </li>
      <li>
        {user ? (
          <span
            onClick={() => {
              logOut().then(() => navigate("/"));
            }}
            className="cursor-pointer"
          >
            Log Out
          </span>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </li>
    </>
  );
  return (
    <div className="bg-[#222831] z-50">
      <div className="navbar max-w-screen-xl mx-auto text-white lg:flex-row flex-row-reverse justify-between">
        <div className="lg:navbar-start">
          <div className="dropdown dropdown-end lg:hidden">
            <div tabIndex={0} role="button" className="m-1">
              {!user ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              ) : user?.photoURL ? (
                <img
                  className="w-[40px] h-[40px] rounded-full"
                  src={user.photoURL}
                  alt=""
                />
              ) : (
                <CgProfile className="text-[40px]" />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 text-[#504B38] rounded-box w-52 p-2 shadow"
            >
              {mobileLinks}
            </ul>
          </div>
          <NavLink className="hidden lg:block" to={"/"}>
            <div className="flex items-center gap-2">
              <img
                className="w-[40px] h-[40px] rounded-full"
                src="https://i.ibb.co.com/gZ6LWPys/favicon.png"
                alt=""
              />
              <h1 className="text-2xl font-medium">Tuition Seba Forum</h1>
            </div>
          </NavLink>
        </div>
        <div className="lg:navbar-end">
          <div className="lg:hidden">
            <NavLink to={"/"}>
              <div className="flex items-center gap-2">
                <img
                  className="w-[40px] h-[40px] rounded-full"
                  src="https://i.ibb.co.com/gZ6LWPys/favicon.png"
                  alt=""
                />
                <h1 className="text-xl font-medium">Tuition Seba Forum</h1>
              </div>
            </NavLink>
          </div>
          <div className="hidden lg:flex">
            <ul className="menu-horizontal px-1 gap-4 xl:text-lg lg:text-sm font-[550] items-center">
              {Links}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
