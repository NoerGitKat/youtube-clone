import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export enum QueryKeys {
  me = "me",
  videos = "videos",
}

export interface IMe {
  _id: string;
  email: string;
  username: string;
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
