import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "redux/slices/usersSlice";
import { useRouter } from "next/router";
// import UserDropdown from "components/Dropdowns/UserDropdown.js";
import Link from "next/link";
import useUser from "../../lib/useUser";


export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, user } = useUser();
  console.log({ user, isLoggedIn }, "jouser");
  const dispatch = useDispatch();
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const redirect = (location) => {
    router.push(location);
  };
  return (
    <>
     {/* <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blueGray-400"> */}
     {/* <nav className=" w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blueGray-800"> */}
     <nav className=" w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blueGray-800">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a
                className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                href="/"
              >
                Sajjal
              </a>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center  lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded " : " hidden")
            }
            id="example-navbar-warning"
          >
            {/* <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus?ref=nnjs-auth-navbar"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />{" "}
                  Docs
                </a>
              </li>
            </ul> */}
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto pt-8 lg:pt-0 mt-3">
              
              {isLoggedIn ? (
                <>

                <li className="flex items-center mr-4 ">
                <Link href="/dashboard">
                  <a
                    href="/dashboard"
                    className={
                      "text-white lg:hover:text-blueGray-200    lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                  >
                    Dashboard
                  </a>
                </Link>
                {/* <PagesDropdown /> */}
              </li>
                
                <li className="flex items-center mr-4">
                  <Link
                    href="/profile"
                  >
                    <a
                      href="/profile"
                      className={"text-white lg:hover:text-blueGray-200 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"}
                    >
                      Profile
                    </a>
                  </Link>
                </li>
                
                <li className="flex items-center">
                    <Link
                      href="#"
                    >
                      <a
                        href="/#"
                        onClick={() => dispatch(logout(redirect))}
                        className={"text-white lg:hover:text-blueGray-200 lg:py-2 flex items-center text-xs uppercase font-bold"}
                      >
                        Log Out
                      </a>
                    </Link>
                  </li>
                  </>
              ) : (
                <li className="flex items-center">
                  <Link
                    className={
                      " lg:hover:text-blueGray-900 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                    href="/auth/login"
                  >
                    <a
                      href="/auth/login"
                      className={
                        "text-white lg:hover:text-blueGray-200 lg:py-2 flex items-center text-xs uppercase font-bold"
                      }
                    >
                      Login / Sign up
                    </a>
                  </Link>
                </li>
              )}

              {/* <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-nextjs%2F"
                  target="_blank" rel="noreferrer"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-facebook text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Share</span>
                </a>
              </li> */}

              {/* {isLoggedIn ? (
                <Link
                  className={
                    " lg:hover:text-blueGray-900 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  href="#"
                >
                  <li className="flex items-center">
                    <button
                      onClick={() => dispatch(logout(redirect))}
                      className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Log Out
                    </button>
                  </li>
                </Link>
              ) : (
                <Link
                  href="auth/login"
                  className={
                    " lg:hover:text-blueGray-900 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                >
                  <li className="flex items-center">
                    <button
                      className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Login / Sign up
                    </button>
                  </li>
                </Link>
              )} */}


              {/* <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button"
                >
                  <Link href="auth/login">
                  <a
                    href="/dashboard"
                    className={
                      " lg:hover:text-blueGray-900 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                  >
                    Login/signup
                  </a>
                </Link>
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
