import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { Link, NavLink, Outlet } from "react-router-dom";
import useUser from "../Hook/useUser";
import { IoMdNotifications } from "react-icons/io";

const DashboardPageRoot = () => {
  const [data] = useUser();

  return (
    <div>
      <div className="lg:hidden mt-[30px] flex items-center">
        <div className="drawer lg:hidden w-5">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className=" flex flex-col items-center justify-center">
            <label htmlFor="my-drawer-2" className="lg:hidden">
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
            </label>
          </div>
          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="bg-white text-base-content min-h-full w-80 p-4 pl-2 pt-10">
              <li className="flex justify-center mt-3">
                <Link to={"/"} className="text-xl font-bold">
                  <span className="mr-2">Tuition</span>
                  <span>Sheba</span>
                </Link>
              </li>
              <div>
                <h5 className="text-sm ml-2 mt-6">main menu</h5>
              </div>
              <li className="flex justify-center">
                <NavLink
                  className={({ isActive }) =>
                    `flex item-center items-center gap-2 px-4 py-3 rounded-xl w-[250px] ${
                      isActive ? "bg-[#d4d4d4]" : "hover:bg-[#EEEEEE]"
                    }`
                  }
                  to={"/dashboard/user-profile"}
                >
                  <ImProfile className="-mt-[2px] text-xl" />
                  <span className="font-semibold">Profile</span>
                </NavLink>
              </li>
              <li className="flex justify-center">
                <NavLink
                  className={({ isActive }) =>
                    `flex item-center items-center gap-2 px-4 py-3 rounded-xl w-[250px] ${
                      isActive ? "bg-[#d4d4d4]" : "hover:bg-[#EEEEEE]"
                    }`
                  }
                  to={"/dashboard/user-profile"}
                >
                  <IoMdNotifications className="-mt-[2px] text-xl" />
                  <span className="font-semibold">Notifications</span>
                </NavLink>
              </li>
              {data?.userRoll === "admin" && (
                <li className="flex justify-center">
                  <NavLink
                    className={({ isActive }) =>
                      `flex item-center items-center gap-2 px-4 py-3 rounded-xl w-[250px] ${
                        isActive ? "bg-[#d4d4d4]" : "hover:bg-[#EEEEEE]"
                      }`
                    }
                    to={"/dashboard/Teachers-Submission"}
                  >
                    <FaWpforms className="-mt-[2px] -ml-1 text-2xl" />
                    <span className="font-semibold">Teachers Submission</span>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
        <Link to={"/"} className="text-2xl font-bold ml-6 lg:-mt-6">
          <span className="mr-2">Tuition</span>
          <span>Sheba</span>
        </Link>
      </div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="bg-[#F9F9F9] text-base-content min-h-full w-[300px] pt-4 space-y-3">
            <li className="flex justify-center mt-3">
              <Link to={"/"} className="text-xl font-bold">
                <span className="mr-2">Tuition</span>
                <span>Sheba</span>
              </Link>
            </li>
            <div>
              <h5 className="text-sm ml-6 mt-6">main menu</h5>
            </div>
            <li className="flex justify-center">
              <NavLink
                className={({ isActive }) =>
                  `flex item-center items-center gap-2 px-4 py-3 rounded-xl w-[250px] ${
                    isActive ? "bg-[#d4d4d4]" : "hover:bg-[#EEEEEE]"
                  }`
                }
                to={"/dashboard/user-profile"}
              >
                <ImProfile className="-mt-[2px] text-xl" />
                <span className="font-semibold">Profile</span>
              </NavLink>
            </li>
            <li className="flex justify-center">
              <NavLink
                className={({ isActive }) =>
                  `flex item-center items-center gap-2 px-4 py-3 rounded-xl w-[250px] ${
                    isActive ? "bg-[#d4d4d4]" : "hover:bg-[#EEEEEE]"
                  }`
                }
                to={"/dashboard/notifications"}
              >
                <IoMdNotifications className="-mt-[2px] text-xl" />
                <span className="font-semibold">Notifications</span>
              </NavLink>
            </li>
            {data?.userRoll === "admin" && (
              <li className="flex justify-center">
                <NavLink
                  className={({ isActive }) =>
                    `flex item-center items-center gap-2 px-4 py-3 rounded-xl w-[250px] ${
                      isActive ? "bg-[#d4d4d4]" : "hover:bg-[#EEEEEE]"
                    }`
                  }
                  to={"/dashboard/Teachers-Submission"}
                >
                  <FaWpforms className="-mt-[2px] -ml-1 text-2xl" />
                  <span className="font-semibold">Teachers Submission</span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPageRoot;
