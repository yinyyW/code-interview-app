"use client";
import ACCESS_ENUM from "@/src/access/accessEnum";
import { deleteUser, listUserByPage } from "@/src/api/userController";
import withAuth from "@/src/components/withAuth";
import { ResponseCode } from "@/src/constant/ResponseCode";
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, Typography } from "antd";
import { useMemo, useRef, useState } from "react";
import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";

function UserAdminPage() {
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<API.User | null>(null);

  const userRef = useRef<ActionType | undefined>(undefined);

  const columns = useMemo<ProColumns<API.User>[]>(
    () => [
      {
        title: "id",
        dataIndex: "id",
        valueType: "text",
        hideInForm: true,
      },
      {
        title: "账号",
        dataIndex: "userAccount",
        valueType: "text",
        formItemProps: {
          required: true,
        },
        fieldProps: (form, _) => {
          const userId = form.getFieldValue("id");
          return {
            required: true,
            disabled: !!userId,
          };
        },
      },
      {
        title: "用户名",
        dataIndex: "userName",
        valueType: "text",
      },
      {
        title: "头像",
        dataIndex: "userAvatar",
        valueType: "image",
        hideInSearch: true,
      },
      {
        title: "简介",
        dataIndex: "userProfile",
        valueType: "textarea",
        hideInForm: !selectedData,
      },
      {
        title: "权限",
        dataIndex: "userRole",
        valueEnum: {
          user: {
            text: "用户",
          },
          admin: {
            text: "管理员",
          },
        },
        formItemProps: {
          required: true,
        },
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        valueType: "dateTime",
        hideInSearch: true,
        hideInForm: true,
      },
      {
        title: "更新时间",
        dataIndex: "username",
        valueType: "dateTime",
        hideInSearch: true,
        hideInForm: true,
      },
      {
        title: "操作",
        dataIndex: "option",
        valueType: "option",
        render: (_, row) => (
          <Space size="middle">
            <Button
              key="edit"
              type="link"
              onClick={() => {
                setSelectedData(row);
                setUpdateModalVisible(true);
              }}
            >
              修改
            </Button>
            <Popconfirm
              key="delete"
              title="确认删除这个用户吗？"
              description="删除后无法恢复，请谨慎操作"
              okText="确认删除"
              cancelText="取消"
              okButtonProps={{
                danger: true,
              }}
              onConfirm={() => handleDeleteRow(row?.id)}
            >
              <Button type="link" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    [selectedData],
  );

  const handleDeleteRow = async (id?: string | number) => {
    if (!id) {
      message.error("删除用户失败");
      return;
    }
    try {
      const deleteResponse = await deleteUser({ id: id as string });
      const deleteResult = deleteResponse.data;
      if (deleteResult.code === ResponseCode.OK) {
        message.success("删除用户成功");
        userRef.current?.reload();
      } else {
        message.error("删除用户失败");
      }
    } catch (e) {
      console.log(e);
      message.error("删除用户失败");
    }
  };

  return (
    <PageContainer>
      <ProTable<API.User>
        headerTitle={"查询表格"}
        rowKey={(record) => String(record.id)}
        columns={columns}
        actionRef={userRef}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="add"
              onClick={() => setAddModalVisible(true)}
            >
              新增用户
            </Button>,
          ];
        }}
        request={async (params, sort, filter) => {
          const queryUsersResult = await listUserByPage({
            pageNum: params.current,
            pageSize: params.pageSize,
          });
          const queryUsersData = queryUsersResult.data;
          return {
            success: queryUsersData.code === ResponseCode.OK,
            data: queryUsersData.data?.records,
            total: queryUsersData.data?.total,
          };
        }}
      />
      <CreateModal
        visible={addModalVisible}
        columns={columns}
        onCancel={() => setAddModalVisible(false)}
        onSubmit={(success) => {
          setAddModalVisible(false);
          if (success) {
            userRef.current?.reload();
          }
        }}
      />
      <UpdateModal
        visible={updateModalVisible}
        columns={columns}
        initData={selectedData || {}}
        onCancel={() => {
          setUpdateModalVisible(false);
          setSelectedData(null);
        }}
        onSubmit={(success) => {
          setUpdateModalVisible(false);
          setSelectedData(null);
          if (success) {
            userRef.current?.reload();
          }
        }}
      />
    </PageContainer>
  );
}

const AuthUserAdminPage = withAuth(UserAdminPage);

export default function Page() {
  return <AuthUserAdminPage requiredAuth={ACCESS_ENUM.ADMIN} />;
}
