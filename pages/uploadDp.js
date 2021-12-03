import React, {useState} from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useQuery } from "react-query";
import {Form} from 'reactstrap'
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from "react-query";
import { useSelector, useDispatch } from 'react-redux';
import {Input} from 'reactstrap'



export default function Profile() {
  const queryClient = useQueryClient();
  const [image, setImage] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()

const { register, errors, handleSubmit } = useForm();

  const { data : user } = useQuery("userProfile", async () => {
    const { data } = await axios.get(
      // `http://localhost:2000/user/user`
      `https://fathomless-mountain-03627.herokuapp.com/user/user`
    );
    return data;
  });

  const mutation = useMutation(async formData => {
    return await axios.post(
        // `http://localhost:2000/user/dp`,
        `https://fathomless-mountain-03627.herokuapp.com/user/dp`,
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        )
        .catch(err => {
          // console.log(err.response, 'cuaght')
          throw new Error(err.response)
        })
  }, {
    throwOnError: true,
    onSuccess: async (data) => {
      console.log(data, "ikwe");
      queryClient.invalidateQueries("userProfile");
      // const userDetails = {
      //   token: data.data.token,
      //   ...data.data.userInfo
      // }
      // dispatch(loginUser(userDetails));
      router.push('/profile');
    },
    onError: async (error, variables, context) => {
      // console.log(`rolling back optimistic update with id ${context.id}`);
      // console.log(` ${error} is the error`);
    }
  })
  
  async function handleUpload(e) {
    e.preventDefault();

    const formData = new FormData();    
    // Update the formData object
    formData.append(
      "profilePic",
      image,
    );
      await mutation.mutate(formData);
  }
  async function onFileChange(e) {
    e.preventDefault();
    setImage(e.target.files[0])
    // console.log(values)
    // const loginDetails = {
    //   username: values.email,
    //   password: values.password
    // }
    //   await mutation.mutate(loginDetails);
  }

  console.log(image)
  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                    <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
                    </div>
                  </div>
                  <div className="w-full justify-center   lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="flex justify-center py-6 px-3 mt-20 sm:mt-0 ">
                    {/* <div className="py-6 px-3 mt-32 sm:mt-0"> */}
                      <button
                        className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        {`${user?.firstName} ${user?.lastName}`}
                      </button>
                    </div>
                  </div>
         
                </div>

            

             


                <div className="text-center mt-8">
                <form onSubmit={handleUpload}>
                {/* <Form onSubmit={handleSubmit(handleUpload)}> */}
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="id"
                    >
                      Upload Profile Picture
                    </label>
                    <input
                    id="id"
                      type="file"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder=""
                      // {...register("id", { required: true })}
                      name='id'
                      onChange={onFileChange}
                    />
                  </div>

             

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Upload
                    </button>
                  </div>
                </form>
                </div>
  
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
