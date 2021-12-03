import axios from "axios";
import fetchJson from "../../lib/fetchJson";
import withSession from "../../lib/session";

export default withSession(async (req, res) => {
  const body = await req.body;
  // console.log(body, "ebody");


  // const url = `localhost:3000/login`;
  const url = `http://localhost:6000/login`;
  let response;

  try {
    const config = { url, method: req.method, body };
    const response = await fetchJson(config);
    const data = response.data;

    if (data) {
      const user = { isLoggedIn: true, ...data };
      // console.log(user, "response from login/api")
      req.session.set("user", user);
      await req.session.save();
      // console.log(data.token, 'gogogo')
    return  res.json(user);
    } 

    // console.log(response, "error from login/api2");
    const user = { isLoggedIn: false, response };
    req.session.set("user", user);
    await req.session.save();
    return  res.json(user);

    // if ('req.method' === 'POST' || 'post') {
    //   // Process a POST request
    //   const config = {url, method : req.method,  body }
    //    response = await fetchJson(config);
    //   console.log(response, "why");

    // } else {
    //   // Handle any other HTTP method
    //    response = await fetchJson(url);
    //   console.log(response, "why2");
    // }

    // if (response.errors || response.error){
    //   const user = { isLoggedIn: false};
    //   req.session.set('user', user)
    //   await req.session.save()
    //   return res.status(400).json(response)
    // }
    // return res.status(200).json(response.data);

    //   const user = { isLoggedIn: true, token: response.token };
    //   req.session.set('user', user)
    //   await req.session.save()
    //  return  res.status(200).json(user)
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
    // console.log(error.response, 77);
  }
});
