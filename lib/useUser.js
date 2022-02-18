import React, { useEffect, useLayoutEffect } from 'react'
import Router from 'next/router';
import { useRouter } from 'next/router';

import axios from 'axios';
import { useSelector } from 'react-redux';
// import { useQueryClient } from 'react-query'
import { useQuery } from "react-query";


export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
} = {}) {
  // console.log(redirectTo, 'redirectTo')
  const router = useRouter()
const auth = useSelector(state => state.user);
const isLoggedIn = auth?.isLoggedIn;


  // const user = Object.keys(getUser).length === 0 && getUser.constructor === Object ? null : getUser;
  axios.defaults.headers.common.Authorization = auth?.token;

  const { data: user} = useQuery("useUser", async () => {
    // const { data } = await axios.get(`http://localhost:2000/${role}`);
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASEURL}/user/user`);
    return data;
  });

  // axios.defaults.headers.common.Authorization = user.token;

  // console.log(user, 'totofy')
  // console.log(auth, 't')

  // useLayoutEffect(() => {
  //   // if no redirect needed, just return (example: already on /dashboard)
  //   // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
  //   if (!auth && redirectTo ) {
  //     // console.log('called 1')
  //     Router.push(redirectTo)

  //   }
  //   if (!redirectTo || !auth) {
  //     // console.log(redirectTo, 'called 2')
  //     return
  //   }

  //   // if(auth?.role !== 'admin' && auth?.token && auth?.active !== true){
  //   if(user?.userInfo.role !== 'admin' && user?.token && user?.userInfo.active !== true){
  //     Router.push('/auth/verifyEmail')
  //   }

  //   if (
  //     // If redirectTo is set, redirect if the user was not found.
  //     // (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
  //     (redirectTo && !redirectIfFound && !auth?.token) ||
  //     // If redirectIfFound is also set, redirect if the user was found
  //     (redirectIfFound && auth?.token)
  //   ) {
  //     Router.push(redirectTo)
  //   }
  // }, [user, auth, isLoggedIn, redirectIfFound, redirectTo])

const inAppRouting = React.useMemo(() => ()=>{
  // console.log("usemomo")
    if (!auth && redirectTo ) {
      // console.log('called 1')
      Router.push(redirectTo)
    }
  
    // if (!auth || !redirectTo) {
    //   console.log(auth, 'called 2')
    //   return
    // }
  
    // if(auth?.role !== 'admin' && auth?.token && auth?.active !== true){
    if(router.pathname !== "/auth/verifyEmail" && user?.role !== 'admin' && auth?.token && user.active !== true){
      // console.log(user?.active, 'okok')
      Router.push('/auth/verifyEmail')
    }

    if (
      // If redirectTo is set, redirect if the user was not found.
      // (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectTo && !redirectIfFound && !auth?.token) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && auth?.token)
    ) {
      Router.push(redirectTo)
    }

}, [auth, redirectIfFound, redirectTo, user?.active, user?.role]);
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet

    
    user && inAppRouting();
  // return ''
  return {user, auth, isLoggedIn}
}
