import React from "react";
import Link from "next/link";

// components
const CardPageVisits = () => {
  return (
    <>
      <div className="relative ml-auto flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        <div className="rounded-t mb-0 px-4 py-2 border-0 ">
          <h3 className="font-semibold text-base text-blueGray-700">
            Quick Links
          </h3>
        </div>

        <div className="relative  h-full flex flex-wrap  items-baseline justify-around  min-w-0  rounded mb-6 xl:mb-0 ">

        <Link href="/transfer">
              <a
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                href="/transfer"
              >
                  <div className=" flex flex-col items-center justify-center">
            <div
              className={
                "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"
              }
            >
              <i className="fas fa-angle-double-right"></i>
            </div>
            <h5 className="mt-1 text-blueGray-400 uppercase font-bold text-xs">
              Transfer
            </h5>
          </div>
              </a>
            </Link>
          {/* <div className=" flex flex-col items-center justify-center">
            <div
              className={
                "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"
              }
            >
              <i className="fas fa-angle-double-right"></i>
            </div>
            <h5 className="mt-1 text-blueGray-400 uppercase font-bold text-xs">
              Transfer
            </h5>
          </div> */}

          <div className=" flex flex-col items-center justify-center">
            <div
              className={
                "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"
              }
            >
              <i className="fas fa-check"></i>
            </div>
            <h5 className=" mt-1 text-blueGray-400 uppercase font-bold text-xs text-center">
              Activate <br /> ATM
            </h5>
          </div>

          <div className=" flex flex-col items-center justify-center">
            <div
              className={
                "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"
              }
            >
              <i className="fab fa-cc-mastercard"></i>
            </div>
            <h5 className=" mt-1 text-blueGray-400 uppercase font-bold text-xs text-center">
              Atm <br /> Withdrawal
            </h5>
          </div>
{/* 
          <div className=" flex flex-col items-center justify-center">
            <div
              className={
                "text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500"
              }
            >
              <i className="fas fa-comment"></i>
            </div>
            <h5 className=" text-blueGray-400 uppercase font-bold text-xs text-center">
              Lodge <br /> Complaint
            </h5>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default CardPageVisits;
