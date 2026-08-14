"use client";

import { userLogin } from "@/src/api/userController";
import { ResponseCode } from "@/src/constant/ResponseCode";
import { useAppDispatch } from "@/src/hooks/useStoreHooks";
import { ApiException } from "@/src/libs/request";
import { setLoginUser } from "@/src/store/loginUser";
import LockOutlined from "@ant-design/icons/es/icons/LockOutlined";
import UserOutlined from "@ant-design/icons/es/icons/UserOutlined";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function UserLoginPage() {
  const [form] = ProForm.useForm();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = async (value: API.UserLoginRequest) => {
    console.log("login", value);
    try {
      const result = await userLogin(value);
      if (result.data?.code === ResponseCode.OK && result.data?.data) {
        message.success("登录成功");
        // 保存用户登录状态
        dispatch(setLoginUser(result.data?.data));
        router.replace("/");
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
    <div>
      <LoginForm
        logo={
          <Image src="/assets/logo.png" alt="面试鸭" width={44} height={44} />
        }
        title="面试鸭-用户登录"
        subTitle="程序员面试刷题网站"
        onFinish={login}
        form={form}
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined className={"prefixIcon"} />,
          }}
          placeholder={"用户名"}
          rules={[
            {
              required: true,
              message: "请输入用户名!",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          placeholder={"密码"}
          rules={[
            {
              required: true,
              message: "请输入密码！",
            },
          ]}
          fieldProps={{
            size: "large",
            prefix: <LockOutlined className={"prefixIcon"} />,
          }}
        />
        <div
          style={{
            marginBlockEnd: 24,
            textAlign: "end",
          }}
        >
          还没有账号？
          <Link href={"/user/register"}>去注册</Link>
        </div>
      </LoginForm>
    </div>
  );
}

export default UserLoginPage;
