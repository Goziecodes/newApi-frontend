import React, { useRef } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

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
} from "reactstrap";
import { useQuery, useMutation } from "react-query";
import { useLoading, BallTriangle } from "@agney/react-loading";
import { useState } from "react";
import { useEffect } from "react";
import TransactionsTable from "components/Cards/TransactionsTable";

export default function SingleTransaction() {
  const imgref = useRef(null);

  const [src, setSrc] = useState();
  const router = useRouter();
  const { id } = router.query;

  const verifyMutation = useMutation(
    async (userID) => {
      return await axios
        // .post(`http://localhost:2000/admin/verifyuser/${userID}`)
        .post(`https://fathomless-mountain-03627.herokuapp.com/admin/verifyuser/${userID}`)
        .catch((err) => {
          // console.log(err.response, 'cuaght')
          // throw err.response;
          throw new Error(err.response);
        });
    },
    {
      throwOnError: true,
      onSuccess: async (data) => {
      
        // dispatch(loginUser(userDetails));
        router.push("/dashboard");
      },
      onError: async (error, variables, context) => {
        // console.log(`rolling back optimistic update with id ${context.id}`);
        // console.log(` ${error} is the error`);
      },
    }
  );

  const {
    data: user,
    isLoading,
    isSuccess,
  } = useQuery("getSingleUser", async () => {
    // const { data } = await axios.get(`http://localhost:2000/admin/user/${id}`);
    const { data } = await axios.get(`https://fathomless-mountain-03627.herokuapp.com/admin/user/${id}`);
    return data;
  });
console.log(user,'user');
  // axios.get(`http://localhost:2000/uploads/${id}`, { responseType:"blob" })
  //   .then(function (response) {

  //       var reader = new window.FileReader();
  //       reader.readAsDataURL(response.data);
  //       reader.onload = function() {

  //           var imageDataUrl = reader.result;
  //           setSrc(imageDataUrl)

  //       }
  //   });

  const { containerProps, indicatorEl } = useLoading({
    indicator: <BallTriangle width="50" color="white" />,
    loading: true,
    loaderProps: {
      // Any props here would be spread on to the indicator element.
      // style: {{ margin: '0 auto' }}
      style: { margin: "3rem auto" },
    },
  });


  console.log(user);

  return (
    <>
      {isLoading ? (
        <section {...containerProps}>{indicatorEl}</section>
      ) : (
        <>
          <main className="profile-page mt-20">
            {/* <section className="relative block h-500-px"></section> */}
          </main>
          <ImgContainer className="w-container     m-auto ">
            {/* <div className="w-container  h-500-px md:h-95÷-px  m-auto "> */}
            <>
            <div id='transactions' className="w-full  mb-12 xl:mb-0 px-4">
              <TransactionsTable transactions={user.transaction} />
            </div>
          </>
          </ImgContainer>
          <div class="text-center">
            {" "}
            <Button className="mt-2" onClick={()=>verifyMutation.mutate(id)}>Verify</Button>
          </div>{" "}
        </>
      )}
    </>
  );
}

SingleTransaction.layout = GeneralLayout;
// src="/img/team-2-800x800.jpg"
//                             className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"

const ImgContainer = styled.div`
  height: 500px;

  @media only screen and (max-width: 500px) {
    height: 400px;
  }
`;
