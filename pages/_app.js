import React from "react";
import { Provider } from 'react-redux'
import { store, persistor } from '../redux/store'
import withRedux from "next-redux-wrapper";
import { PersistGate } from 'redux-persist/integration/react'

import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { SWRConfig } from 'swr'
import fetch from '../lib/fetchJson'
import { ReactQueryCacheProvider, QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

import PageChange from "components/PageChange/PageChange.js";

import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "styles/tailwind.css";
import axios from "axios";
import useToken from "lib/useToken";


// Router.events.on("routeChangeStart", (url) => {
//   console.log(`Loading: ${url}`);
//   document.body.classList.add("body-page-transition");
//   ReactDOM.render(
//     <PageChange path={url} />,
//     document.getElementById("page-transition")
//   );
// });

// Router.events.on("routeChangeComplete", () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
//   document.body.classList.remove("body-page-transition");
// });
// Router.events.on("routeChangeError", () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
//   document.body.classList.remove("body-page-transition");
// });

export const instance = axios.create({
  baseURL: process.env.REACT_APP_PAYMENT_BASE_URL,
});

const queryCache = new QueryCache();

function MyApp({ Component, pageProps }) {



  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }))

  const { token } = useToken();

  // console.log(user, 'nawaoh!!')

 axios.defaults.headers.common.Authorization = token;

  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
      // <SWRConfig
      //   value={{
      //     fetcher: fetch,
      //     onError: (err) => {
      //       console.error(err)
      //     },
      //   }}
      // >
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

    <QueryClientProvider client={queryClient}>
    <Hydrate state={pageProps.dehydratedState}>

    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Notus NextJS by Creative Tim</title>
        <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
      </Head>
      
          <Layout>
            <Component {...pageProps} />
          </Layout>
     
    </React.Fragment>
    </Hydrate>
  </QueryClientProvider>
  {/* </SWRConfig> */}
  </PersistGate>
      </Provider>
  );
}



MyApp.getInitialProps = async ({Component, ctx}) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  //Anything returned here can be accessed by the client
  return {pageProps: pageProps};
}

// MyApp.getInitialProps = async (ctx) => {
//   const res = await fetch('https://api.github.com/repos/vercel/next.js')
//   const json = await res.json()
//   //   const appProps = await App.getInitialProps(appContext);
//   return { stars: json.stargazers_count }
// }



// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }
const makeStore = () => store;
export default withRedux(makeStore)(MyApp);
// export default MyApp;

// import React from "react";
// import ReactDOM from "react-dom";
// import App from "next/app";
// import Head from "next/head";
// import Router from "next/router";
// import { ReactQueryCacheProvider, QueryCache } from 'react-query'
// import { Hydrate } from 'react-query/hydration'

// import PageChange from "components/PageChange/PageChange.js";

// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "styles/tailwind.css";

// // Router.events.on("routeChangeStart", (url) => {
// //   console.log(`Loading: ${url}`);
// //   document.body.classList.add("body-page-transition");
// //   ReactDOM.render(
// //     <PageChange path={url} />,
// //     document.getElementById("page-transition")
// //   );
// // });
// Router.events.on("routeChangeComplete", () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
//   document.body.classList.remove("body-page-transition");
// });
// Router.events.on("routeChangeError", () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
//   document.body.classList.remove("body-page-transition");
// });

// export default class MyApp extends App {
//   componentDidMount() {
//     let comment = document.createComment(`

// =========================================================
// * Notus NextJS - v1.1.0 based on Tailwind Starter Kit by Creative Tim
// =========================================================

// * Product Page: https://www.creative-tim.com/product/notus-nextjs
// * Copyright 2021 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/notus-nextjs/blob/main/LICENSE.md)

// * Tailwind Starter Kit Page: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/presentation

// * Coded by Creative Tim

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// `);
//     document.insertBefore(comment, document.documentElement);
//   }
//   static async getInitialProps({ Component, router, ctx }) {
//     let pageProps = {};

//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx);
//     }

//     return { pageProps };
//   }
//   render() {
//     // let queryCache = new QueryCache();
//     const { Component, pageProps } = this.props;

//     const Layout = Component.layout || (({ children }) => <>{children}</>);

//     return (
//       <React.Fragment>
//         <Head>
//           <meta
//             name="viewport"
//             content="width=device-width, initial-scale=1, shrink-to-fit=no"
//           />
//           <title>Notus NextJS by Creative Tim</title>
//           <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script>
//         </Head>
//         {/* <ReactQueryCacheProvider queryCache={queryCache}> */}
//        {/* <Hydrate state={pageProps.dehydratedState}> */}
//        <Layout>
//           <Component {...pageProps} />
//         </Layout>
//        {/* </Hydrate> */}
//      {/* </ReactQueryCacheProvider> */}

//       </React.Fragment>
//     );
//   }
// }
