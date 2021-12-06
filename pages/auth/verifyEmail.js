import React,{useEffect, useState} from "react";
import { useRouter } from 'next/router'
import Link from "next/link";
import { useMutation, useQueryClient } from "react-query";
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

import fetchJson from '../../lib/fetchJson'
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
  // console.log(router.query, 'queriees here');

  const [errorMsg, setErrorMsg] = useState('');
  const { register, errors, handleSubmit } = useForm();

  const mutation = useMutation(async token => {
    return await axios.post(
        // `http://localhost:2000/user/verify/`,
        `${process.env.NEXT_PUBLIC_SERVER_BASEURL}/user/verify/`,
        token
        )
        .catch(err => {
          console.log(err.response, 'error')
          // throw err.response;
          // throw new Error(err.response)
        })
  }, {
    // throwOnError: true,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries('useUser');
      router.push('/dashboard');
    },
    onError: async (error, variables, context) => {
      // console.log(`rolling back optimistic update with id ${context.id}`);
      console.log(` ${error} is the error`);
    }
  })

  const handleChange = (e) => {
    const name = e.target.attributes.name.nodeValue;
    setVerifyDetails((verifyDetails) => ({...verifyDetails, [name] : e.target.value}));
  }
  
  async function verify(e) {
    e.preventDefault();
    await mutation.mutate(verifyDetails);
        // console.log(verifyDetails, 'values')
  
  }

  useEffect(() => {
  setVerifyDetails(() => router.query)
  }, [router.query])

  return (
    <>
 
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
         
              <div className="flex-auto px-4 lg:px-10 py-10 pt-2">
                <div className="text-blueGray-400 text-center mb-3 font-bold mt-3">
                  <small>Enter token to Verify Email</small>
                </div>
                <form onSubmit={verify}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Input
                    onChange={handleChange}
                    // value={verifyDetails.email}
                    id="email"
                      type="email"
                      name='email'
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      // {...register("email", { required: true, })}
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
                      onChange={handleChange}
                      type="text"
                      name='token'
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Token"
                      // {...register("token", { required: true,  })}
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

VerifyEmail.layout = Auth;
