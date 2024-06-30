import EnumOptions from "./enum-options";
export const DETECT_CATEGORY_TYPES = {
  材料加工: ["加热/加湿/干燥", "制膜", "环境试验箱", "其他"],
  力学性能: ["拉压折弯", "微观力学", "冲击"],
  声光电磁: ["电学", "磁学", "光学", "声学"],
  热学性能: ["热分析类", "燃烧类", "其他"],
  物理性能: [
    "吸附类",
    "粒度/颗粒/粉末分析",
    "流变/粘度类",
    "硬度/密度/厚度",
    "行业专用",
    "其他",
  ],
  组织形貌: ["电镜类", "显微镜类"],
  成分含量: ["分子组成", "元素含量", "特定成分", "其他含量"],
  结构组成: ["光谱类", "色谱质谱", "晶体结构", "X射线类", "其他"],
  其他: ["云现场", "原位测试"],
};

export const PRICE_MODE_TYPES = new EnumOptions([
  [1, '自动计算价格', 'AUTO_CALC', ''],
  [2, '自填/报价', 'CONSUMER_PRICE', '用户可以自填后交付，也可以等经理报价后支付'],
  [3, '经理报价', 'MANAGER_PRICE', '必须由经理报价后才能支付'],
], 'value,label,alias,desc')

export const ORDER_QUESTION_TYPES = new EnumOptions([
  [0, '是否需要回收', 'HAS_NEED_RECYCLE'],
  [1, '实验有问题联系谁', 'HAS_QUESTION'],
  [2, '是否需要同设备', 'HAS_NEED_SAME_DEVICE'],
], 'value,label,alias')

export const PICKUP_SAMPLE_TYPES = new EnumOptions([
  [0, '自行寄样/上门取件/自己送样'],
  [1, '询问护送方式：您的样式是否需要低温寄送'],
], 'value,label')

export const QUESTION_TYPES = new EnumOptions([
  [1, '单选问题', 'RADIO'],
  [2, '多选问题', 'CHECKBOX'],
  [3, '单行填空问题', 'TEXT'],
  [4, '多行填空问题', 'TEXTAREA'],
  [5, '区间填空问题', 'RANGE'],
  [6, '下拉问题', 'SELECT'],
  [7, '文件上传', 'FILE'],
  [8, '富文本编辑框', 'RICH_TEXT'],
], 'value,label')

export const VALUE_MODE_TYPES = new EnumOptions([
  ['placeholder', '提示文字（键入消失）', 'PLACEHOLDER'],
  ['defaultValue', '初始内容（键入保留）', 'DEFAULT_VALUE'],
], 'value,label')

export const VALUE_TYPES = new EnumOptions([
  [1, '整数', 'INTEGER'],
  [2, '小数', 'DECIMAL'],
  [3, '字符', 'STRING'],
], 'value,label') 