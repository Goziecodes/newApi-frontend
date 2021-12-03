import React from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import UserSidebar from "components/Sidebar/UserSidebar.js";
import AdminSidebar from "components/Sidebar/AdminSidebar.js";

import FooterAdmin from "components/Footers/FooterAdmin.js";
import useUser from "lib/useUser";

// md:ml-64
export default function GeneralLayout({ children }) {

  const { user } = useUser({ redirectTo: "/auth/login" });
  const Sidebar = user?.role === "user" ? UserSidebar : AdminSidebar;

  return (
    <>
      <Sidebar />
      <div className=" md:ml-64 bg-blueGray-700">
        {/* <AdminNavbar /> */}
        {/* Header */}
        {/* <div className="px-4 md:px-10 mx-auto w-full -m-24"> */}
        <div className=" mx-auto h-screen overflow-x-auto w-full ">
          {children}
        </div>
      </div>
          <FooterAdmin />
          {/* <FooterAdmin /> */}
      {/* </div> */}
    </>
  );
}
