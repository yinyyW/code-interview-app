import { getQuestionBankVoById } from "@/src/api/questionBankController";
import { getQuestionVoById } from "@/src/api/questionController";
import QuestionCard from "@/src/components/QuestionCard";
import { Layout, Menu, MenuProps } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import Link from "next/link";

export default async function BankQuestionPage({
  params,
}: {
  params: Promise<{ bankId: string; questionId: string }>;
}) {
  const { bankId, questionId } = await params;
  let bankDetail: API.QuestionBankVO = {};
  let questionListRecord: API.PageQuestionVO = {};
  let questionListMenuItems: MenuProps["items"] = [];
  let questionDetail: API.QuestionVO = {};

  // 获取题库信息
  try {
    const queryBankDetailParam: API.getQuestionBankVOByIdParams = {
      questionBankQueryRequest: {
        id: bankId,
        needQueryQuestionList: true,
      },
    };
    const queryBankResult = await getQuestionBankVoById(queryBankDetailParam);
    const bankDetailData = queryBankResult.data?.data;
    bankDetail = {
      id: bankDetailData?.id,
      picture: bankDetailData?.picture,
      title: bankDetailData?.title,
      description: bankDetailData?.description,
    };
    questionListRecord = bankDetailData?.questionPage || {};
    questionListMenuItems = questionListRecord.records?.map((question) => {
      return {
        label: (
          <Link href={`/bank/${bankId}/question/${question.id}`}>
            {question.title}
          </Link>
        ),
        key: question.id || "",
      };
    });
  } catch (e) {
    console.log("获取题库失败");
  }

  // 获取题目详情
  try {
    const queryQuestionDetailParam: API.getQuestionVOByIdParams = {
      id: questionId,
    };
    const queryQuestionResult = await getQuestionVoById(
      queryQuestionDetailParam,
    );
    questionDetail = queryQuestionResult?.data?.data || {};
  } catch (e) {
    console.log("获取题目详情失败");
  }

  return (
    <div>
      <Layout
        style={{
          padding: "24px 0",
        }}
      >
        <Sider style={{ background: "#fff" }} width={200}>
          <Title level={3}>{bankDetail.title}</Title>
          <Menu items={questionListMenuItems} selectedKeys={[questionId]} />
        </Sider>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          <QuestionCard questionDetail={questionDetail} />
        </Content>
      </Layout>
    </div>
  );
}
