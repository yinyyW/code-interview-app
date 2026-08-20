"use client";

import { updateQuestion } from "@/src/api/questionController";
import { ResponseCode } from "@/src/constant/ResponseCode";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";

interface UpdateModalProps {
  visible: boolean;
  columns: ProColumns<API.Question>[];
  initData?: API.Question;
  onCancel: () => void;
  onSubmit?: (success: boolean) => void;
}

export default function UpdateModal(props: UpdateModalProps) {
  const { visible, columns, initData, onCancel, onSubmit } = props;
  const defaultData = { ...initData };

  const handleSubmit = async (values: API.QuestionUpdateRequest) => {
    const id = initData?.id;
    const { title, content, answer, tags } = values;
    const hide = message.loading("更新题库中...");
    let success = false;
    try {
      const updateUserResponse = await updateQuestion({
        id,
        title,
        content,
        answer,
        tags,
      });
      const updateUserResult = updateUserResponse.data;
      if (updateUserResult.code === ResponseCode.OK) {
        message.success("更新成功");
        success = true;
      }
    } catch (e) {
      console.log("更新题目失败", e);
      message.error("更新题目失败");
    } finally {
      hide();
      if (onSubmit) {
        onSubmit(success);
      }
    }
  };

  if (initData?.tags) {
    defaultData.tags = JSON.parse(initData.tags) || [];
  }

  return (
    <Modal
      title="更新题目"
      open={visible}
      destroyOnHidden
      onCancel={onCancel}
      footer={null}
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={handleSubmit}
        form={{
          initialValues: defaultData,
          submitter: {
            render: (_, dom) => {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 6,
                  }}
                >
                  {dom}
                </div>
              );
            },
          },
        }}
      />
    </Modal>
  );
}
