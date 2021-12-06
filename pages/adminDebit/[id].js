import React, { useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useMutation,useQuery } from "react-query";
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

export default function AdminTransfer() {
  const router = useRouter();
  const { id } = router.query;
  const { register, errors, handleSubmit } = useForm();
  const [data, setData] = useState({
    accountType: "",
    currency: "",
    gender: "",
  });

  const tokenMutation = useMutation(
    async () => {
      // return await axios.post(`http://localhost:2000/user/otp`).catch((err) => {
      return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASEURL}/user/otp`).catch((err) => {
        // console.log(err.response, 'cuaght')
        // throw err.response;
        throw new Error(err.response);
      });
    },
    {
      throwOnError: true,
      onSuccess: async (data) => {
        console.log(data, "ikwe");
      },
      onError: async (error, variables, context) => {
        // console.log(`rolling back optimistic update with id ${context.id}`);
        // console.log(` ${error} is the error`);
      },
    }
  );

  const debit = (transferDetails) => {
    // console.log(signupDetails, 'ugbala')
    return axios.post(
      // `${process.env.REACT_APP_BASEURL}payment/vendor/${signupDetails}/expenses`,
      // `http://localhost:2000/admin/transactions/debit/${id}`,
      `${process.env.NEXT_PUBLIC_SERVER_BASEURL}/admin/transactions/debit/${id}`,
      transferDetails
    );
  };

  const debitMutation = useMutation(debit, {
    onSuccess: (data) => {
      // console.log(data, "ikwe")
      // router.push("/dashboard");
    },
    onError: (error, variables, context) => {
      // console.log(`rolling back optimistic update with id ${context.id}`);
      console.log(` ${error} is the error`);
    },
  });

  const onDebit = (values) => {
    console.log(values);
    debitMutation.mutate(values);
  };

  

  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery("getSingleUser", async () => {
    // const { data } = await axios.get(`http://localhost:2000/admin/user/${id}`);
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASEURL}/admin/user/${id}`);
    return data;
  });

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Debit user
                  </h6>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>

              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <Form onSubmit={handleSubmit(onDebit)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="recipient"
                    >
                      Recipient Bank
                    </label>
                    <Input
                      id="recipient"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Bank"
                      // name='firstName'
                      // inputRef={register}
                      {...register("recipient_bank", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="bankAddress"
                    >
                      Bank Address
                    </label>
                    <Input
                      id="bankAddress"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Address"
                      {...register("bank_address", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="accnumber"
                    >
                      Account Number
                    </label>
                    <input
                      id="accnumber"
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="0123456789"
                      // defaultValue='0123456789'
                      defaultValue={user?.accountNumber}
                      {...register("account_number", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="recipientname"
                    >
                      Recipient Name
                    </label>
                    <Input
                      id="recipientname"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="0123456789"
                      {...register("recipient_name", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="amount"
                    >
                      Amount
                    </label>
                    <Input
                      id="amount"
                      min="1000"
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="0123456789"
                      // name='lastName'
                      {...register("transaction_amount", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="routing"
                    >
                      Routing
                    </label>
                    <Input
                      id="routing"
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="45679"
                      {...register("routing", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="swift"
                    >
                      Swift
                    </label>
                    <Input
                      id="swift"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      // placeholder="0123456789"
                      {...register("swift", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="details"
                    >
                      Details
                    </label>
                    <Input
                      id="details"
                      type="textarea"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      // placeholder="0123456789"
                      // name='lastName'
                      {...register("details", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="net"
                    >
                      Net
                    </label>
                    <Input
                      id="net"
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      // placeholder="0123456789"
                      // name='lastName'
                      {...register("net", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="tax"
                    >
                      Tax
                    </label>
                    <Input
                      id="tax"
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      // placeholder="0123456789"
                      // name='lastName'
                      {...register("tax", { required: true })}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="total"
                    >
                      Total
                    </label>
                    <Input
                      id="total"
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      // placeholder="0123456789"
                      // name='lastName'
                      {...register("total", { required: true })}
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
                      
                      {debitMutation.isLoading ? (
                      <Spinner className="" color="white" size="sm" />
                      ) : 'Credit' }
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

AdminTransfer.layout = Auth;
