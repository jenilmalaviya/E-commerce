import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ROLE } from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.userDetails);

  const naviget = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      naviget("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-200px)] md:flex hidden">
      <aside className="bg-white min-h-screen w-full max-w-60 customShedow ">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center ">
            {user?.profilepic ? (
              <img
                src={user?.profilepic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold"> {user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
        {/* ---- Navigaction ------  */}
        <div>
          <nav className="grid p-4 text-base m-1 ">
            <Link
              to={"all-users"}
              className="px-2 py-1 hover:bg-slate-100 rounded-full"
            >
              all user
            </Link>
            <Link
              to={"all-Products"}
              className="px-2 py-1 hover:bg-slate-100 rounded-full"
            >
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet />{" "}
      </main>
    </div>
  );
};

export default AdminPanel;
