import "../styles/globals.css";
import type { AppContext, AppInitialProps } from "next/app";
import Layout from "../components/Layout";
import App from "next/app";

import wrapper from "../store";
import { END } from "redux-saga";
import { SagaStore } from "../types/store";

class MyApp extends App<AppInitialProps> {
  public static getInitialProps = wrapper.getInitialAppProps(
    (store) =>
      async ({ Component, ctx }: AppContext) => {
        const pageProps = {
          ...(Component.getInitialProps
            ? await Component.getInitialProps(ctx)
            : { pathname: ctx.pathname }),
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
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default wrapper.withRedux(MyApp);
