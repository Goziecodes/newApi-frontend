import React,{useState} from "react";
import Link from "next/link";
import { useMutation, useQuery } from "react-query";
import { useSelector, useDispatch } from 'react-redux';
import {loginUser, updateUser} from '../../redux/slices/usersSlice';
import {
  Col,
  Label,
  Row,
  Card,
  CardBody,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // FormGroup,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  Spinner,
  CardTitle,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'

import fetchJson from '../../lib/fetchJson'
import useUser from '../../lib/useUser'
// layout for page

import Auth from "layouts/Auth.js";
import axios from "axios";

export default function Login() {
  const router = useRouter()
  const dispatch = useDispatch()

  const [errorMsg, setErrorMsg] = useState('');
  const { register, errors, handleSubmit } = useForm();

  // const { mutateUser } = useUser({
  //   redirectTo: '/',
  //   redirectIfFound: true,
  // })

  // const loginUser = async (loginDetails) => {
  //   console.log('response', 'i got u')
  //   // return await axios.post(
  //   //   `http://localhost:3000/login`,
  //   //   loginDetails
  //   // );


  //   const response = await axios.post(
  //   `http://:3000/logins`,
  //   loginDetails
  //   ).catch(err => {
  //     // console.log(err.response, 'cuaght')
  //     throw err.response;
  //     // throw new Error(err.response)
  //   });
  //   console.log(response, 'i got u')
  //   return response;
  // };

  // const mutation = useMutation(loginUser, {
  //   throwOnError: true,
  //   onSuccess: async (data) => {
  //     console.log(data, "ikwe")
  //   // router.push("/expenses");
  //   },
  //   onError: async (error, variables, context) => {
  //     console.log(`rolling back optimistic update with id ${context.id}`);
  //     console.log(` ${error} is the error`);
  //   },
  // });
  const mutation = useMutation(async loginDetails => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASEURL}/user/login`,
        loginDetails
        )
        .catch(err => {
          // console.log(err.response, 'cuaght')
          // throw err.response;
          throw new Error(err.response)
        })
  }, {
    throwOnError: true,
    onSuccess: async (data) => {
      // console.log(data, "ikwe");
      const userDetails = {
        token: data.data.token,
        ...data.data.userInfo
      }
      axios.defaults.headers.common.Authorization = userDetails.token;
      //   delete axios.defaults.headers.common.Authentication;
      dispatch(loginUser(userDetails));
      router.push('/dashboard');
    // router.push("/expenses");
    },
    onError: async (error, variables, context) => {
      // console.log(`rolling back optimistic update with id ${context.id}`);
      // console.log(` ${error} is the error`);
    }
  })
  
  async function login(values) {
    // console.log(values, 'val')
    const loginDetails = {
      username: values.email,
      password: values.password
    }
    // console.log(loginDetails, 'loginDetails');
      await mutation.mutate(loginDetails);
   
    // try {
    //     const response = await axios({
    //       method: 'POST',
    //       url: 'http://localhost:3000/login',
    //       data: loginDetails,
    //     });

    //     console.log(response, 'response')
    //     // mutateUser();      
    // } catch (error) {
    //   console.error('An unexpected error happened:', error)
    //   // setErrorMsg(error.data.message)
    // }
    // try {
    //   mutateUser(
    //     await fetchJson({
    //       url: '/api/login',
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: loginDetails,
    //       // body: values
    //     })
    //   )
    // } catch (error) {
    //   console.error('An unexpected error happened:', error)
    //   // setErrorMsg(error.data.message)
    // }
  }

  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery("updateUser", async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASEURL}/user`);
    // const { data } = await axios.get(`https://fathomless-mountain-03627.herokuapp.com/user`);
    return data;
  }, {
    onSuccess: async (data) => {
      console.log(data, 'data me na')
      const userDetails = {
        token: data.token,
        ...data.userInfo
      }

      axios.defaults.headers.common.Authorization = userDetails.token;
      console.log('got here ooooo');
      dispatch(updateUser(userDetails));

    },
    staleTime : 1000
  });

  console.log(user, 'eror')
  // console.log(mutation.data, 'data')
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign in
                  </h6>
                </div>
                {/* <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                </div> */}
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign in with credentials</small>
                </div> */}
                <Form onSubmit={handleSubmit(login)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Input
                    id="email"
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      {...register("email", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <Input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      {
                        mutation.isLoading ? <Spinner /> : 'Sign In'
                      }
                    </button>
                  </div>
                </Form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
              <Link href="/dashboard">
                  <a
                    href="/dashboardhhhhhh"
                    className={
                      "text-white lg:hover:text-blueGray-200    lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                  >
                    Dashboard
                  </a>
                </Link>
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/auth/register">
                  <a href="#pablo" className="text-blueGray-200">
                    <small>Create new account</small>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;
