"use client";

import { listQuestionVoByPage } from "@/src/api/questionController";
import { ResponseCode } from "@/src/constant/ResponseCode";
import {
  ProColumns,
  ProFormInstance,
  ProTable,
} from "@ant-design/pro-components";
import Link from "next/link";
import "./index.css";
import TagList from "../TagList";
import { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 12;

export interface QuestionTableProps {
  defaultQuestions?: API.QuestionVO[];
  defaultTotal?: number;
  defaultSearchText?: string;
}

export default function QuestionTable(props: QuestionTableProps) {
  const { defaultQuestions, defaultTotal, defaultSearchText } = props;
  const [init, setInit] = useState<boolean>(true);
  const formRef = useRef<ProFormInstance | undefined>(undefined);

  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "搜索",
      dataIndex: "searchText",
      valueType: "text",
      hideInTable: true,
    },
    {
      title: "题目",
      dataIndex: "title",
      render: (_, question) => {
        return (
          <Link key={question.id} href={`/question/${question.id}`}>
            {question.title}
          </Link>
        );
      },
    },
    {
      title: "标签",
      dataIndex: "tagList",
      valueType: "select",
      width: "160px",
      fieldProps: {
        mode: "tags",
      },
      render: (_, question) => {
        return <TagList tagList={question.tagList || []} />;
      },
    },
  ];

  useEffect(() => {
    const searchText = defaultSearchText || "";
    if (searchText) {
      formRef.current?.setFieldsValue({
        searchText,
      });
    }
  }, [defaultSearchText]);

  return (
    <div className="questions-table">
      <ProTable<API.QuestionVO>
        rowKey="key"
        columns={columns}
        formRef={formRef}
        search={{
          labelWidth: "auto",
        }}
        form={{
          initialValues: {
            searchText: defaultSearchText || "",
          },
        }}
        pagination={{
          pageSize: PAGE_SIZE,
        }}
        request={async (params, sort, filter) => {
          // console.log(
          //   `request starts: ${JSON.stringify(params)}, ${JSON.stringify(sort)}, ${JSON.stringify(filter)}`,
          // );
          if (init) {
            setInit(false);
            if (defaultQuestions && defaultTotal) {
              return {
                success: true,
                data: defaultQuestions,
                total: defaultTotal,
              };
            }
          }
          const questionsQueryResult = await listQuestionVoByPage({
            pageNum: params.current || 1,
            pageSize: PAGE_SIZE,
          });
          const questionsData = questionsQueryResult.data;
          const questionsPageData = questionsData.data;
          return {
            success: questionsData.code === ResponseCode.OK,
            data: questionsPageData?.records,
            total: questionsPageData?.total,
          };
        }}
      />
    </div>
  );
}
