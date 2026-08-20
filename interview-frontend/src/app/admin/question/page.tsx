"use client";

import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from "@ant-design/pro-components";
import { Button, message, Popconfirm, Space, Tooltip } from "antd";
import ACCESS_ENUM from "@/src/access/accessEnum";
import withAuth from "@/src/components/withAuth";
import { useRef, useState } from "react";
import { ResponseCode } from "@/src/constant/ResponseCode";
import {
  deleteQuestionBank,
  listQuestionBankByPage,
} from "@/src/api/questionBankController";
import UpdateModal from "./components/UpdateModal";
import CreateModal from "./components/CreateModal";
import {
  deleteQuestion,
  listQuestionByPage,
} from "@/src/api/questionController";
import TagList from "@/src/components/TagList";
import MdEditor from "@/src/components/MdEditor";

function QuestionAdminPage() {
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<API.User | null>(null);

  const questionRef = useRef<ActionType | undefined>(undefined);

  const columns: ProColumns<API.Question>[] = [
    {
      title: "id",
      dataIndex: "id",
      valueType: "text",
      hideInForm: true,
    },
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      render: (_, record) => {
        const text = record.title || "";
        return (
          <Tooltip title={text}>
            <span>{text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: "内容",
      dataIndex: "content",
      valueType: "text",
      hideInSearch: true,
      width: 240,
      render: (_, record) => {
        const text = record.content || "";
        return (
          <Tooltip title={text}>
            <span>{text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
          </Tooltip>
        );
      },
      renderFormItem: () => {
        return <MdEditor />;
      },
    },
    {
      title: "答案",
      dataIndex: "answer",
      valueType: "text",
      hideInSearch: true,
      width: 640,
      render: (_, record) => {
        const text = record.answer || "";
        return (
          <Tooltip title={text}>
            <span>{text.length > 20 ? `${text.slice(0, 20)}...` : text}</span>
          </Tooltip>
        );
      },
      renderFormItem: () => {
        return <MdEditor />;
      },
    },
    {
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, entity) => {
        return <TagList tagList={JSON.parse(entity?.tags || "")} />;
      },
    },
    {
      title: "创建时间",
      sorter: true,
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "编辑时间",
      sorter: true,
      dataIndex: "editTime",
      valueType: "dateTime",
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: "更新时间",
      sorter: true,
      dataIndex: "updateTime",
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
            title="确认删除这个题目吗？"
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
  ];

  const handleDeleteRow = async (id?: string | number) => {
    if (!id) {
      message.error("删除题目失败");
      return;
    }
    try {
      const deleteResponse = await deleteQuestion({ id: id as string });
      const deleteResult = deleteResponse.data;
      if (deleteResult.code === ResponseCode.OK) {
        message.success("删除题目成功");
        questionRef.current?.reload();
      } else {
        message.error("删除题目失败");
      }
    } catch (e) {
      console.log(e);
      message.error("删除题目失败");
    }
  };

  return (
    <PageContainer className="bankAdmin">
      <ProTable<API.User>
        headerTitle={"查询表格"}
        rowKey={(record) => String(record.id)}
        columns={columns}
        actionRef={questionRef}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="add"
              onClick={() => setAddModalVisible(true)}
            >
              新增题目
            </Button>,
          ];
        }}
        request={async (params, sort, filter) => {
          const queryQuestionsResult = await listQuestionByPage({
            pageNum: params.current,
            pageSize: params.pageSize,
          });
          const queryQuestionsData = queryQuestionsResult.data;
          return {
            success: queryQuestionsData.code === ResponseCode.OK,
            data: queryQuestionsData.data?.records,
            total: queryQuestionsData.data?.total,
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
            questionRef.current?.reload();
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
            questionRef.current?.reload();
          }
        }}
      />
    </PageContainer>
  );
}

const AuthQuestionAdminPage = withAuth(QuestionAdminPage);

export default function page() {
  return <AuthQuestionAdminPage requiredAuth={ACCESS_ENUM.ADMIN} />;
}
