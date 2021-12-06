import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import Quicklinks from "components/Cards/Quicklinks.jsx";
import UserHeaderStats from "components/Headers/UserHeaderStats.js";

// layout for page

import UserLayout from "../../layouts/UserLayout";
import AdminLayout from "../../layouts/Admin";
import AuthLay from "../../layouts/Auth";
import GeneralLayout from "../../layouts/GeneralLayout";
import UserTransactionsTable from "components/Cards/UserTransactionsTable";
import axios from "axios";
import { useQuery } from "react-query";
import { useLoading, BallTriangle } from "@agney/react-loading";

export default function Dashboard() {
  const { data: transactions, isLoading } = useQuery("transactions", async () => {
    // const { data } = await axios.get(`http://localhost:2000/user/transactions`);
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASEURL}/user/transactions`);
    return data;
  });

  const { containerProps, indicatorEl } = useLoading({
    indicator: <BallTriangle width="50" color="white" />,
    loading: true,
    loaderProps: {
      // Any props here would be spread on to the indicator element.
      // style: {{ margin: '0 auto' }}
      style: { margin: "3rem auto" },
    },
  });

  return (
    <>
      <UserHeaderStats />
      <div className="px-4 md:px-10 -mt-20 pb-10">
        <div className="flex flex-wrap mt-4">
          <div className="w-full lg:px-8  mb-12 xl:mb-0">
            <Quicklinks />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full  mb-12 px-4">
          {isLoading ? (
            <section {...containerProps}>
              {indicatorEl} {/* renders only while loading */}
            </section>
          ) : (
            <UserTransactionsTable transactions={transactions || []} />
          )}
        </div>
      </div>
    </>
  );
}

Dashboard.layout = GeneralLayout;
