import { addQuestion } from "@/src/api/questionController";
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

  const handleSubmit = async (values: API.QuestionAddRequest) => {
    const { title, content, answer, tags } = values;

    const hide = message.loading("题目创建中...");
    let success = false;
    try {
      const addQuestionResponse = await addQuestion({
        title,
        content,
        answer,
        tags,
      });
      const addQuestionResult = addQuestionResponse.data;
      if (addQuestionResult.code === ResponseCode.OK) {
        message.success("创建成功");
        success = true;
      }
    } catch (e) {
      console.log("添加题目失败", e);
      message.error("添加题目失败");
    } finally {
      hide();
      if (onSubmit) {
        onSubmit(success);
      }
    }
  };

  return (
    <Modal
      title="新增题目"
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
