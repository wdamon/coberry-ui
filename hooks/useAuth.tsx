import React, {useEffect} from "react";
import Router, { withRouter} from "next/router";
import nextCookie from "next-cookies";
import cookie from "js-cookie";
import jwtDecode from "jwt-decode";

import { NextPageContext} from "next";

const TOKEN_STORAGE_KEY = "coberry.token"

interface Context extends NextPageContext {
    token: string | undefined
}

// login takes a context object and a jwttoken string.
// It sets the token in cookies and forwards the user to the dashboard.
export const login = async (ctx: Context, token: string) => {
    cookie.set(TOKEN_STORAGE_KEY, token, { expires: 1 });
    forward(ctx, "/dashboard");
};

// forward takes a context object and a destination string that should make a valid page.
// It forwards the use on both server and client side.
const forward = async (ctx:Context, dest: string) => {
    // If `ctx.req` is available it means we are on the server.
    if (ctx?.req) {
        ctx.res?.writeHead(302, { Location: dest });
        ctx.res?.end();
        return
    }

     await Router.push(dest)
};

// auth checks for a token and either forwards the user to the login screen or returns an authtoken object
export const auth = (ctx:Context = {} as Context, queryToken: string | undefined): string => {
    let token = queryToken ? queryToken : nextCookie(ctx)[TOKEN_STORAGE_KEY];

    //@todo check token validity
    if (!token) forward(ctx, "/login");

    const auth = jwtDecode(token);


    return auth;
};

// logout removes the auth token from cookie storage across all windows.
export const logout = () => {
    cookie.remove(TOKEN_STORAGE_KEY);
    // to support logging out from all windows
    window.localStorage.setItem("logout", String(Date.now()));

    // we can safely use Router.push because logout can only be called from the client side.
    Router.push("/");
};

const getTokenFromWindowSearchParams = ():string => {
    let params = new URLSearchParams(window.location.search);
    return params.get("jwt") || ""
};

// withAuthSync is a HoC that wraps protected routes in logic that checks for an authtoken.
export const withAuthSync =  (WrappedComponent:any) => {
    class Wrapper extends React.Component<any> {
        syncLogout = (event:any) => {
            if (event.key === "logout") {
                Router.push("/");
            }
        };

        componentDidMount() {
            window.addEventListener("storage", this.syncLogout);
            const token = getTokenFromWindowSearchParams();
            if (token) {
                cookie.set(TOKEN_STORAGE_KEY, token, { expires: 1 });
            }
        }

        componentWillUnmount() {
            window.removeEventListener("storage", this.syncLogout);
            window.localStorage.removeItem("logout");
        }

      static async getInitialProps(ctx:Context) {
          if (ctx.query.jwt) {
              cookie.set(TOKEN_STORAGE_KEY, ctx.query.jwt, { expires: 1 });
          }

        const token = auth(ctx, ctx.query.jwt as string || undefined );
        const componentProps =
            WrappedComponent.getInitialProps &&
            (await WrappedComponent.getInitialProps(ctx));

        return { ...componentProps, token }
      }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return withRouter(Wrapper);
};