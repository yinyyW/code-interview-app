package com.code.interview.model.enums;

import cn.hutool.core.util.ObjUtil;

public enum QuestionBankPriorityEnum {
    NORMAL("普通题库", 0),
    GOOD("优选题库", 99);

    private final String text;

    private final int value;

    QuestionBankPriorityEnum(String text, int value) {
        this.text = text;
        this.value = value;
    }

    /**
     * 根据 value 获取枚举
     *
     * @param value 枚举值的value
     * @return 枚举值
     */
    public static QuestionBankPriorityEnum getEnumByValue(int value) {
        for (QuestionBankPriorityEnum anEnum : QuestionBankPriorityEnum.values()) {
            if (anEnum.value == value) {
                return anEnum;
            }
        }
        return null;
    }

    public static int getValue(QuestionBankPriorityEnum priorityEnum) {
        return priorityEnum.value;
    }
}
