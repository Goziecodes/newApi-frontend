import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useLoading, BallTriangle } from "@agney/react-loading";
import TransactionsTable from "components/Cards/TransactionsTable.js";
import UsersTable from "components/Cards/UsersTable.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Dashboard() {
  // const { data: users, isLoading: isLoadingUsers } = useQuery(
  //   "adminGetusers",
  //   async () => {
  //     const { data } = await axios.get(`http://localhost:2000/admin/users`);
  //     return data;
  //   }
  // );

  const { containerProps, indicatorEl } = useLoading({
    indicator: <BallTriangle width="50" color="white" />,
    loading: true,
    loaderProps: {
      // Any props here would be spread on to the indicator element.
      style: { margin: "0 auto" },
      // style: { margin: "3rem auto" },
    },
  });

  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4 justify-center">
        <div id="transactions" className="w-full  mb-12 xl:mb-0 px-4">
          <TransactionsTable />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div id="users" className="w-full  px-4">
          <UsersTable />
        </div>
      </div>
    </>
  );
}

// Dashboard.layout = Admin;
