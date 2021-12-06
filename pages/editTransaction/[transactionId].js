import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
// import { ErrorMessage } from '@hookform/error-message';

import Quicklinks from "components/Cards/Quicklinks.jsx";
import UserHeaderStats from "components/Headers/UserHeaderStats.js";

// layout for page

import GeneralLayout from "../../layouts/GeneralLayout";
import UserTransactionsTable from "components/Cards/UserTransactionsTable";
import axios from "axios";
import {
  Jumbotron,
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner
} from "reactstrap";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { useLoading, BallTriangle } from "@agney/react-loading";

export default function SingleTransaction() {
  const queryClient = useQueryClient();
  const { register, errors, handleSubmit } = useForm();
  const router = useRouter();
  const { transactionId } = router.query;

  const { data: transaction, isLoading } = useQuery("singleTransaction", async () => {
    const { data } = await axios.get(
      // `http://localhost:2000/admin/transaction/${transactionId}`
      `${process.env.NEXT_PUBLIC_SERVER_BASEURL}/admin/transaction/${transactionId}`
    );
    return data;
  });

  const mutation = useMutation(
    async (transactionDetails) => {
      return await axios
        .post(
          // `http://localhost:2000/admin/transactions/edit/${transactionId}`, 
          `${process.env.NEXT_PUBLIC_SERVER_BASEURL}/admin/transactions/edit/${transactionId}`, 
          transactionDetails
        )
        .catch((err) => {
          // console.log(err.response, 'cuaght')
          // throw err.response;
          throw new Error(err.response);
        });
    },
    {
      throwOnError: true,
      onSuccess: async () => {
        queryClient.invalidateQueries(["singleTransaction", "adminGetTransactions"]);
      },
      onError: async (error, variables, context) => {
        // console.log(`rolling back optimistic update with id ${context.id}`);
        console.log(` ${error} is the error`);
      },
    }
  );

  const { containerProps, indicatorEl } = useLoading({
    indicator: <BallTriangle width="50" color="white" />,
    loading: true,
    loaderProps: {
      // Any props here would be spread on to the indicator element.
      // style: {{ margin: '0 auto' }}
      style: { margin: "3rem auto" },
    },
  });

  // const transfer = (transferDetails) => {
  //   // console.log(signupDetails, 'ugbala')
  //   return axios.post(
  //     // `${process.env.REACT_APP_BASEURL}payment/vendor/${signupDetails}/expenses`,
  //     `http://localhost:2000/user/transaction`,
  //     transferDetails
  //   );
  // };

  // const transactionMutation = useMutation(transfer, {
  //   onSuccess: (data) => {
  //     // console.log(data, "ikwe")
  //     router.push("/dashboard");
  //   },
  //   onError: (error, variables, context) => {
  //     // console.log(`rolling back optimistic update with id ${context.id}`);
  //     console.log(` ${error} is the error`);
  //   },
  // });

  const onTransfer = async (values) => {
    const transferDetails = {
      ...values,
    };
    console.log(transferDetails, "ohoo");
    mutation.mutate(transferDetails);
  };

  return (
    <>
      {isLoading ? (
        <section {...containerProps}>{indicatorEl}</section>
      ) : (
        <>
          <div className="bg-white mt-20 pt-8 pb-6 px-4 h-auto w-90 mx-auto rounded-lg ">
            <form onSubmit={handleSubmit(onTransfer)}>
              <Row>
                <Col md={6}>
                  <label for="recipient" className="">
                    recipient_bank
                  </label>
                  <br />
                  <input
                    className="w-full"
                    type="text"
                    id="recipient"
                    defaultValue={transaction?.recipient_bank}
                    {...register("recipient_bank", { required: true })}
                  />
                </Col>

                <Col md={6}>
                  <label for="bank_address" className="">
                    bank_address
                  </label>
                  <br />
                  <input
                    className="w-full"
                    type="text"
                    id="bank_address"
                    defaultValue={transaction?.bank_address}
                    {...register("bank_address", { required: true })}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Label for="account_number" className="">
                    account_number
                  </Label>
                  <input
                    className="w-full"
                    type="text"
                    id="account_number"
                    defaultValue={transaction?.account_number}
                    {...register("account_number", { required: true })}
                  />
                </Col>

                <Col md={6}>
                  <Label for="recipient_name" className="">
                    recipient_name
                  </Label>
                  <input
                    className="w-full"
                    type="text"
                    id="recipient_name"
                    placeholder="with a placeholder"
                    defaultValue={transaction?.recipient_name}
                    {...register("recipient_name", { required: true })}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Label for="transaction_amount" className="">
                    transaction_amount
                  </Label>
                  <input
                    className="w-full"
                    type="text"
                    id="transaction_amount"
                    defaultValue={transaction?.transaction_amount}
                    {...register("transaction_amount", { required: true, min: 1000 })}
                  />
                  {/* <ErrorMessage errors={errors} name="transaction_amount" /> */}

                </Col>

                <Col md={6}>
                  <Label for="details" className="">
                    details
                  </Label>
                  <input
                    className="w-full"
                    type="text"
                    id="details"
                    placeholder="with a placeholder"
                    defaultValue={transaction?.details}
                    {...register("details", { required: true })}
                  />
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Label for="routing" className="">
                    routing
                  </Label>
                  <input
                    className="w-full"
                    type="text"
                    id="routing"
                    defaultValue={transaction?.routing}
                    {...register("routing", { required: true })}
                  />
                </Col>

                <Col md={6}>
                  <Label for="swift" className="">
                    swift
                  </Label>
                  <input
                    className="w-full"
                    type="text"
                    id="swift"
                    defaultValue={transaction?.swift}
                    {...register("swift", { required: true })}
                  />
                </Col>
              </Row>

              <input type="submit" value="submit kwanu" />

              <div className="d-flex justify-evenly">
                <Button type="submit" color="primary">
                  {
                    mutation.isLoading ? <Spinner /> : 'Edit Transaction'
                  }
                </Button>
              </div>
            </form>

            {/* <div className="d-flex justify-evenly">
                <Button type='submit' color="primary">Edit Transaction</Button>            
            </div> */}
          </div>
        </>
      )}
    </>
  );
}

SingleTransaction.layout = GeneralLayout;
