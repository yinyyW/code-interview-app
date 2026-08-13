"use client";
import ACCESS_ENUM from "@/src/access/accessEnum";
import withAuth from "@/src/components/withAuth";
import { PageContainer } from "@ant-design/pro-components";

function UserAdminPage() {
  return (
    <PageContainer>
      <div>用户管理页面</div>
    </PageContainer>
  );
}

const AuthUserAdminPage = withAuth(UserAdminPage);

export default function Page() {
  return <AuthUserAdminPage requiredAuth={ACCESS_ENUM.ADMIN} />;
}
