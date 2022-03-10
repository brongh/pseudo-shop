import "../styles/globals.css";
import type { AppContext, AppInitialProps } from "next/app";
import Layout from "../components/Layout";
import App from "next/app";

import wrapper from "../store";
import { END } from "redux-saga";
import { SagaStore } from "../types/store";
import { ReactReduxContext, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserAction } from "../store/auth/actions";

class MyApp extends App<AppInitialProps> {
  public static getInitialProps = wrapper.getInitialAppProps(
    (store) =>
      async ({ Component, ctx }: AppContext) => {
        const pageProps = {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : {}),
        };
        if (ctx.req) {
          store.dispatch(END);
          await (store as SagaStore).sagaTask.toPromise();
        }
        return {
          pageProps,
        };
      }
  );

  constructor(props: any) {
    super(props);
    this.state = { user: {} };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout>
        <GetUserStatus />
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default wrapper.withRedux(MyApp);

const GetUserStatus = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserAction());
  }, []);
  return null;
};
