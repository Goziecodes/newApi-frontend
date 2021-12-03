import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { useQueryClient } from 'react-query'
import { useQuery } from "react-query";

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
} = {}) {
  // console.log(redirectTo, 'redirectTo')
const auth = useSelector(state => state.user);
const isLoggedIn = auth?.isLoggedIn;
// const queryClient = useQueryClient()

// console.log(auth, 'auth.user.isLoggedIn');

  // const user = Object.keys(getUser).length === 0 && getUser.constructor === Object ? null : getUser;
  axios.defaults.headers.common.Authorization = auth?.token;
  const role = auth?.role 

  const { data: user  = {} } = useQuery("useUser", async () => {
    // const { data } = await axios.get(`http://localhost:2000/${role}`);
    const { data } = await axios.get(`https://fathomless-mountain-03627.herokuapp.com/${role}`);
    return data;
  });

  // axios.defaults.headers.common.Authorization = user.token;

  // console.log(user, 'gangly')

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!auth && redirectTo ) {
      // console.log('called 1')
      Router.push(redirectTo)

    }
    if (!redirectTo || !auth) {
      // console.log(redirectTo, 'called 2')
      return
    }

    if(auth?.role !== 'admin' && auth?.token && auth?.active !== true){
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
  }, [user, auth, isLoggedIn, redirectIfFound, redirectTo])

  // return ''
  return {user, auth, isLoggedIn}
}
