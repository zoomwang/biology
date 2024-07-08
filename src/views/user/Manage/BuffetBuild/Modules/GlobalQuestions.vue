<template>
  <BaseDynamicForm ref="formRef" :questions="model.globalQuestions" />
</template>

<script setup >
import { ref, reactive, toRaw, watch, computed } from "vue";
import BaseDynamicForm from './BaseDynamicForm.vue'

const props = defineProps({ model: Array });

const formRef = ref();

function getFormValue() {
  const form = formRef.value.getFormValue()
  return {globalQuestions: form.questions}
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