import React from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import UserLayout from "layouts/UserLayout";
import Image from "next/image";

import axios from "axios";

export default function Profile() {
  const router = useRouter();

  const { data: user } = useQuery("userProfile", async () => {
    // const { data } = await axios.get(`http://localhost:2000/user/user`);
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASEURL}/user/user`);
    return data;
  });
  // console.log(user, "uuuu");
  // console.log(data, "dda");

  return (
    <>
      {/* <Navbar transparent /> */}
      <UserLayout>
        <main className="profile-page">
          <section className="relative block h-500-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-blueGray-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    {/* <div className="w-full h-30 lg:w-3/12 px-4 lg:order-2 flex justify-center bg-pink-500 rounded-full "> */}
                    {/* <div className="w-circle px-4 lg:order-2 flex justify-center bg-pink-500 rounded-full -m-16 -ml-20 lg:-ml-16"> */}
                    {/* <div className="w-circle px-4 lg:order-2 flex justify-center bg-pink-500 rounded-full -m-16"> */}
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        router.push(`/uploadDp`);
                      }}
                      className="w-circle  lg:order-2 flex justify-center bg-pink-500 rounded-full -m-16"
                      style={{
                        background : `url(http://localhost:2000/uploads/${user?.profilePic})center center / cover no-repeat`,
                        // backgroundRepeat: 'no-repeat',
                        // backgroundPosition: 'center',
                        // backgroundSize: 'cover'
                        }}
                    >
                      {/* <img
                        alt="..."
                        src={
                          user?.profilePic
                            ? `http://localhost:2000/uploads/${user?.profilePic}`
                            : ""
                        }
                        // src={
                        //   user?.profilePic
                        //     ? `http://localhost:2000/uploads/${user?.profilePic}`
                        //     : "/img/team-2-800x800.jpg"
                        // }
                        // src={"/img/team-2-800x800.jpg"}
                        // className="w-circle lg:order-2 flex justify-center bg-pink-500 rounded-full -m-16"
                        // className=""
                        // className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px w-full"
                        // className="w-circle shadow-xl rounded-full h-auto align-middle border-none absolute -m-16  lg:-ml--2  w-full"
                        className="w-full rounded-full"
                      /> */}
             
                    </div>
                    {/* </div> */}
                    <div className="w-full justify-center   lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                      <div className="flex justify-center py-6 px-3 mt-20 sm:mt-0 ">
                        {/* <div className="py-6 px-3 mt-32 sm:mt-0"> */}
                        <button
                          className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          {`${user?.firstName} ${user?.lastName}`}
                        </button>
                      </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4 lg:order-1">
                      <div className="flex justify-center ">
                        {/* <div className="flex justify-center py-4 lg:pt-4 pt-8"> */}
                        <div className="mr-4 p-3 text-center">
                          <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                            Account Number
                          </span>
                          <span className="text-sm text-blueGray-400">
                            {user?.verified
                              ? user.accountNumber
                              : "verify your email to generate your account Number"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      Account Balance
                    </span>
                    <span className="text-sm text-blueGray-400">
                      {user?.accountBalance}
                    </span>
                  </div>

                  <div className="text-center mt-8">
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
                      {user?.address}
                    </div>
                    {/* <div className="mb-2 text-blueGray-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                    Solution Manager - Creative Tim Officer
                  </div> */}
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                      Phone: {user?.phone}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                      Account Type: {user?.accountType}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                      Verified: {user?.verified ? "Verified" : "false"}
                    </div>
                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                      {user?.email}
                    </h3>
                  </div>
                  {/* <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                      <a
                        href="#pablo"
                        className="font-normal text-lightBlue-500"
                        onClick={(e) => e.preventDefault()}
                      >
                        Show more
                      </a>
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </UserLayout>
    </>
  );
}
// Profile.layout = UserLayout;
