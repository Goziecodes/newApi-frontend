import React,{useEffect, useState} from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

import fetchJson from '../../../lib/fetchJson'
// import useUser from '../../lib/useUser'
// layout for page

import Auth from "layouts/Auth.js";
import axios from "axios";

export default function VerifyEmail() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [verifyDetails, setVerifyDetails] = useState({
    email: '',
    token: ''
  })
  const { email } = router.query;
  // console.log(router.query, 'queriees here');

  const [errorMsg, setErrorMsg] = useState('');
  const { register, errors, handleSubmit } = useForm();

  const mutation = useMutation(async values => {
    return await axios.post(
        // `http://localhost:2000/user/verify/`,
        `${process.env.NEXT_PUBLIC_SERVER_BASEURL}/user/verify`,
        values
        )
        .catch(err => {
          console.log(err.response.data, 'error')
          // throw err.response;
          Object.keys(err.response.data).forEach(errors =>{  
            if(errors !== 'name') {
              toast.error(err.response.data[errors], {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
            }      
          })
          throw new Error(err)
        })
  }, {
    // throwOnError: true,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries('useUser');
      toast.success('token verification successful', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      router.push('/dashboard');
    },
  })

  // const handleChange = (e) => {
  //   const name = e.target.attributes.name.nodeValue;
  //   setVerifyDetails((verifyDetails) => ({...verifyDetails, [name] : e.target.value}));
  // }
  
  async function verify(values) {
    // e.preventDefault();
    console.log(values, 'values')
    await mutation.mutate(values);
  
  }

  // useEffect(() => {
  // setVerifyDetails(() => router.query)
  // }, [router.query])

  return (
    <>
  <ToastContainer />
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
         
              <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
                <div className="text-blueGray-400 text-center mb-3 font-bold mt-3">
                  <small>Enter token to Verify Email</small>
                </div>
                <Form onSubmit={handleSubmit(verify)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Input
                    // onChange={handleChange}
                    // value={verifyDetails.email}
                    id="email"
                      type="email"
                      disabled
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder={email}
                      {...register("email", { required: true, value: `${email}` })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="token"
                    >
                      Token
                    </label>
                    <Input
                    // value={verifyDetails.token}
                      // onChange={handleChange}
                      type="text"
                      // name='token'
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Token"
                      {...register("token", { required: true,  })}
                    />
                  </div>
             

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                       {
                        mutation.isLoading ? <Spinner /> : 'Verify Email'
                      }
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

VerifyEmail.layout = Auth;
