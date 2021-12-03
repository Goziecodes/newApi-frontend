import React from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";

// layout for page

// import User from "layouts/User.js";
import UserLayout from "../../layouts/UserLayout";


export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap md:pt-32 pb-32 pt-12">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}

Settings.layout = UserLayout;
