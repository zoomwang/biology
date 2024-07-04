<template>
  <div style="margin-top: 12px;">
    <a-space-compact block>
      <a-button
        v-for="item in questionTypeOptions"
        :key="item.value"
        @click="handleQuestionAdd(item.value)"
      >
        {{ item.label }}
      </a-button>
    </a-space-compact>
    <a-form
      style="margin-top: 16px"
      ref="formRef"
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel
          v-for="(item, idx) in formState.questions"
          :key="item.id"
          :header="`问题${idx + 1} - ${QUESTION_TYPES.get(item.type)}${
            item.label ? ' - ' + item.label : ''
          }`"
        >
          <template #extra>
            <a-space>
              <DoubleRightOutlined
                :rotate="-90"
                :disabled="idx === 0"
                @click.stop="handleQuestionMoveUp(idx)"
              />
              <DoubleRightOutlined
                :rotate="90"
                :disabled="idx === formState.questions.length - 1"
                @click.stop="handleQuestionMoveDown(idx)"
              />
              <DeleteOutlined @click.stop="handleQuestionRemove(idx)" />
            </a-space>
          </template>
          <div style="margin-left: -16px">
            <DynamicQuestionForm
              :model="item"
              :rel-options="relOptions"
              :type="item.type"
            ></DynamicQuestionForm>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </a-form>
  </div>
</template>
<script setup>
import { ref, reactive, toRaw, watch, computed } from "vue";
import { QUESTION_TYPES } from "@/utils/const";
import DynamicQuestionForm from "@/components/DynamicQuestion/AdminForm/index.vue";
import { genQuestionItem } from "@/components/DynamicQuestion/utils";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons-vue";

const props = defineProps({ model: Array });

const activeKey = ref([]);

const labelCol = { style: { width: "150px" } };
const wrapperCol = {};
const questionTypeOptions = QUESTION_TYPES.toObjectArray();

const formRef = ref();
const formState = reactive({
  questions: [],
});

const relOptions = computed(() => {
  return (formState.questions || [])
    .filter(item =>
      [QUESTION_TYPES.RADIO, QUESTION_TYPES.CHECKBOX].includes(item.type)
    )
    .filter(item => item.label);
});

watch(
  () => props.model,
  model => {
    setFormValue(model || []);
    activeKey.value = (model || []).map(item => item.id);
  },
  { immediate: true }
);

function setFormValue(model) {
  formState.questions = model || [];
}
function getFormValue() {
  return formState.questions;
}

async function validate() {
  await formRef.value.validate();
  return getFormValue();
}

const handleQuestionAdd = type => {
  const questionItem = genQuestionItem(type);
  formState.questions.push(questionItem);
  activeKey.value.push(questionItem.id);
};
const handleQuestionRemove = index => {
  const questionItem = formState.questions[index];
  if (index >= 0 && index < formState.questions.length) {
    formState.questions.splice(index, 1);
  }
  activeKey.value = activeKey.value.filter(key => key !== questionItem.id);
};
const handleQuestionMoveUp = idx => {
  const items = formState.questions;
  // 确保索引在有效范围内
  if (idx > 0 && idx < items.length) {
    // 交换当前元素和上一个元素
    let temp = items[idx];
    items[idx] = items[idx - 1];
    items[idx - 1] = temp;
  }
};
const handleQuestionMoveDown = idx => {
  const items = formState.questions;
  // 确保索引在有效范围内，且不是最后一个元素
  if (idx >= 0 && idx < items.length - 1) {
    // 交换当前元素和下一个元素
    let temp = items[idx];
    items[idx] = items[idx + 1];
    items[idx + 1] = temp;
  }
};

defineExpose({
  getFormValue,
  validate,
});
</script>

<style scoped lang="scss">
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.inner-form-item {
  &::v-deep {
    .ant-form-item-label {
      padding-top: 4px;
      padding-bottom: 0;
      margin-right: 8px;
      width: 4em;
      min-width: 4em !important;
    }
  }
}
</style>
