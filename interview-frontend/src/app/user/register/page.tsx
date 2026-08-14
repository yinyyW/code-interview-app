"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { message, theme } from "antd";
import { useRouter } from "next/navigation";
import { userRegister } from "@/src/api/userController";
import { ResponseCode } from "@/src/constant/ResponseCode";
import { ApiException } from "@/src/libs/request";

/**
 * 用户注册页面
 * @constructor
 */
function UserRegisterPage() {
  const { token } = theme.useToken();
  const [form] = ProForm.useForm();
  const router = useRouter();

  /**
   * 提交
   */
  const doSubmit = async (values: API.UserRegisterRequest) => {
    try {
      const res = await userRegister(values);
      console.log(res);
      if (res.data.code === ResponseCode.OK && res.data) {
        message.success("注册成功，请登录");
        // 前往登录页
        router.replace("/user/login");
        form.resetFields();
      }
    } catch (e) {
      if (e instanceof ApiException) {
        message.error("注册失败, " + e.message);
      } else {
        message.error("注册失败");
      }
    }
  };

  return (
    <div id="userRegisterPage">
      <LoginForm
        form={form}
        logo={
          <Image src="/assets/logo.png" alt="面试鸭" height={44} width={44} />
        }
        title="面试鸭 - 用户注册"
        subTitle="程序员面试刷题网站"
        submitter={{
          searchConfig: {
            submitText: "注册",
          },
        }}
        onFinish={doSubmit}
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined />,
          }}
          placeholder={"请输入用户账号"}
          rules={[
            {
              required: true,
              message: "请输入用户账号!",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
            statusRender: (value) => {
              const getStatus = () => {
                if (value && value.length > 12) {
                  return "ok";
                }
                if (value && value.length > 6) {
                  return "pass";
                }
                return "poor";
              };
              const status = getStatus();
              if (status === "pass") {
                return (
                  <div style={{ color: token.colorWarning }}>强度：中</div>
                );
              }
              if (status === "ok") {
                return (
                  <div style={{ color: token.colorSuccess }}>强度：强</div>
                );
              }
              return <div style={{ color: token.colorError }}>强度：弱</div>;
            },
          }}
          placeholder={"请输入密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
        />
        <ProFormText.Password
          name="checkPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined />,
          }}
          placeholder={"请输入确认密码"}
          rules={[
            {
              required: true,
              message: "请输入确认密码！",
            },
          ]}
        />
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          已有账号？
          <Link href={"/user/login"}>去登录</Link>
        </div>
      </LoginForm>
    </div>
  );
}

export default UserRegisterPage;
