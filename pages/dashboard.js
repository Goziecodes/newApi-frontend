import React, { useState } from "react";
// import Link from "next/link";
// import { useMutation } from "react-query";
// import { useSelector, useDispatch } from "react-redux";
import { useLoading, BallTriangle } from "@agney/react-loading";

// import {
//   Col,
//   Label,
//   Row,
//   Card,
//   CardBody,
//   FormGroup,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   // FormGroup,
//   Input,
//   Button,
//   InputGroup,
//   InputGroupAddon,
//   InputGroupText,
//   Form,
//   Spinner,
//   CardTitle,
// } from "reactstrap";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/router";

// import fetchJson from '../../lib/fetchJson'
// import useUser from '../../lib/useUser'
// layout for page

import AdminLayout from "../layouts/Admin.js";
// import Auth from "../layouts/Auth";
import UserLayout from "../layouts/UserLayout";
// import GeneralLayout from "../layouts/GeneralLayout";
import useUser from "lib/useUser.js";

import AdminDash from "../components/admin/adminDashboard";
import UserDash from "../components/user/userDashboard";

export default function Dashboard() {
  // const router = useRouter();

  const { containerProps, indicatorEl } = useLoading({
    indicator: <BallTriangle width="50" color='grey' />,
    loading: true,
    loaderProps: {
      // Any props here would be spread on to the indicator element.
      // style: {{ margin: '0 auto' }}
      style: { margin: '20rem auto' }
    },
  });

  const { auth, isLoggedIn } = useUser({ redirectTo: "/auth/login" });
  // const { user } = useUser({ redirectTo: "/auth/login" });

  // Server-render loading state
  // if (!user || user.isLoggedIn === false) {



  console.log({auth, isLoggedIn})

  if (!isLoggedIn) {
   return <section {...containerProps}>
      {indicatorEl} {/* renders only while loading */}
    </section>
  }

  // const Layout = auth?.role === "user" ? UserLayout : Auth;
  // const Layout = auth?.role === "user" ? UserLayout : GeneralLayout;
  const Layout = auth?.role === "user" ? UserLayout : AdminLayout;

  const Dashboard = auth?.role === "user" ? UserDash : AdminDash;
  // console.log(Dashboard, 'Dashboard')

  return (
    <Layout>
      <Dashboard />
      </Layout>
  );
}
