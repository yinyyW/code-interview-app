"use client";

import { GithubFilled } from "@ant-design/icons";
import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { Input, theme } from "antd";
import { BasicLayoutProps } from ".";
import Image from "next/image";
import { menuItems } from "@/src/config/menu";
import GlobalFooter from "@/src/components/GlobalFooter";
import { useAppSelector } from "@/src/hooks/useStoreHooks";
import Link from "next/link";
import getAccessibleMenus from "@/src/access/menuAccess";
import MdEditor from "@/src/components/MdEditor";

export default function ProLayoutClient(props: BasicLayoutProps) {
  const { children } = props;

  const loginUser = useAppSelector((state) => state.loginUser);

  const { token } = theme.useToken();

  return (
    <div
      style={{
        overflow: "auto",
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadius,
        height: "100vh",
      }}
    >
      <ProLayout
        title="面试鸭刷题平台"
        logo={
          <Image
            src="/assets/logo.png"
            height={32}
            width={32}
            alt="面试鸭刷题网站 - 程序员鱼皮"
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
        }}
        actionsRender={() => [
          <Input key="search" />,
          <GithubFilled key="github" />,
        ]}
        menuDataRender={() => getAccessibleMenus(loginUser, menuItems)}
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"}>{dom}</Link>
        )}
        footerRender={() => <GlobalFooter />}
      >
        <PageContainer>
          <MdEditor value="# 标题\n测试markdown" />

          {children}
        </PageContainer>
      </ProLayout>
    </div>
  );
}
