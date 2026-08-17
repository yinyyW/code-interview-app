"use client";

import { Avatar, Card, Col, Row, Typography } from "antd";
import { useRouter } from "next/navigation";

export interface QuestionBankListProps {
  questionBanks: API.QuestionBankVO[];
}

export default function QuestionBankList(props: QuestionBankListProps) {
  const { questionBanks } = props;
  const router = useRouter();

  return (
    <>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        {questionBanks.map((questionBank) => (
          <Col
            key={questionBank.id}
            className="gutter-row"
            span={6}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            onClick={() => {
              router.push(`/bank/${questionBank.id}`);
            }}
          >
            <Card hoverable>
              <Card.Meta
                title={questionBank.title}
                description={
                  <Typography.Paragraph type="secondary" ellipsis={{ rows: 1 }}>
                    {questionBank.description}
                  </Typography.Paragraph>
                }
                avatar={<Avatar size="small" src={questionBank.picture} />}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
