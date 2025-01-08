import React, { useState } from "react";
import { Link, Links, NavLink, PrefetchPageLinks } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import avatarImg from "../assets/avatar.png";
import { useSelector, useStore } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "dashboard", href: "/dashboard" },
  { name: "order", href: "/orders" },
  { name: "card page", href: "/cart" },
  { name: "check out ", href: "/checkout" },
];

const Navbar = () => {
  const [isdropdownopen, setsisdropdownopen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, logout } = useAuth();
  const handlelogOut = () => {
    logout();
  };
  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        {/*left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3CenterLeft className="size-6" />
          </Link>
          {/* SEARCH INPUT  */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearchOutline className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search here  "
              className="w-full py-1 md:px-8 px-6 rounded-md
           focus:outline-none bg-gray-200"
            />
          </div>
        </div>
        {/* right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setsisdropdownopen(!isdropdownopen)}>
                  <img
                    src={avatarImg}
                    alt=""
                    className={`size-7 rounded-full ${
                      currentUser? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {isdropdownopen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setsisdropdownopen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 test-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handlelogOut}
                          className="block w-full text-left px-4 py-2 test-sm hover:bg-gray-100"
                         >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <CiUser className="size-6" />
              </Link>
            )}
          </div>
          <button className="hidden sm:block ">
            <IoMdHeartEmpty className="size-6" />
          </button>

          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center"
          >
            <CiShoppingCart className="" />
            {
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            }
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;