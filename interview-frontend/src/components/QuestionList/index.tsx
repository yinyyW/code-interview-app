"use client";

import { Card, Flex, Listy } from "antd";
import Link from "next/link";
import "./index.css";
import TagList from "../TagList";

export interface QuestionListProps {
  questions: API.QuestionVO[];
}

export default function QuestionList(props: QuestionListProps) {
  const { questions } = props;

  return (
    <Card className="question-list">
      <Flex vertical align="flex-end">
        <Listy
          rowKey="id"
          items={questions}
          style={{ width: "100%" }}
          itemRender={(item, idx) => (
            <Flex justify="space-between" align="center">
              <Link href={`/question/${item.id}`}>
                {idx + 1}. {item.title}
              </Link>
              <TagList tagList={item.tagList || []} />
            </Flex>
          )}
        />
      </Flex>
    </Card>
  );
}
