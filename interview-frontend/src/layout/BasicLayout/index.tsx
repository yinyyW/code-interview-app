"use client";

import dynamic from "next/dynamic";
import { ReactNode, useCallback, useEffect } from "react";
import "./index.css";
import { getLoginUser } from "@/src/api/userController";
import { ResponseCode } from "@/src/constant/ResponseCode";
import { useAppDispatch } from "@/src/hooks/useStoreHooks";
import { setLoginUser } from "@/src/store/loginUser";
import { usePathname } from "next/navigation";

export interface BasicLayoutProps {
  children: ReactNode;
}

const ProLayoutClient = dynamic(() => import("./ProLayoutClient"), {
  ssr: false,
});

export default function BasicLayout(props: BasicLayoutProps) {
  const appDispatch = useAppDispatch();
  const pathName = usePathname();

  const init = useCallback(async () => {
    console.log("应用初始化");
    // 获取用户信息
    try {
      const response = await getLoginUser();
      const resData = response.data;
      if (resData.code === ResponseCode.OK && resData.data) {
        appDispatch(setLoginUser(resData.data));
      }
    } catch (e) {
      console.log("登录用户接口查询异常：", e);
    }
  }, [appDispatch]);

  useEffect(() => {
    if (
      !pathName.startsWith("/user/login") &&
      !pathName.startsWith("/user/register")
    ) {
      init();
    }
  }, [pathName, init]);

  return <ProLayoutClient>{props.children}</ProLayoutClient>;
}
