import React from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import UserSidebar from "components/Sidebar/UserSidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// md:ml-64
export default function User({ children }) {
  return (
    <>
      {/* <UserSidebar /> */}
        <AdminNavbar />
      <div className="relative  bg-blueGray-800">
        {/* Header */}
        {/* <HeaderStats /> */}
        {/* <div className="px-4 md:px-10 mx-auto w-full -m-24"> */}
        <div className="mx-auto w-full ">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
