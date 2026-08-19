import { addUser } from "@/src/api/userController";
import { ResponseCode } from "@/src/constant/ResponseCode";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";

interface CreateModalProps {
  visible: boolean;
  columns: ProColumns<API.User>[];
  onCancel: () => void;
  onSubmit?: (success: boolean) => void;
}

export default function CreateModal(props: CreateModalProps) {
  const { visible, columns, onCancel, onSubmit } = props;

  const handleSubmit = async (values: API.User) => {
    const { userName, userAccount, userAvatar, userRole } = values;
    const hide = message.loading("用户创建中...");
    let success = false;
    try {
      const addUserResponse = await addUser({
        userName,
        userAccount,
        userAvatar,
        userRole,
      });
      const addUserResult = addUserResponse.data;
      if (addUserResult.code === ResponseCode.OK) {
        message.success("创建成功");
        success = true;
      }
    } catch (e) {
      console.log("添加用户失败", e);
      message.error("添加用户失败");
    } finally {
      hide();
      if (onSubmit) {
        onSubmit(success);
      }
    }
  };

  return (
    <Modal
      title="新增用户"
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
