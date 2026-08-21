"use client";

import { listQuestionVoByPage } from "@/src/api/questionController";
import { ResponseCode } from "@/src/constant/ResponseCode";
import { debounce } from "@/src/libs/util";
import { AutoComplete, Input } from "antd";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import "./index.css";

/**
 * 搜索条
 */
export default function SearchInput() {
  const router = useRouter();
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );
  const [searchVal, setSearchVal] = useState<string>("");

  const handleSearch = async (value: string) => {
    if (!value) return;
    try {
      const searchResponse = await listQuestionVoByPage({
        searchText: value,
        pageNum: 1,
        pageSize: 12,
      });
      const searchResult = searchResponse.data;
      if (searchResult.code === ResponseCode.OK && searchResult.data) {
        const searchData = searchResult.data;
        const questionRecords = searchData.records || [];
        const searchOptions = questionRecords.map((question) => {
          return {
            value: String(question.id) || "",
            label: question.title?.slice(0, 20) || "",
          };
        });
        setOptions(searchOptions);
      }
    } catch (e) {
      console.log("题目出现异常", e);
    }
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);

  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        height: 44,
        alignItems: "center",
      }}
    >
      <AutoComplete
        options={options}
        popupMatchSelectWidth
        placeholder="搜索题目"
        value={searchVal}
        onChange={(e) => {
          setSearchVal(e);
          debouncedSearch(e);
        }}
        onSelect={(value) => {
          const option = options.find((item) => item.value === value);
          setSearchVal(option?.label || "");
        }}
      >
        <Input.Search
          onSearch={(value) => {
            router.push(`/questions?q=${value}`);
          }}
        />
      </AutoComplete>
    </div>
  );
}
