import React from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminSidebar from "components/Sidebar/AdminSidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import FooterAdmin2 from "components/Footers/FooterSmall.js";
import FooterAdmin3 from "components/Footers/Footer.js";

export default function Admin({ children }) {
  return (
    <>
      <AdminSidebar />
      <div className="relative md:ml-64 bg-blueGray-800">
        {/* <AdminNavbar /> */}
        {/* Header */}
        <HeaderStats/>
        <div className="px-4 md:px-10 mx-auto w-full">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
