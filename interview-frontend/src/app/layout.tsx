"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./global.css";
import BasicLayout from "../layout/BasicLayout";
import store from "../store";
import { Provider } from "react-redux";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ch">
      <body>
        <AntdRegistry>
          <Provider store={store}>
            <BasicLayout>{children}</BasicLayout>
          </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}
