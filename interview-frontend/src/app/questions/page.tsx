"use server";
import { listQuestionVoByPage } from "@/src/api/questionController";
import QuestionTable from "@/src/components/QuestionTable";
import { ResponseCode } from "@/src/constant/ResponseCode";
import Title from "antd/es/typography/Title";

export default async function Questions({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // 获取 url 的查询参数
  const { q: searchText } = await searchParams;

  let questionsList: API.QuestionVO[] = [];
  let total: number = 0;

  // 获取题目列表
  try {
    const queryQuestionsParam: API.QuestionBankQueryRequest = {
      pageNum: 1,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "descend",
    };
    if (searchText) {
      queryQuestionsParam.searchText = searchText;
    }
    const questionsQueryResult =
      await listQuestionVoByPage(queryQuestionsParam);
    const questionsData = questionsQueryResult.data;
    if (questionsData.code === ResponseCode.OK && questionsData.data) {
      const questionsPageData = questionsData.data;
      total = questionsPageData.total || 0;
      questionsList = questionsPageData.records || [];
    }
  } catch (e) {
    console.log("获取题目列表异常", e);
  }

  return (
    <div className="questions">
      <Title level={3} style={{ marginTop: "36px" }}>
        题目大全
      </Title>
      <QuestionTable
        defaultQuestions={questionsList}
        defaultTotal={total}
        defaultSearchText={searchText}
      />
    </div>
  );
}
