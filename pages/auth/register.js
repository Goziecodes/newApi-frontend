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
      `${process.env.NEXT_PUBLIC_SERVER_BASEURL}/user/signup`,
      signupDetails
    );
  };

  const mutation = useMutation(signUp, {
    onSuccess: (data) => {
      console.log(data, "ikwe")
      const userRole = data.data.createdUser.role;
      console.log(userRole, "userRole")

      // router.push("/auth/verifyEmail")
      router.push(userRole === 'user' ? "/auth/verifyEmail" : "/dashboard")
    },
    onError: (error, variables, context) => {
      // console.log(`rolling back optimistic update with id ${context.id}`);
      // console.log(` ${error} is the error`);
    },
  });

  const onSignUp = async (values) => {
    const signUpDetails = {
      ...values,
      ...data
    }
    mutation.mutate(signUpDetails);
  };

  const handleSelected = (values) => {
    // console.log(values)
    setData({
      ...data,
      [values.key] : values.value
    });
  };

  const options = [
    { value: "nationalIdCard", label: "National ID Card" },
    { value: "driverLicense", label: "Driver's License" },
  ];
  const AccountTypes = [
    { value: "savings", label: "Savings", key: "accountType"},
    { value: "current", label: "Current", key: "accountType"},
  ];
  const gender = [
    { value: "male", label: "Male", key: "gender"},
    { value: "female", label: "Female", key: "gender"},
  ];
  const currency = [
    { value: "usd", label: "USD $", key:'currency'  },
    { value: "euro", label: "Euro €", key:'currency' },
    { value: "pounds", label: "Pounds £", key:'currency' },
  ];
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
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
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <Form onSubmit={handleSubmit(onSignUp)}>
                  <div className="relative w-full mb-3">
                    <div className="text-blueGray-400 text-center mb-3 font-bold">
                      <small>Personal Details</small>
                    </div>
                    <div className="w-full text-center mb-2">
                      <small className="text-red-500">
                        Your Names should be as they appear on your means of
                        Identification
                      </small>
                    </div>
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="First Name"
                      // name='firstName'
                      // inputRef={register}
                      {...register("firstName", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="middleName"
                    >
                      Middle Name
                    </label>
                    <Input
                      id="middleName"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Middle Name"
                      // name='email'
                      {...register("middleName", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Last Name"
                      // name='lastName'
                      {...register("lastName", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="gender"
                    >
                      Gender
                    </label>
                    <Select
                    onChange={handleSelected}
                      options={gender}
                      id="gender"
                      className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>

                  <div className="text-blueGray-400 text-center mb-1 mt-5 font-bold">
                    <small>Identification</small>
                  </div>

                  {/* <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="nationality"
                    >
                      Nationality
                    </label>
                    <Input
                      id="nationality"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Nationality"
                      // name='nationality'
                      {...register("nationality", { required: true })}
                    />
                  </div> */}

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="dateOfBirth"
                    >
                      Date Of Birth
                    </label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Date of Birth"
                      {...register("dateOfBirth", { required: true })}
                    />
                  </div>

                  {/* <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="idcard"
                    >
                      Type of Identity Card
                    </label>
                    <Select
                     options={options} 
                     id="idcard"
                     className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Identity Card"
                     />                  
                  </div> */}

                  {/* <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="idphone"
                    >
                      Identity Card Number
                    </label>
                    <Input
                    id="idphone"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="ID Card phone"
                    />                 
                  </div> */}

                  <div className="text-blueGray-400 text-center mb-1 mt-5 font-bold">
                    <small>Contact Info</small>
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
                      placeholder="Email"
                      // name="email"
                      {...register("email", { required: true })}
                    />
                  </div>
                  
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="phone"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Phone Number"
                      name="phone"
                      {...register("phone", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="address"
                    >
                      Address
                    </label>
                    <Input
                      id="address"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Address"
                      name="address"
                      {...register("address", { required: true })}
                    />
                  </div>

                  <div className="text-blueGray-400 text-center mb-1 mt-5 font-bold">
                    <small>Account Details</small>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="AccountType"
                    >
                      Account Type
                    </label>
                    <Select
                    onChange={handleSelected}
                      options={AccountTypes}
                      id="AccountType"
                      className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="currency"
                    >
                      Currency
                    </label>
                    <Select
                     onChange={handleSelected}
                      options={currency}
                      id="currency"
                      className="border-0 px-2 py-2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
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

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <Input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <Button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      // block
                      type="submit"
                      // color="primary"
                      // size="md"
                    >
                      Create Account
                      {mutation.isLoading && (
                        <Spinner className="" size="sm" />
                      )}
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
