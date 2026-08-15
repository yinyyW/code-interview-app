import { MenuDataItem } from "@ant-design/pro-components";
import ACCESS_ENUM from "../access/accessEnum";

export const menuItems: MenuDataItem[] = [
  {
    path: "/",
    name: "主页",
  },

  {
    path: "/banks",
    name: "题库",
  },

  {
    path: "/admin",
    name: "管理页",
    access: ACCESS_ENUM.ADMIN,
    children: [
      {
        path: "/admin/sub-page1",
        name: "用户管理",
        access: ACCESS_ENUM.ADMIN,
      },
      {
        path: "/admin/sub-page2",
        name: "题库管理",
        access: ACCESS_ENUM.ADMIN,
      },
    ],
  },

  {
    path: "https://www.mianshiya.com/",
    name: "面试鸭官网",
  },
];
