import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { useQueryClient } from 'react-query'
import { useQuery } from "react-query";

export default function useToken() {
const token = useSelector(state => state.user.token);

  // const user = Object.keys(getUser).length === 0 && getUser.constructor === Object ? null : getUser;
  // axios.defaults.headers.common.Authorization = getUser.token;

  

  // axios.defaults.headers.common.Authorization = user.token;

  // console.log(token, 'gangly token')

  // return ''
  return {token}
}
