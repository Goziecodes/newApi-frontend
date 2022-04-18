import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { Input, Button, Form, Spinner } from "reactstrap";

// layout for page
import Auth from "layouts/Auth.js";

export default function Transfer() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [transactionDetails, setTransactionDetails] = useState({});



  const transfer = (transferDetails) => {
    // console.log(signupDetails, 'ugbala')
    return axios.post(
      // `${process.env.REACT_APP_BASEURL}payment/vendor/${signupDetails}/expenses`,
      // `http://localhost:2000/user/transaction`,
      `${process.env.NEXT_PUBLIC_SERVER_BASEURL}/user/transaction`,
      transferDetails
    );
  };

  const transactionMutation = useMutation(transfer, {
    onSuccess: (data) => {
      // console.log(data, "ikwe")
      router.push("/dashboard");
    },
    onError: (error, variables, context) => {
      // console.log(`rolling back optimistic update with id ${context.id}`);
      console.log(` ${error} is the error`);
    },
  });

  const TransferForm = () => {
    const {
      register,
      formState: { errors },
      handleSubmit,
      watch,
      setValue,
    } = useForm();

    const watchAmount = watch("transaction_amount");
    const watchNet = watch("net");
    const watchTax = watch("tax");
    const watchTotal = watch("total");

    // const step1Loader = useRef(false);
    const [step1Loader, setStep1Loader] = useState(false);

    useEffect(() => {
      const setNet = (amount) => {
        if (amount <= 1000) {
          return 0;
        }

        if (amount > 1000) {
          // return amount * 10;
          return Math.floor((Math.random() * 15) + 1) / 10;
        }
      };
      const setTax = (amount) => {
        if (amount <= 1000) {
          return 0;
        }

        if (amount > 1000) {
          return 10 + Math.floor((Math.random() * 90 + 1));
        }
      };
      const setTotal = (amount) => {
        if (amount <= 1000) {
          return watchAmount;
        }

        if (amount > 1000) {
          return String(Number(watchAmount) + Number(watchTax));
        }
      };

      setValue("net", setNet(watchAmount), {
        shouldDirty: true,
      });
      setValue("tax", setTax(watchAmount), {
        shouldDirty: true,
      });
      setValue("total", setTotal(watchAmount));
    }, [ watchAmount]);

    const onTransfer = async (values, e) => {
      e.preventDefault();
      setStep1Loader(true);

      const transferDetails = {
        ...values,
      };

      const wait = (timeToDelay) =>
        new Promise((resolve) =>
          setTimeout(() => {
            setTransactionDetails(transferDetails);
            setStep(2);
          }, timeToDelay)
        );
      await wait(1000);
      // transactionMutation.mutate(transferDetails);
    };

    return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      Send Money
                    </h6>
                  </div>

                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>

                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <Form onSubmit={handleSubmit(onTransfer)}>
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
                      {errors.recipient_bank && (
                        <p className="text-sm text-red-500">
                          Recipient Bank is required
                        </p>
                      )}
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
                      {errors.bank_address && (
                        <p className="text-sm text-red-500">
                          {" "}
                          Bank Address is required
                        </p>
                      )}
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="accnumber"
                      >
                        Account Number
                      </label>
                      <Input
                        id="accnumber"
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="0123456789"
                        {...register("account_number", { required: true })}
                      />
                      {errors.account_number && (
                        <p className="text-sm text-red-500">
                          {" "}
                          Account Number is required
                        </p>
                      )}
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
                        placeholder="name"
                        {...register("recipient_name", { required: true })}
                      />
                      {errors.recipient_name && (
                        <p className="text-sm text-red-500">
                          {" "}
                          Recipient Name is required
                        </p>
                      )}
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
                        // name='lastName'
                        {...register("transaction_amount", {
                          required: true,
                          min: 1000,
                        })}
                      />
                      {errors.transaction_amount && (
                        <p className="text-sm text-red-500">
                          {" "}
                          Amount is required
                        </p>
                      )}
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
                        Description
                      </label>
                      <Input
                        id="details"
                        type="textarea"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        // placeholder="0123456789"
                        // name='lastName'
                        {...register("details", { required: true })}
                      />
                      {errors.details && (
                        <p className="text-sm text-red-500">
                          {" "}
                          Details is required
                        </p>
                      )}
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
                        // value={watchNet}
                        defaultValue={watchNet}
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
                        // name='lastName']                      value={watchNet}
                        defaultValue={watchTax}
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
                        defaultValue={watchTotal}
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
                        onClick={() => {
                          setStep1Loader(true);
                        }}
                      >
                        {step1Loader ? (
                          <Spinner className="" color="white" size="sm" />
                        ) : (
                          "Proceed"
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
  };

  const GenerateToken = () => {
    const {
      register: tokenRegister,
      formState: { errors: tokenFormErrors },
      handleSubmit: handleTokenSubmit,
      watch : tokenWatch
    } = useForm();

    const [recievedToken, setRecievedToken] = useState(false);
    const watchToken = tokenWatch("token");

   

    const onSubmitToken = async () => {
      // const transferDetails = {
      //   ...values,
      //   ...transactionDetails
      // };
      transactionMutation.mutate(transactionDetails);
    };

    const tokenMutation = useMutation(
      async () => {
        // return await axios.post(`http://localhost:2000/user/otp`).catch((err) => {
        return await axios
          .post(`${process.env.NEXT_PUBLIC_SERVER_BASEURL}/user/otp`)
          .catch((err) => {
            // console.log(err.response, 'cuaght')
            // throw err.response;
            throw new Error(err.response);
          });
      },
      {
        throwOnError: true,
        onSuccess: async (data) => {
          console.log(data, "ikwe");
          setRecievedToken(true);
        },
        onError: async (error, variables, context) => {
          // console.log(`rolling back optimistic update with id ${context.id}`);
          // console.log(` ${error} is the error`);
        },
      }
    );

    const verifyTokenMutation = useMutation(
      async (token) => {
        // return await axios.post(`http://localhost:2000/user/otp`).catch((err) => {
        return await axios
          .post(`${process.env.NEXT_PUBLIC_SERVER_BASEURL}/user/transactions/verify`, token)
          .catch((err) => {
            // console.log(err.response, 'cuaght')
            // throw err.response;
            throw new Error(err.response);
          });
      },
      {
        throwOnError: true,
        onSuccess: async (data) => {
          console.log(data, "ikwe");
          onSubmitToken()
          // setRecievedToken(true);
        },
        onError: async (error, variables, context) => {
          // console.log(`rolling back optimistic update with id ${context.id}`);
          // console.log(` ${error} is the error`);
        },
      }
    );

    // const handleToken = (e) => {
    //   setToken(e.target.value)
    // }
// console.log(token, 'token');
    return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      Generate Token To Authenticate Transfer
                    </h6>
                  </div>

                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>

                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  {/* <Form onSubmit={handleTokenSubmit(onSubmitToken)}> */}
                  <Form>
                    {/* <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="token"
                      >
                        Token
                      </label>
                      <Input
                        id="token"
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Enter Token sent to your Mail here"
                        {...tokenRegister("token", { required: true })}
                      />
                    </div> */}

                    {!recievedToken ? (
                      <div className="text-center mt-6">
                        <button
                          className="bg-emerald-400 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150"
                          // block
                          type="button"
                          onClick={() => tokenMutation.mutate()}
                          // color="primary"
                          // size="md"
                        >
                          {tokenMutation.isLoading ? (
                            <Spinner className="" color="white" size="sm" />
                          ) : (
                            "Generate Token"
                          )}
                        </button>
                      </div>
                    ) : (
                      <>
                      <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="token"
                      >
                        Token
                      </label>
                      <Input
                        id="token"
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Enter Token sent to your Mail here"
                        {...tokenRegister("token", { required: true })}
                        // onChange={handleToken}
                      />
                    </div>
                      
                      <div className="text-center mt-6">
                        <button
                          className="bg-emerald-400 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150"
                          // block
                          type="button"
                          onClick={() => verifyTokenMutation.mutate({token : watchToken})}
                          // color="primary"
                          // size="md"
                        >
                          {verifyTokenMutation.isLoading ? (
                            <Spinner className="" color="white" size="sm" />
                          ) : (
                            "Verify Token"
                          )}
                        </button>
                      </div>

                      </>
                    )}

                    {/* {verifyTokenMutation.isSuccess && (
                      <div className="text-center mt-6">
                        <Button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          // block
                          type="submit"
                          // color="primary"
                          // size="md"
                        >
                          {transactionMutation.isLoading ? (
                            <Spinner className="" color="white" size="sm" />
                          ) : (
                            "Complete Transfer"
                          )}
                        </Button>
                      </div>
                    )} */}
                  </Form>

                  <button
                    className="bg-emerald-400 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 mt-3 ease-linear transition-all duration-150"
                    // block
                    type="button"
                    onClick={() => setStep(1)}
                    // color="primary"
                    // size="md"
                  >
                    {tokenMutation.isLoading ? (
                      <Spinner className="" color="white" size="sm" />
                    ) : (
                      "Back"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{step === 1 ? <TransferForm /> : <GenerateToken />}</>;
}

Transfer.layout = Auth;
