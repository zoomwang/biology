<template>
  <div>
    <a-row>
      <a-span v-for="item in questionTypeOptions" :key="item.value">
        <a-button type="text" @click="handleQuestionAdd(item.value)">{{
          item.label
        }}</a-button>
      </a-span>
    </a-row>
    <a-form
      ref="formRef"
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
    {{ relOptions }}
      <div v-for="(item, idx) in formState.sampleQuestions" :key="item.id">
        <a-button type="text" @click="handleQuestionRemove(idx)">删除</a-button>
        <DynamicQuestionForm
          :model="item"
          :rel-options="relOptions"
          :type="item.type"
        ></DynamicQuestionForm>
      </div>
    </a-form>
  </div>
</template>
<script setup>
import { ref, reactive, toRaw, watch, computed } from "vue";
import { QUESTION_TYPES } from "@/utils/const";
import DynamicQuestionForm from "@/components/DynamicQuestion/AdminForm/index.vue";
import { genQuestionItem } from "@/components/DynamicQuestion/utils";

const props = defineProps({ model: Object });

const labelCol = { style: { width: "150px" } };
const wrapperCol = {};
const questionTypeOptions = QUESTION_TYPES.toObjectArray();

const formRef = ref();
const formState = reactive({
  sampleQuestions: [],
});

const relOptions = computed(() => {
  return (formState.sampleQuestions || [])
    .filter(item =>
      [QUESTION_TYPES.RADIO, QUESTION_TYPES.CHECKBOX].includes(item.type)
    )
    .filter(item => item.label);
});

watch(
  () => props.model?.sampleQuestions,
  model => {
    setFormValue(model || []);
  },
  { immediate: true }
);

function setFormValue(model) {
  formState.sampleQuestions = model || [];
}
function getFormValue() {
  return toRaw(formState);
}

async function validate() {
  await formRef.value.validate();
  return getFormValue();
}

const handleQuestionAdd = type => {
  const questionItem = genQuestionItem(type)
  formState.sampleQuestions.push(questionItem);
};
const handleQuestionRemove = index => {
  if (index >= 0 && index < formState.sampleQuestions.length) {
    formState.sampleQuestions.splice(index, 1);
  }
};
const handleQuestionMoveUp = () => {};
const handleQuestionMoveDown = () => {};

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
