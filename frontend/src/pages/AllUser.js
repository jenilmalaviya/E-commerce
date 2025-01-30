import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";
const AllUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setopenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    password: "",
    ConfirmPassword: "",
    name: "",
    role: "",
    _id: "",
  });

  const fatchAllUser = async () => {
    const fatecData = await fetch(summaryApi.allUser.url, {
      method: summaryApi.allUser.method,
      credentials: "include",
    });

    const dataResponse = await fatecData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };
  useEffect(() => {
    fatchAllUser();
  }, []);

  return (


    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-red-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Sr.
            </th>
            <th scope="col" class="px-6 py-3" >Name</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Role</th>
            <th scope="col" class="px-6 py-3">Created Date</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.length > 0 ? (
            allUsers.map((el, index) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                {/* <tr key={index}> */}
                <td class="px-6 py-2.5">{index + 1}</td>
                <td scope="row" class="px-6 py-2.5 font-medium text-gray-900 whitespace-nowrap dark:text-white">{el?.name}</td>
                <td class="px-6 py-2.5">{el?.email}</td>
                <td class="px-6 py-2.5">{el?.role}</td>
                <td class="px-6 py-2.5">{moment(el?.createdAt).format("ll")}</td>
                <td class="px-8 py-2.5 text-left">
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:underline hover:bg-black hover:text-white "
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setopenUpdateRole(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                  {/* <button href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => {
                      setUpdateUserDetails(el);
                      setopenUpdateRole(true);
                    }}>Edit</button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setopenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFun={fatchAllUser}
        />
      )}
    </div>
  );
};

export default AllUser;
