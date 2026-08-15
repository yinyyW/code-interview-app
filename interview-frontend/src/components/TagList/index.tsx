import { Flex, Tag } from "antd";

export interface TagListProps {
  tagList: string[];
}

export default function TagList(props: TagListProps) {
  const { tagList } = props;

  return (
    <Flex className="tag-list" gap="small" wrap={false}>
      {tagList?.map((tag) => (
        <Tag key={tag} color={"#f50"}>
          {tag}
        </Tag>
      ))}
    </Flex>
  );
}
