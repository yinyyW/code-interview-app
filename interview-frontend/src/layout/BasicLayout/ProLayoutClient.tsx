"use client";

import { GithubFilled } from "@ant-design/icons";
import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { Input, theme } from "antd";
import { BasicLayoutProps } from ".";
import Image from "next/image";
import { menuItems } from "@/src/config/menu";
import GlobalFooter from "@/src/components/GlobalFooter";
import { useEffect } from "react";
import { listQuestionBankVoByPage } from "@/src/api/questionBankController";

export default function ProLayoutClient(props: BasicLayoutProps) {
  const { children } = props;

  const { token } = theme.useToken();

  useEffect(() => {
    listQuestionBankVoByPage({}).then((res) => {
      console.log("list question banks by page", res);
    });
  }, []);

  return (
    <div
      style={{
        overflow: "auto",
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadius,
      }}
      className="h-full"
    >
      <ProLayout
        {...menuItems}
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
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          size: "small",
          title: "用户",
        }}
        actionsRender={() => [
          <Input key="search" />,
          <GithubFilled key="github" />,
        ]}
        menuItemRender={(item, dom) => <div>{dom}</div>}
        footerRender={() => <GlobalFooter />}
      >
        <PageContainer>{children}</PageContainer>
      </ProLayout>
    </div>
  );
}
