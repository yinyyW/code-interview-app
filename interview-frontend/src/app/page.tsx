import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import QuestionBankList from "../components/QuestionBankList";
import QuestionList from "../components/QuestionList";
import { listQuestionBankVoByPage } from "../api/questionBankController";
import { listQuestionVoByPage } from "../api/questionController";
import { ResponseCode } from "../constant/ResponseCode";

const QUESTION_BANK_LIST_PAGE_SIZE = 12;
const QUESTION_LIST_PAGE_SIZE = 12;

export default async function Home() {
  let questionBanksList: API.QuestionBankVO[] = [];
  let questionsList: API.QuestionVO[] = [];

  // 获取首页题库和题目列表
  try {
    const queryQuestionBanksParam: API.QuestionBankQueryRequest = {
      pageNum: 1,
      pageSize: QUESTION_BANK_LIST_PAGE_SIZE,
    };
    const queryQuestionsParam: API.QuestionQueryRequest = {
      pageNum: 1,
      pageSize: QUESTION_LIST_PAGE_SIZE,
    };
    const queryPromisesList = [
      listQuestionBankVoByPage(queryQuestionBanksParam),
      listQuestionVoByPage(queryQuestionsParam),
    ];
    const [questionBanksQueryResult, questionsQueryResult] =
      await Promise.all(queryPromisesList);
    const questionBanksData = questionBanksQueryResult.data;
    const questionsData = questionsQueryResult.data;
    if (questionBanksData.code === ResponseCode.OK && questionBanksData.data) {
      const questionBanksPageData = questionBanksData.data;
      questionBanksList = questionBanksPageData.records || [];
    }
    if (questionsData.code === ResponseCode.OK && questionsData.data) {
      const questionsPageData = questionsData.data;
      questionsList = questionsPageData.records || [];
    }
  } catch (e) {
    console.log("获取题库列表异常", e);
  }

  return (
    <main className="home">
      <Flex justify="space-between" align="center">
        <Title level={3}>最新题库</Title>
        <Link href={"/banks"}>查看更多</Link>
      </Flex>
      <QuestionBankList questionBanks={questionBanksList} />

      <Flex
        justify="space-between"
        align="flex-end"
        style={{ marginTop: "36px" }}
      >
        <Title level={3}>最新题目</Title>
        <Link href={"/questions"}>查看更多</Link>
      </Flex>
      <QuestionList questions={questionsList} />
    </main>
  );
}
