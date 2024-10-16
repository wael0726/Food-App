import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../api";
import { setAllUserDetails } from "../context/actions/allUsersActions";
import { DataTable } from "../components";
import { avatar } from "../assets";

const DBUsers = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers || allUsers.length === 0) {
      getAllUsers().then((data) => {
        // Filtrer les doublons par 'uid'
        const uniqueUsers = Array.from(new Set(data.map(user => user.uid)))
          .map(uid => {
            return data.find(user => user.uid === uid);
          });

        // Dispatcher les utilisateurs uniques
        dispatch(setAllUserDetails(uniqueUsers));
      });
    }
  }, [allUsers, dispatch]);

  return (
    <div className='flex items-center justify-center w-full gap-4 pt-6'>
      <DataTable
        columns={[
          {
            title: "Image",
            field: "photoURL",
            render: (rowData) => (
              <img
                src={rowData.photoURL ? rowData.photoURL : avatar}
                className='w-32 h-16 object-contain rounded-md'
                alt="User Avatar"
              />
            ),
          },
          {
            title: "Name",
            field: "displayName",
          },
          {
            title: "Email",
            field: "email",
          },
          {
            title: "Verified",
            field: "emailVerified",
            render: (rowData) => (
              <p
                className={`px-2 py-1 w-32 text-center text-primary rounded-md ${
                  rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"
                }`}
              >
                {rowData.emailVerified ? "Verified" : "Not Verified"}
              </p>
            ),
          },
        ]}
        data={allUsers || []} 
        title={"List of Users"}
      />
    </div>
  );
};

export default DBUsers;
