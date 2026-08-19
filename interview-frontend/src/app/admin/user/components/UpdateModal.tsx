"use client";

import { updateUser } from "@/src/api/userController";
import { ResponseCode } from "@/src/constant/ResponseCode";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";

interface UpdateModalProps {
  visible: boolean;
  columns: ProColumns<API.User>[];
  initData?: API.User;
  onCancel: () => void;
  onSubmit?: (success: boolean) => void;
}

export default function UpdateModal(props: UpdateModalProps) {
  const { visible, columns, initData, onCancel, onSubmit } = props;

  const handleSubmit = async (values: API.User) => {
    const id = initData?.id;
    const { userName, userAvatar, userRole, userProfile } = values;
    const hide = message.loading("更新用户中...");
    let success = false;
    try {
      const updateUserResponse = await updateUser({
        id,
        userName,
        userAvatar,
        userRole,
        userProfile,
      });
      const updateUserResult = updateUserResponse.data;
      if (updateUserResult.code === ResponseCode.OK) {
        message.success("更新成功");
        success = true;
      }
    } catch (e) {
      console.log("更新用户失败", e);
      message.error("更新用户失败");
    } finally {
      hide();
      if (onSubmit) {
        onSubmit(success);
      }
    }
  };

  return (
    <Modal
      title="更新用户"
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
          initialValues: initData,
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
