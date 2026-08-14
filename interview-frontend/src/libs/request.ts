import axios from "axios";
import { ResponseCode } from "../constant/ResponseCode";

export interface ApiError {
  code: string;
  message: string;
}

export class ApiException<T = unknown> extends Error implements ApiError {
  public readonly code: string;
  public readonly data?: T;

  constructor(code: string, message: string, data?: T) {
    super(message);
    this.code = code;
    this.data = data;
    Object.setPrototypeOf(this, ApiException.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiException);
    }
  }

  public static from<T>(error: ApiError & { data?: T }): ApiException<T> {
    return new ApiException(error.code, error.message, error.data);
  }
}

const myAxios = axios.create({
  baseURL: "http://localhost:8123/api",
  timeout: 60000,
  withCredentials: true,
});

// 创建响应拦截器
myAxios.interceptors.response.use(
  // 2xx 响应触发
  function (response) {
    // 处理响应数据
    const { data } = response;
    // 未登录
    if (data.code === ResponseCode.NOT_LOGIN) {
      // 不是获取用户信息接口，或者不是登录页面，则跳转到登录页面
      if (
        !response.request.responseURL.includes("user/get/login") &&
        !window.location.pathname.includes("/user/login")
      ) {
        window.location.href = `/user/login?redirect=${window.location.href}`;
      }
    } else if (data.code !== ResponseCode.OK) {
      // 其他错误
      throw new ApiException(data.code || "", data.message || "");
    }
    return response;
  },
  // 非 2xx 响应触发
  function (error) {
    // 处理响应错误
    return Promise.reject(error);
  },
);

export default myAxios;
