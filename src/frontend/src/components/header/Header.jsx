import { useRef, useState, useEffect } from "react";
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Button,
} from "@headlessui/react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { ImProfile } from "react-icons/im";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout, userProfile } from "../../utils/context/reducers/authSlice";
import { toast } from "react-toastify";
import DropNotification from "../../pages/notification/DropNotification";
import Search from "../search/Search";

const products = [
    {
        name: "Sell your business",
        profile: "business",
        description: " Find a Investor",
        href: "/investment",
        icon: ChartPieIcon,
    },
    {
        name: "Add Investment Offer",
        profile: "investor",
        description: " Buy a Business",
        href: "/business",
        icon: CursorArrowRaysIcon,
    },
    {
        name: "Franchise your Brand",
        profile: "franchise",
        description: " Find Franchise Options",
        href: "/franchise",
        icon: FingerPrintIcon,
    },
    {
        name: "Add Advisor Profile",
        profile: "advisor",
        description: " Find Advisor",
        href: "/advisor",
        icon: SquaresPlusIcon,
    },
];

const howToData = [
    {
        name: " Sell Your Business",
        href: "/howtosell-business",
        icon: ChartPieIcon,
    },
    {
        name: "Find Investors",
        href: "/howtofind-investor",
        icon: CursorArrowRaysIcon,
    },
    {
        name: "Franchise Your Business",
        href: "/howto-franchise",
        icon: FingerPrintIcon,
    },
    {
        name: "Buy a Business",
        href: "/howtobuy-business",
        icon: SquaresPlusIcon,
    },
    {
        name: "Invest In a Business",
        href: "/howto-invest",
        icon: ChartPieIcon,
    },
    {
        name: "Register As a Advisor",
        href: "/howto-advisor",
        icon: CursorArrowRaysIcon,
    },
    {
        name: "Value a Business",
        href: "/howto-value",
        icon: FingerPrintIcon,
    },
];

export default function Header() {
        const BASE_URL = import.meta.env.VITE_BASE_URL;

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const selectedUser = (state) => state.auth.user || "";
    const user = useSelector(selectedUser);
    console.log("userdata from header ::", user);

    const userDat = user
        ? {
              name: user.first_name || "Guest",
              email: user.email,
              image: user.image ? BASE_URL + user.image : "",
          }
        : {};

    const myToken = (state) => state.auth.token || "";
    const token = useSelector(myToken);

    const handleLogout = () => {
        dispatch(logout());
        toast.info("Logout successful");
        navigate("/");
    };

    // Search Setup
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchContainerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };
    }, []);

    //Navigate + ChangeProfile
    const NavigateExplore = (location, profileName) => {
        console.log("current profile @Header:::", profileName);
        // Dispatch the action with the correct object structure
        dispatch(userProfile({ profile: profileName }));
        navigate(location);
    };

    return (
        <header className="bg-slate-900">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="">
                    <div href="#" className="-m-1.5 p-1.5">
                        <div className="flex-shrink-0">
                            <Link to={"/"}>
                                <img
                                    alt="Your Company"
                                    src="/images/white_emergio_inv.svg"
                                    className="w-48 transition-transform hover:scale-105"
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Nav bar for services/howto/etc */}
                <nav className="bg-slate-900 relative">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                                {/* Home */}
                                {/* Services Dropdown */}
                                <Popover className="relative">
                                    <PopoverButton className="flex items-center gap-x-1 text-md/6 font-bold text-white hover:text-gray-300 transition">
                                        SERVICES
                                        <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                                    </PopoverButton>

                                    <PopoverPanel
                                        transition
                                        className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-slate-700 shadow-lg ring-1 ring-gray-200/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        {({ close }) =>
                                            Array.isArray(products) && products.length > 0 ? (
                                                products.map((item) => (
                                                    <div
                                                        key={item?.name}
                                                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-500"
                                                    >
                                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-500 group-hover:bg-white">
                                                            {item?.icon && (
                                                                <item.icon
                                                                    aria-hidden="true"
                                                                    className="h-6 w-6 text-gray-200 group-hover:text-yellow-400"
                                                                />
                                                            )}
                                                        </div>
                                                        <div className="flex-auto">
                                                            <a
                                                                onClick={() => {
                                                                    NavigateExplore(item?.href, item?.profile);
                                                                    close(); // Close the popover after navigation
                                                                }}
                                                                className="block font-semibold text-gray-100 cursor-pointer"
                                                            >
                                                                {item?.name}
                                                                <span className="absolute inset-0" />
                                                            </a>
                                                            <p className="mt-1 text-gray-400">{item?.description}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-gray-400">No products available</p>
                                            )
                                        }
                                    </PopoverPanel>
                                </Popover>

                                {/* How To Dropdown */}
                                <Popover className="relative">
                                    <PopoverButton className="flex items-center gap-x-1 text-md/6 font-bold text-white hover:text-gray-300 transition">
                                        HOW TO?
                                        <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                                    </PopoverButton>

                                    <PopoverPanel
                                        transition
                                        className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-slate-700 shadow-lg ring-1 ring-gray-200/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                                    >
                                        <div className="p-4">
                                            {howToData.map((dataz) => (
                                                <div
                                                    key={dataz?.name}
                                                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-500"
                                                >
                                                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-500 group-hover:bg-white">
                                                        <dataz.icon
                                                            aria-hidden="true"
                                                            className="h-6 w-6 text-gray-200 group-hover:text-yellow-400"
                                                        />
                                                    </div>
                                                    <div className="flex-auto">
                                                        <a href={dataz?.href} className="block font-semibold text-gray-100">
                                                            {dataz?.name}
                                                            <span className="absolute inset-0" />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </PopoverPanel>
                                </Popover>

                                {/* Q&A */}
                                <a
                                    onClick={() => navigate("/q&a")}
                                    className="text-md/6 font-bold text-white hover:text-gray-300 transition cursor-pointer"
                                >
                                    Q&A
                                </a>

                                {/* Company */}
                                <a
                                    onClick={() => navigate("/about-us")}
                                    className="text-md/6 font-bold text-white hover:text-gray-300 transition cursor-pointer"
                                >
                                    COMPANY
                                </a>
                            </PopoverGroup>
                        </div>
                    </div>

                    {/* Full Screen Search Overlay */}
                    {isSearchOpen && <Search setIsSearchOpen={setIsSearchOpen} />}
                </nav>

                {!user ? (
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-3">
                        <a href="/login" className="text-md/6 font-bold text-white">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                ) : null}
                <div className="ml-4 flex items-center md:ml-6">
                    {/* search */}
                    <button
                        ref={searchContainerRef}
                        onClick={() => setIsSearchOpen(true)}
                        type="button"
                        className=" ml-2 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        <Link>
                            <span className="sr-only">Search</span>
                            <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6 text-slate-400 hover:text-white " />
                        </Link>
                    </button>
                    {/* notificaion */}
                    {!user ? null : <DropNotification props={token} />}
                    {/* dropdown for mobile */}

                    {/* save post  */}
                    <button
                        type="button"
                        className=" ml-2 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                        <Link to="/saved">
                            <span className="sr-only">View Saved Post</span>
                            <BookmarkIcon aria-hidden="true" className="h-6 w-6 text-slate-400 hover:text-white" />
                        </Link>
                    </button>
                    <div className="flex pl-6 lg:hidden ">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Profile menu */}
                    <Menu as="div" className="relative ml-3 hidden lg:block">
                        {/* Profile Logo */}
                        <div>
                            <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Open user menu</span>
                                <img
                                    alt=""
                                    src={
                                        userDat.image ||
                                        "https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"
                                    }
                                    className="h-8 w-8 rounded-full"
                                />
                            </MenuButton>
                            <div className="ml-3"></div>
                        </div>
                        {/* Profile menu sub */}
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
                            <MenuItem key="3" className="text-center">
                                <Link to="/subscribe" className=" bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg  text-center  mx-4 block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Get Premium
                                </Link>
                            </MenuItem>

                            {!user ? (
                                <MenuItem key="4">
                                    <a
                                        onClick={() => navigate("/login")}
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Log In
                                    </a>
                                </MenuItem>
                            ) : (
                                <MenuItem key="4">
                                    <a
                                        onClick={handleLogout}
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Log Out
                                    </a>
                                </MenuItem>
                            )}
                        </MenuItems>
                    </Menu>
                    {userDat?.name ? (
                        <div className="text-sm font-medium leading-none text-gray-400 ml-3 hidden lg:block">
                            Welcome, {userDat?.name}
                        </div>
                    ) : null}
                </div>
            </nav>
            {/* Sidenavbar while mobile view */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-slate-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5">
                            <div className="flex-shrink-0">
                                <Link to={"/"}>
                                    <img
                                        alt="Your Company"
                                        src="/images/white_emergio_inv.svg"
                                        className="w-48 transition-transform hover:scale-105"
                                    />
                                </Link>
                            </div>
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-500"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>

                    {/* sidenavbar navigation for mobile view */}
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {/* start 1 */}
                                <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-100 hover:bg-gray-500">
                                        {!user ? (
                                            <div> General </div>
                                        ) : (
                                            <div className="flex">
                                                <div>
                                                    <img
                                                        alt=""
                                                        src={
                                                            userDat.image ||
                                                            "https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?w=740"
                                                        }
                                                        className="h-8 w-8 rounded-full mr-3"
                                                    />
                                                </div>
                                                <div>Hello, {userDat?.name}</div>
                                            </div>
                                        )}
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2"></DisclosurePanel>
                                </Disclosure>

                                <div
                                    onClick={() => navigate("/user-profile")}
                                    key="1"
                                    as="a"
                                    // href="#"
                                    className="block rounded-lg py-2 pr-3 text-sm/7 font-semibold text-gray-100 hover:bg-gray-500"
                                >
                                    <div className="flex gap-x-2 items-center">
                                        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-500 group-hover:bg-white">
                                            <ImProfile className="text-amber-300" size={22} />
                                        </div>

                                        <div className="">
                                            <div>Profile</div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    onClick={() => {
                                        navigate("/subscribe");
                                        setMobileMenuOpen(false);
                                    }}
                                    key="2"
                                    as="a"
                                    className=" block rounded-lg py-2  pr-3 text-sm/7 font-semibold text-gray-100 hover:bg-gray-500"
                                >
                                    <div className="flex gap-x-2 items-center">
                                        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-500 group-hover:bg-white">
                                            <MdOutlineWorkspacePremium className="text-amber-300" size={30} />
                                        </div>
                                        <div>Get Premiumzzz</div>
                                    </div>
                                </div>

                                {/* end 1 */}
                                <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-100 hover:bg-gray-500">
                                        Services
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                                        />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {[...products].map((item) => (
                                            <DisclosureButton
                                                onClick={() => NavigateExplore(item.href, item.profile)}
                                                key={item?.name}
                                                as="a"
                                                href={item.href}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-100 hover:bg-gray-500"
                                            >
                                                <div className="flex gap-x-2 items-center">
                                                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-500 group-hover:bg-white">
                                                        <item.icon
                                                            aria-hidden="true"
                                                            className="h-6 w-6 text-gray-200 group-hover:text-yellow-400"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div>{item?.name}</div>
                                                    </div>
                                                </div>
                                            </DisclosureButton>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>
                                <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-100 hover:bg-gray-500">
                                        How To?
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                                        />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {howToData.map((item) => (
                                            <DisclosureButton
                                                key={item?.name}
                                                as="a"
                                                onClick={() => navigate(item.href)}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-100 hover:bg-gray-500"
                                            >
                                                <div className="flex gap-x-2 items-center">
                                                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gray-500 group-hover:bg-white">
                                                        <item.icon
                                                            aria-hidden="true"
                                                            className="h-6 w-6 text-gray-200 group-hover:text-yellow-400"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div>{item?.name}</div>
                                                        {/* <div className="text-sm text-gray-500">{item.description}</div> */}
                                                    </div>
                                                </div>
                                            </DisclosureButton>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>
                                <a
                                    href="/q&a"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-100 hover:bg-gray-500"
                                >
                                    Q&A
                                </a>
                                <a
                                    onClick={() => navigate("/about-us")}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-100 hover:bg-gray-500"
                                >
                                    Company
                                </a>
                            </div>
                            {user ? (
                                <div className="py-6">
                                    <a
                                        onClick={handleLogout}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-bold text-gray-100 hover:bg-gray-500"
                                    >
                                        Log out
                                    </a>
                                </div>
                            ) : (
                                <div className="py-6">
                                    <a
                                        href="/login"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-bold text-gray-100 hover:bg-gray-500"
                                    >
                                        Log in
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
