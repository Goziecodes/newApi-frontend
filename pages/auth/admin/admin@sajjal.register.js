import React, { useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
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

// layout for page
import Auth from "layouts/Auth.js";

export default function Register() {
  const router = useRouter();
  const { register, errors, handleSubmit } = useForm();
  const [data, setData] = useState({
    accountType: "",
    currency: "",
    gender: ""
  });



  const signUp = (signupDetails) => {
    // console.log(signupDetails, 'ugbala')
    return axios.post(
      `http://localhost:2000/admin/@supersignup`,
      signupDetails
    );
  };

  const mutation = useMutation(signUp, {
    onSuccess: (data) => {
      // console.log(data, "ikwe")
    router.push("/auth/admin/admin@sajjal.login");
    },
    onError: (error, variables, context) => {
      // console.log(`rolling back optimistic update with id ${context.id}`);
      // console.log(` ${error} is the error`);
    },
  });

  const onSignUp = async (values) => {
    const signUpDetails = {
      ...values,
    }
    mutation.mutate(signUpDetails);
  };



  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
       

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        
              <div className="text-blueGray-400 text-center mb-1 mt-5 font-bold">
                    <p>Signup</p>
                  </div>

                <Form onSubmit={handleSubmit(onSignUp)}>
                  <div className="relative w-full mb-3">
                   
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="username"
                    >
                     Username
                    </label>
                    <Input
                      id="username"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      {...register("username", { required: true })}
                    />
                  </div>

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
                      placeholder="email@mail.com"
                      {...register("email", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <Input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      name="password"
                      {...register("password", { required: true })}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <Button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      // block
                      type="submit"
                      // color="primary"
                      // size="md"
                    >
                      { mutation.isLoading ?  (
                        <Spinner className="" color='white' size="sm" />
                      ) : 'Create Account'  }
                    </Button>
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

Register.layout = Auth;
