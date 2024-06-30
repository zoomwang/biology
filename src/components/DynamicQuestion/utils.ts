import EnumOptions from "@/utils/enum-options";
import {genUid} from "@/utils";

export const QUESTION_TYPES = new EnumOptions(
  [
    [1, "单选问题", "RADIO"],
    [2, "多选问题", "CHECKBOX"],
    [3, "单行填空问题", "TEXT"],
    [4, "多行填空问题", "TEXTAREA"],
    [5, "区间填空问题", "RANGE"],
    [6, "下拉问题", "SELECT"],
    [7, "文件上传", "FILE"],
    [8, "富文本编辑框", "RICH_TEXT"],
  ],
  "value,label"
);

export const VALUE_TYPES = new EnumOptions(
  [
    [1, "整数", "INTEGER"],
    [2, "小数", "DECIMAL"],
    [3, "字符", "STRING"],
  ],
  "value,label"
);

export const VALUE_MODE_TYPES = new EnumOptions(
  [
    ["placeholder", "提示文字（键入消失）", "PLACEHOLDER"],
    ["defaultValue", "初始内容（键入保留）", "DEFAULT_VALUE"],
  ],
  "value,label"
);

type ValueMode = (typeof VALUE_MODE_TYPES)[keyof typeof VALUE_MODE_TYPES];
type QuestionType = (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];

export interface Option {
  id: string;
  label?: string;
  price?: number;
  required: boolean;
  checked: boolean;
  isPriceMode: boolean;
}

export interface QuestionItem {
  id: string;
  price?: number;
  type: QuestionType;
  label: string;
  required: boolean;
  dep: {
    depId: string;
    value: string;
  };
  options?: Option[];
  valueMode: ValueMode;
  defaultValue: string;
  placeholder: string;
  minValue?: number;
  maxValue?: number;
  templateFile: string;
  fileAccessExt: string;
}

export const genOption = (): Option => {
  return {
    id: genUid(),
    label: undefined,
    price: undefined,
    required: false,
    checked: false,
    isPriceMode: false,
  };
};

export const genQuestionItem = (type: QuestionType): QuestionItem => {
  return {
    id: genUid(),
    price: undefined,
    type: type,
    label: "",
    required: false,
    dep: {
      depId: "",
      value: "",
    },
    options: [
      QUESTION_TYPES.RADIO,
      QUESTION_TYPES.CHECKBOX,
      QUESTION_TYPES.SELECT,
    ].includes(type)
      ? [genOption()]
      : undefined,
    valueMode: VALUE_MODE_TYPES.PLACEHOLDER,
    defaultValue: "",
    placeholder: "",
    minValue: undefined,
    maxValue: undefined,
    templateFile: "",
    fileAccessExt: "",
  };
};
