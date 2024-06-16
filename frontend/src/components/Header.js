import React, { useState } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
const Header = () => {
  const user = useSelector((state) => state?.user?.userDetails);
  const dispatch = useDispatch();
  const [menuDisplay, setmenuDisplay] = useState(false);

  const hendleLogout = async () => {
    const fetchData = await fetch(summaryApi.logout_user.url, {
      method: summaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            {" "}
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="search product hre.."
            className="w-full outline-none "
          ></input>

          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-7">
          <div className="relative  flex justify-center">
            <div
              className="text-3xl cursor-pointer relative flex justify-center "
              onClick={() => setmenuDisplay((preve) => !preve)}
            >
              {user?.profilepic ? (
                <img
                  src={user?.profilepic}
                  className="w-10 h-10 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                <nav>
                  <Link
                    to={"admin-panel"}
                    className="whitespace-nowrap hover:bg-slate-100 p-2"
                    onClick={() => setmenuDisplay((preve) => !preve)}
                  >
                    Admin Penal
                  </Link>
                </nav>
              </div>
            )}
          </div>

          <div className="text-2xl  relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 text-white w-5  h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-4">
              <p className="text-xl ">0</p>
            </div>
          </div>
          <div>
            {user?._id ? (
              <button
                onClick={hendleLogout}
                className="px-5 py-1  rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-5 py-1  rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
