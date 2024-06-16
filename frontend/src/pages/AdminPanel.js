import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.userDetails);
  return (
    <div className="min-h-[calc(100vh-200px)] flex">
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
          <nav>
            <Link to={"all-users"}>all user</Link>
            <Link to={"uplode-Product"}>uplode-Product</Link>
          </nav>
        </div>
      </aside>
      <main>Lodu taru kam kar ne </main>
    </div>
  );
};

export default AdminPanel;
