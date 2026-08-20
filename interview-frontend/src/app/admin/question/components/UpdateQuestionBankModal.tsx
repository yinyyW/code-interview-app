"use client";

import { listQuestionBankByPage } from "@/src/api/questionBankController";
import {
  addQuestionBankQuestion,
  listQuestionBankQuestionVoByPage,
  removeQuestionBankQuestion,
  updateQuestionBankQuestion,
} from "@/src/api/questionBankQuestionController";
import { ResponseCode } from "@/src/constant/ResponseCode";
import { Button, Flex, Form, message, Modal, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

interface UpdateQuestionBankModalProps {
  visible: boolean;
  questionId: number | string;
  onCancel: () => void;
  onSubmit?: (success: boolean) => void;
}

const SELECTED_BANKS_FIELD = "selectedBanksField";

export default function UpdateQuestionBankModal(
  props: UpdateQuestionBankModalProps,
) {
  const { visible, questionId, onCancel, onSubmit } = props;
  const [questionBanks, setQuestionBanks] = useState<API.QuestionBank[]>([]);
  const oldBanks = useRef<API.QuestionBank[]>([]);
  const [form] = Form.useForm();

  const queryQuestionBanksByQuestion = useCallback(async () => {
    try {
      const queryResponse = await listQuestionBankQuestionVoByPage({
        pageNum: 1,
        pageSize: 20,
        questionId: questionId,
      });
      const result = queryResponse.data;
      if (result.code === ResponseCode.OK && result.data) {
        const data = result.data;
        const questionBankQuestionList = data.records || [];
        const selectedBanks: API.QuestionBankVO[] =
          questionBankQuestionList.map((questionBankQuestion) => {
            return questionBankQuestion?.questionBank ?? {};
          });

        const ids = selectedBanks.map((value) => value.id);
        console.log("query result: ", result);
        form.setFieldValue(SELECTED_BANKS_FIELD, ids);
        oldBanks.current = [...selectedBanks];
      }
    } catch (e) {
      console.log("获取题库列表失败", e);
    }
  }, [questionId, form]);

  const queryAllQuestionBanks = useCallback(async () => {
    try {
      const queryBanksResponse = await listQuestionBankByPage({
        pageNum: 1,
        pageSize: 100,
      });
      const queryBanksResult = queryBanksResponse.data;
      if (queryBanksResult.code === ResponseCode.OK && queryBanksResult.data) {
        const questionBanksList: API.QuestionBank[] =
          queryBanksResult.data.records || [];
        setQuestionBanks(questionBanksList);
      }
    } catch (e) {
      console.log("获取题库列表失败", e);
    }
  }, []);

  const handleSubmit = async () => {
    const selectedBanks: string[] = form.getFieldValue(SELECTED_BANKS_FIELD);
    if (!selectedBanks || selectedBanks.length <= 0) {
      message.error("至少选择一个题库");
      return;
    }

    // 获取添加列表和删除列表
    const removeList = oldBanks.current
      .filter((bank) => !selectedBanks.includes(String(bank?.id)))
      .map((bank) => bank.id);
    const addList = selectedBanks.filter(
      (id) => !oldBanks.current.find((bank) => String(bank.id) === id),
    );

    // 异步调用接口
    const promiseQueryList: Promise<
      AxiosResponse<API.BaseResponseBoolean | API.BaseResponseLong>
    >[] = [];
    removeList.forEach((id) => {
      promiseQueryList.push(
        removeQuestionBankQuestion({
          questionBankId: id,
          questionId: questionId,
        }),
      );
    });
    addList.forEach((id) => {
      promiseQueryList.push(
        addQuestionBankQuestion({
          questionBankId: id,
          questionId: questionId,
        }),
      );
    });
    try {
      const result = await Promise.all(promiseQueryList);
      console.log("result", result);
      message.success("修改成功");
      if (onSubmit) {
        onSubmit(true);
      }
    } catch (e) {
      console.log("修改关联题库失败", e);
      message.error("修改失败");
    }
  };

  useEffect(() => {
    if (!questionId || !visible) {
      return;
    }

    queryAllQuestionBanks();
    queryQuestionBanksByQuestion();
  }, [
    questionId,
    visible,
    queryAllQuestionBanks,
    queryQuestionBanksByQuestion,
  ]);

  return (
    <Modal
      title="关联题库"
      open={visible}
      destroyOnHidden
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form}>
        <FormItem name={SELECTED_BANKS_FIELD} label="题库">
          <Select
            mode="multiple"
            options={questionBanks.map((bank) => {
              return {
                label: bank.title,
                value: bank.id,
              };
            })}
            showSearch
            style={{
              width: "100%",
            }}
          />
        </FormItem>
        <Form.Item label={null} style={{ marginBottom: 0 }}>
          <Flex justify="flex-end">
            <Button type="primary" onClick={handleSubmit}>
              确认
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
}
