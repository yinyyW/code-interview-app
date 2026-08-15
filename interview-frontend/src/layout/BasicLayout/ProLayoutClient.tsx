"use client";

import { GithubFilled, LogoutOutlined } from "@ant-design/icons";
import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { Dropdown, message } from "antd";
import { BasicLayoutProps } from ".";
import Image from "next/image";
import { menuItems } from "@/src/config/menu";
import GlobalFooter from "@/src/components/GlobalFooter";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useStoreHooks";
import Link from "next/link";
import getAccessibleMenus from "@/src/access/menuAccess";
import { useRouter } from "next/navigation";
import { userLogout } from "@/src/api/userController";
import { ResponseCode } from "@/src/constant/ResponseCode";
import { DEFAULT_USER, setLoginUser } from "@/src/store/loginUser";
import { ApiError } from "next/dist/server/api-utils";
import "./index.css";
import SearchInput from "@/src/components/SearchInput";

export default function ProLayoutClient(props: BasicLayoutProps) {
  const { children } = props;

  const router = useRouter();
  const loginUser = useAppSelector((state) => state.loginUser);
  const dispatch = useAppDispatch();

  const handleUserLogout = async () => {
    try {
      const result = await userLogout();
      const resData = result.data;
      if (resData.code === ResponseCode.OK) {
        message.success("退出成功");
        dispatch(setLoginUser(DEFAULT_USER));
      }
    } catch (e) {
      if (e instanceof ApiError) {
        message.error(`退出失败: ${e.message}`);
      } else {
        message.error(`退出失败`);
      }
    }
  };

  return (
    <div className="prolayout-wrapper">
      <ProLayout
        title="面试鸭刷题平台"
        logo={
          <Image
            src="/assets/logo.png"
            height={32}
            width={32}
            alt="面试鸭刷题网站"
          />
        }
        layout="top"
        contentWidth="Fluid"
        siderMenuType="group"
        fixSiderbar
        // location={{ pathname }}
        avatarProps={{
          src:
            loginUser?.userAvatar ??
            "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          size: "small",
          title: loginUser?.userName ?? "用户",
          render: (props, dom) =>
            loginUser.id ? (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  onClick: (menuInfo) => {
                    if (menuInfo.key === "logout") {
                      handleUserLogout();
                    }
                  },
                }}
              >
                {dom}
              </Dropdown>
            ) : (
              <div onClick={() => router.push("/user/login")}>{dom}</div>
            ),
        }}
        actionsRender={() => [
          <SearchInput key="search" />,
          <GithubFilled key="github" />,
        ]}
        menuDataRender={() => getAccessibleMenus(loginUser, menuItems)}
        menuItemRender={(item, dom) => {
          return <Link href={item.path || "/"}>{dom}</Link>;
        }}
        footerRender={() => <GlobalFooter />}
      >
        <PageContainer className="max-width-content">{children}</PageContainer>
      </ProLayout>
    </div>
  );
}
