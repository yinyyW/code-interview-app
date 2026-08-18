import { getQuestionVoById } from "@/src/api/questionController";
import QuestionCard from "@/src/components/QuestionCard";
import "./index.css";

export default async function Question({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {
  const { questionId } = await params;
  let questionDetail: API.QuestionVO = {};

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
    <div className="question-detail">
      <QuestionCard questionDetail={questionDetail} />
    </div>
  );
}
