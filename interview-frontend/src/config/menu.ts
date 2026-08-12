export const menuItems = {
  route: {
    path: "/",
    routes: [
      {
        path: "/",
        name: "主页",
      },
      {
        name: "题库",
        path: "/bank",
        component: "./ListTableList",
        routes: [
          {
            path: "/list/sub-page",
            name: "面试题库",
            component: "./Welcome",
          },
          {
            path: "/list/sub-page2",
            name: "笔试题库",
            component: "./Welcome",
          },
        ],
      },
      {
        path: "/admin",
        name: "管理页",
        access: "canAdmin",
        component: "./Admin",
        routes: [
          {
            path: "/admin/sub-page1",
            name: "用户管理",
            component: "./Welcome",
          },
          {
            path: "/admin/sub-page2",
            name: "题库管理",
            component: "./Welcome",
          },
        ],
      },
      {
        path: "https://www.mianshiya.com/",
        name: "面试鸭官网",
      },
    ],
  },
  location: {
    pathname: "/",
  },
};
