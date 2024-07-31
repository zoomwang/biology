<template>
  <a-form
    ref="formRef"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="测试项目">
      <Editor
        style="height: 420px"
        v-model:value="formState.testProject"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item label="样品要求">
      <Editor
        style="height: 420px"
        v-model:value="formState.sampleRequirement"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item label="结果展示">
      <Editor
        style="height: 420px"
        v-model:value="formState.resultShow"
        placeholder="请输入"
      />
    </a-form-item>
    <div>
      <a-form-item :colon="false">
        <template v-slot:label>
          <a-button type="primary" @click="handleQuestionAdd">
            添加问题
          </a-button>
        </template>
      </a-form-item>

      <div>
        <a-collapse v-model:activeKey="activeKey">
          <a-collapse-panel
            :key="item.uid"
            :header="`问题${idx + 1}${item.question ? '-' + item.question : ''}`"
            v-for="(item, idx) in formState.qaList"
          >
            <template #extra>
              <DeleteOutlined @click="handleQuestionRemove(idx)" />
            </template>
            <div style="margin-left: -16px">
              <a-form-item label="常见问题">
                <a-input v-model:value="item.question" />
              </a-form-item>
              <a-form-item label="解决方案">
                <Editor
                  style="height: 420px"
                  v-model:value="item.answer"
                  placeholder="请输入注意事项"
                />
              </a-form-item>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
  </a-form>
</template>
<script setup>
import { reactive, toRaw, ref, watch } from "vue";

import Editor from "@/components/Editor.vue";
// import Upload from "@/components/Upload.vue";
import { DeleteOutlined } from "@ant-design/icons-vue";
import {genUid} from '@/utils'

const props = defineProps({ model: Object });

const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };

const genQuestionForm = () => ({
  uid: genUid(),
  question: undefined,
  answer: undefined,
});
const defaultQuestionForm = genQuestionForm();
const activeKey = ref([defaultQuestionForm.uid]);
const formRef = ref();
const formState = reactive({
  testProject: "",
  sampleRequirement: "",
  resultShow: "",
  qaList: [defaultQuestionForm],
});
watch(
  () => props.model?.detailInfo,
  model => {
    if (!model) return;
    const qaList = (model.qaList || []).map(item => {
      return {
        ...item,
        uid: genUid(),
      };
    });
    setFormValue({ ...model, qaList });
    activeKey.value = formState.qaList.map(item => item.uid);
  },
  { immediate: true }
);

function setFormValue(model) {
  Object.assign(formState, model);
}
function getFormValue() {
  return { detailInfo: toRaw(formState) };
}

async function validate() {
  await formRef.value.validate();
  return getFormValue();
}

const handleQuestionAdd = () => {
  const questionForm = genQuestionForm();
  formState.qaList.push(questionForm);
  activeKey.value.push(questionForm.uid);
};
const handleQuestionRemove = idx => {
  const questionForm = formState.qaList.splice(idx, 1);
  activeKey.value = activeKey.value.filter(v => v !== questionForm.uid);
};

defineExpose({
  getFormValue,
  validate,
});
</script>
