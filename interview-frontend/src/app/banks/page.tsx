"use server";

import { listQuestionBankVoByPage } from "@/src/api/questionBankController";
import QuestionBankList from "@/src/components/QuestionBankList";
import { ResponseCode } from "@/src/constant/ResponseCode";
import "./index.css";

export default async function Banks() {
  let questionBanksList: API.QuestionBankVO[] = [];

  // 获取题库列表
  try {
    const queryQuestionBanksParam: API.QuestionBankQueryRequest = {
      pageNum: 1,
      pageSize: 200,
    };
    const questionBanksQueryResult = await listQuestionBankVoByPage(
      queryQuestionBanksParam,
    );
    const questionBanksData = questionBanksQueryResult.data;
    if (questionBanksData.code === ResponseCode.OK && questionBanksData.data) {
      const questionBanksPageData = questionBanksData.data;
      questionBanksList = questionBanksPageData.records || [];
    }
  } catch (e) {
    console.log("获取题库列表异常", e);
  }

  return (
    <div className="banks">
      <QuestionBankList questionBanks={questionBanksList} />
    </div>
  );
}
