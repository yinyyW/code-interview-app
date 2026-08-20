import { addQuestionBank } from "@/src/api/questionBankController";
import { ResponseCode } from "@/src/constant/ResponseCode";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { message, Modal } from "antd";

interface CreateModalProps {
  visible: boolean;
  columns: ProColumns<API.QuestionBank>[];
  onCancel: () => void;
  onSubmit?: (success: boolean) => void;
}

export default function CreateModal(props: CreateModalProps) {
  const { visible, columns, onCancel, onSubmit } = props;

  const handleSubmit = async (values: API.QuestionBank) => {
    const { title, description, picture } = values;
    const hide = message.loading("题库创建中...");
    let success = false;
    try {
      const addQuestionBankResponse = await addQuestionBank({
        title,
        description,
        picture,
      });
      const addQuestionBankResult = addQuestionBankResponse.data;
      if (addQuestionBankResult.code === ResponseCode.OK) {
        message.success("创建成功");
        success = true;
      }
    } catch (e) {
      console.log("添加题库失败", e);
      message.error("添加题库失败");
    } finally {
      hide();
      if (onSubmit) {
        onSubmit(success);
      }
    }
  };

  return (
    <Modal
      title="新增题库"
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
