"use client";

import { Card } from "antd";
import Title from "antd/es/typography/Title";
import TagList from "../TagList";
import MdViewer from "../MdView";

export interface QuestionCardProps {
  questionDetail?: API.QuestionVO;
}

export default function QuestionCard(props: QuestionCardProps) {
  const { questionDetail } = props;

  return (
    <div>
      <Card>
        <Title level={1}>{questionDetail?.title}</Title>
        <TagList tagList={questionDetail?.tagList || []} />
        <div style={{ marginTop: 12 }}>
          <MdViewer value={questionDetail?.content} />
        </div>
      </Card>
      <Card title="推荐答案" style={{ marginTop: 36 }}>
        <MdViewer value={questionDetail?.answer} />
      </Card>
    </div>
  );
}
