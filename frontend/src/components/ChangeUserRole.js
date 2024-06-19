import React, { useState } from "react";
import { ROLE } from "../common/role";
import { IoMdClose } from "react-icons/io";
import summaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, onClose, userId, callFun }) => {
  console.log("first", ROLE);
  const [userRolr, setuserRolr] = useState(role);

  const hendleOnChange = (e) => {
    setuserRolr(e.target.value);
    console.log(e.target.value);
  };
  const updateUserRole = async () => {
    const fetchRespons = await fetch(summaryApi.updateUser.url, {
      method: summaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRolr,
      }),
    });
    const responseData = await fetchRespons.json();
    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFun();
    }
    console.log("responseData - role update", responseData);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-80 ">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm rounded-lg">
        <button className="block ml-auto" onClick={() => onClose()}>
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p className="">Name: {name}</p>
        <p className="">Email: {email}</p>
        <div className="flex items-center justify-between my-4 ">
          <p>Role :</p>
          <select
            className="border px-4 py-2 rounded-md"
            value={userRolr}
            onChange={hendleOnChange}
          >
            {Object.values(ROLE).map((role) => (
              <option value={role} key={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center mt-4">
          <button
            class=" relative bg-slate-200 py-2 px-8 text-black text-base font-bold nded-full overflow-hidden  rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-red-500 before:to-red-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
            onClick={(e) => {
              e.preventDefault();
              updateUserRole();
            }}
          >
            Change Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
