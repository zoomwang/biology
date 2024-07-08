<template>
  <BaseDynamicForm ref="formRef" :questions="model.sampleQuestions" :sampleNumberOption="(model.extInfo||{}).sampleNumberOption" showSampleQualtiyAffect />
</template>

<script setup >
import { ref, reactive, toRaw, watch, computed } from "vue";
import BaseDynamicForm from './BaseDynamicForm.vue'

const props = defineProps({ model: Array });

const formRef = ref();

function getFormValue() {
  const form = formRef.value.getFormValue()
  return {sampleQuestions: form.questions, sampleNumberOption: form.sampleNumberOption}
}

async function validate() {
  await formRef.value.validate();
  return getFormValue()
}
defineExpose({
  getFormValue,
  validate,
});
</script>