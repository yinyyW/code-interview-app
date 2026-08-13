import { Button, Result } from "antd";

export default function Forbidden() {
  return (
    <Result
      status={403}
      title="403"
      subTitle="对不起，你无权访问该页面。"
      extra={
        <Button type="primary" href="/">
          返回首页
        </Button>
      }
    ></Result>
  );
}
