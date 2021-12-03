import axios from "axios";

// fetchJson('/api/login', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   // body: JSON.stringify(body),
//   body: values
// })

// axios({
//   method: 'post',
//   url: '/user/12345',
//   data: {
//     firstName: 'Fred',
//     lastName: 'Flintstone'
//   }
// });

export default async function fetcher(config) {
  // console.log('00000000');
  try {
    // const response = await fetch(...args)
    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    // const data = await response.json();
    // return data;
    // console.log(data, 1)
    // console.log(response, 1)
    // console.log(config, 'args momo')


    // const response = await axios(...config);
    const response =  config.method ? await axios({
      method: config.method,
      url: config.url,
      data: config.body,
    }) : fetch(config);


    // const data = await response.json();
    return response;


    // const error = new Error(response.statusText)
    // error.response = response
    // error.data = data
    // throw error
  } catch (error) {
    // error.response && console.log(error.response.data, 22)
   return  error.response ?  error.response.data : error;
    // console.log(error.response.data, 22)

    // if (!error.data) {
    //   error.data = { message: error.message }
    // }
    // throw error
  }
}
