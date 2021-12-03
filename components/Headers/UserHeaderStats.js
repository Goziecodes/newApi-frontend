import React from "react";
import { useQuery } from "react-query";


// components

import FullCardStats from "components/Cards/FullCardStats.js";
import CardStats from "components/Cards/CardStats.js";
import useUser from "lib/useUser";
import axios from "axios";
// import { useLoading, BallTriangle } from "@agney/react-loading";


export default function HeaderStats() {
  // const { user } = useUser({ redirectTo: 'auth/login' });
  const { data: user } = useQuery("getUserr", async () => {
    // const { data } = await axios.get(`http://localhost:2000/user/user`);
    const { data } = await axios.get(`https://fathomless-mountain-03627.herokuapp.com/user/user`);
    return data;
  });
  // const currencySymbol = user.currency === 'euro' ? '&#128;' : user.currency === 'pounds' ? '&#163' : user.currency === 'dollar' ? '&#36' : '&#8358;'
  const currencySymbol = '&#128;' 
  // const { containerProps, indicatorEl } = useLoading({
  //   indicator: <BallTriangle width="50" color='grey' />,
  //   loading: true,
  //   loaderProps: {
  //     // Any props here would be spread on to the indicator element.
  //     // style: {{ margin: '0 auto' }}
  //     style: { margin: '20rem auto' }
  //   },
  // });

  // if (!user) {
  //   return <section {...containerProps}>
  //      {indicatorEl} {/* renders only while loading */}
  //    </section>
  //  }

  return (
    <>
      {/* Header */}
      <div className="bg-blueGray-800 md:pt-16 pb-32 pt-12">
        <div className="px-4 md:px-10 w-full mx-auto  ">
        <div className="px-4 md:px-10 mx-auto w-full">
          {/* <div> */}
            {/* Card stats */}
            <div className="w-auto flex justify-center lg:px-8 mb-8 ">
                <FullCardStats 
                  statSubtitle="Account Type"
                  statTitle="Investment Account"
                  accountNumber={user?.accountNumber}
                  // accountNumber='please check your mail inbox and verify your email to generate Account Number'
                  // accountNumber={user.verified ? user?.accountNumber : 'please check your mail inbox and verify your email to generate Account Number'}
                  statArrow="down"
                  statPercentColor="text-red-500"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>

            <div className="md:flex flex-wrap justify-center ">   


              <div className="w-auto px-2">
                <CardStats
                  statSubtitle="Available Balance"
                  statTitle={user?.accountBalance}
                  currency = {user?.currency}
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-hand-holding-usd"
                  statIconColor="bg-red-500"
                />
              </div>
           
              {/* <div className="w-full lg:w-6/12 xl:w-3/12 px-4"> */}
              <div className="w-auto px-2">
                <CardStats
                  statSubtitle="ATM"
                  statTitle="Inactive"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>


              <div className="w-auto px-2">
                <CardStats
                  statSubtitle="Account Status"
                  active={user?.active ? "ACTIVE" : 'INACTIVE'}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
