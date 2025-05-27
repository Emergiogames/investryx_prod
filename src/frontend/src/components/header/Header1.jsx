import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { logout } from "../../utils/context/reducers/authSlice";
import {  toast } from 'react-toastify';
import { BASE_URL } from "../../constants/baseUrls";
import { leftPlan } from "../../services/user/apiMethods";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const selectedUser = (state) => state.auth.user || "";
  const user = useSelector(selectedUser);
  console.log("userdata from header ::", user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("persist:root");
    toast.info("Logout successful");
    navigate("/login");
  };

  const navigation = [
    {
      name: "Business for Sale",
      href: "/Business",
      current: location.pathname === "/Business",
    },
    {
      name: "Franchises",
      href: "/Franchise",
      current: location.pathname === "/Franchise",
    },
    {
      name: "Investment Opportunities",
      href: "/Investment",
      current: location.pathname === "/Investment",
    },
    {
      name: "Advisors",
      href: "/Advisors",
      current: location.pathname === "/Advisors",
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const userDat = user
    ? {
        name: user.first_name,
        email: user.email,
        image: user.image ? BASE_URL + user.image : "",
      }
    : {};

  //handle Add Post check
  const handleAddPost = () => {
    leftPlan()
      .then((response) => {
        console.log("plans left check for Add-post ::", response);
        if (response.data.status === true) {
          navigate("/add-post");
        } else {
          toast.error("Your Subscription is Over, Please subscribe to proceed");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleProfile1=() => {
    navigate("/Profile1")
  }

  return (
    <div>
      <div className="min-h-full">
        <Disclosure
          as="nav"
          className="fixed top-0 left-0 right-0 z-50 bg-gray-900"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to={"/"}>
                    <img
                      alt="Your Company"
                      src="/images/white_emergio_inv.svg"
                      className="w-48 transition-transform hover:scale-105"
                    />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">

                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <Link to="/notification">
                      <span className="sr-only">View notifications</span>
                      <BellIcon aria-hidden="true" className="h-6 w-6" />
                    </Link>
                  </button>

                  {/* save post  */}
                  <button
                    type="button"
                    className="ml-2 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <Link to="/saved">
                      <span className="sr-only">View Saved Post</span>
                      <BookmarkIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-slate-400-600 "
                      />
                    </Link>
                  </button>

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt=""
                          src={
                            userDat.image ||
                            "https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"
                          }
                          // src={user_base}
                          // src="https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                      <div className="ml-3"></div>
                      {/* <div className="text-base font-medium leading-none text-white">{userDat.first_name}</div> */}
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                    >
                      <MenuItem key="1">
                        <Link
                          to="/user-profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                      </MenuItem>

                      <MenuItem key="3">
                        <div
                          // to="/add-post"
                          onClick = {handleAddPost}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Add Post
                        </div>
                      </MenuItem>
                      <MenuItem key="4">
                        <Link
                          to="/subscribe"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Get Premium
                        </Link>
                      </MenuItem>
                      <MenuItem key="5">
                        <a
                          onClick={handleLogout}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign Out
                        </a>
                      </MenuItem>
                      <MenuItem key="5">
                        <a
                          onClick={handleProfile1}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile 1
                        </a>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                  {userDat.name ? (
                    <div className="text-sm font-medium leading-none text-gray-400 ml-3">
                      Welcome, {userDat.name}
                    </div>
                  ) : null}
                </div>

              </div>
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon
                    aria-hidden="true"
                    className="block h-6 w-6 group-data-[open]:hidden"
                  />
                  <XMarkIcon
                    aria-hidden="true"
                    className="hidden h-6 w-6 group-data-[open]:block"
                  />
                </DisclosureButton>
              </div>
            </div>


          </div>

          <DisclosurePanel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  {/* <img alt="" src={userDat.imageUrl} className="h-10 w-10 rounded-full" /> */}
                </div>
                <div className="text-white">{userDat.email}</div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {userDat.first_name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {userDat.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                  <XMarkIcon />
                </button>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  );
}

export default Header;
