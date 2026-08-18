"use server";

import { getQuestionBankVoById } from "@/src/api/questionBankController";
import QuestionList from "@/src/components/QuestionList";
import { Avatar, Button, Card, Flex } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Title from "antd/lib/typography/Title";

export default async function BankPage({
  params,
}: {
  params: Promise<{ bankId: string }>;
}) {
  const { bankId } = await params;
  let bankDetail: API.QuestionBankVO = {};
  let questionListRecord: API.PageQuestionVO = {};
  let firstQuestionId: number = -1;

  // 获取题库详情
  try {
    const param: API.getQuestionBankVOByIdParams = {
      questionBankQueryRequest: {
        id: bankId,
        needQueryQuestionList: true,
      },
    };
    const queryBankResult = await getQuestionBankVoById(param);
    const bankDetailData = queryBankResult.data?.data;
    bankDetail = {
      id: bankDetailData?.id,
      picture: bankDetailData?.picture,
      title: bankDetailData?.title,
      description: bankDetailData?.description,
    };
    questionListRecord = bankDetailData?.questionPage || {};
    if (
      questionListRecord &&
      questionListRecord.records &&
      questionListRecord.records.length > 0
    ) {
      firstQuestionId = questionListRecord.records[0].id || -1;
    }
  } catch (e) {
    console.log("获取题库失败");
  }

  if (!bankDetail.id) {
    return <div>获取题库失败</div>;
  }

  return (
    <div>
      <Card style={{ marginTop: "12px" }}>
        <Flex gap={24}>
          <div style={{ width: 72, height: 72 }}>
            <Avatar src={bankDetail.picture} size={72} />
          </div>
          <div>
            <Title level={3}>{bankDetail.title}</Title>
            <Paragraph type="secondary">{bankDetail.description}</Paragraph>
            <Button
              type="primary"
              shape="round"
              target="_blank"
              disabled={firstQuestionId <= 0}
              href={`/bank/${bankId}/question/${firstQuestionId}`}
            >
              开始刷题
            </Button>
          </div>
        </Flex>
      </Card>
      {questionListRecord &&
        questionListRecord?.total &&
        questionListRecord?.total > 0 && (
          <QuestionList
            questions={questionListRecord.records || []}
            cardTitle={`题目列表 (${questionListRecord.total})`}
            bankId={bankId}
          />
        )}
    </div>
  );
}
