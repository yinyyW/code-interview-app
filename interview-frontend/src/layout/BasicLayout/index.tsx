"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import "./index.css";

export interface BasicLayoutProps {
  children: ReactNode;
}

const ProLayoutClient = dynamic(() => import("./ProLayoutClient"), {
  ssr: false,
});

export default function BasicLayout(props: BasicLayoutProps) {
  return <ProLayoutClient>{props.children}</ProLayoutClient>;
}
