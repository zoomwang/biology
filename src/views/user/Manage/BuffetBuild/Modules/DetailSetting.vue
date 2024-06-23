<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    {{ formState }}
    <a-form-item label="测试项目">
      <Editor
        style="height: 320px"
        v-model:value="formState.notify"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item label="样品要求">
      <Editor
        style="height: 320px"
        v-model:value="formState.notify"
        placeholder="请输入"
      />
    </a-form-item>
    <a-form-item label="结果展示">
      <Editor
        style="height: 320px"
        v-model:value="formState.notify"
        placeholder="请输入注意事项"
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
            :header="`问题${idx + 1}`"
            v-for="(item, idx) in formState.questions"
          >
            <template #extra>
              <DeleteOutlined @click="handleQuestionRemove(idx)" />
            </template>
            <div style="margin-left: -16px">
              <a-form-item label="常见问题">
                <a-input v-model:value="item.problem" />
              </a-form-item>
              <a-form-item label="解决方案">
                <Editor
                  style="height: 320px"
                  v-model:value="item.solution"
                  placeholder="请输入注意事项"
                />
              </a-form-item>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px">Cancel</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive, toRaw, ref } from "vue";
import { DETECT_CATEGORY_TYPES } from "@/utils/const";
import Editor from "@/components/Editor.vue";
import Upload from "@/components/Upload.vue";
import { DeleteOutlined } from "@ant-design/icons-vue";

const genQuestionForm = () => ({
  uid: Date.now(),
  problem: undefined,
  solution: undefined,
});
const defaultQuestionForm = genQuestionForm();
const formState = reactive({
  name: "",
  delivery: false,
  categorys: [],
  subCategorys: {},
  resource: "",
  desc: "",
  email: "",
  notify: "",
  listPic: [
    "https://etest-oss.oss-cn-beijing.aliyuncs.com/20240623/xps656_6531_52f68dec4e4202247f184d71bc40b9c4.png",
  ],
  questions: [defaultQuestionForm],
});
const activeKey = ref([defaultQuestionForm.uid]);

const handleQuestionAdd = () => {
  const questionForm = genQuestionForm();
  formState.questions.push(questionForm);
  activeKey.value.push(questionForm.uid);
};
const handleQuestionRemove = idx => {
  const questionForm = formState.questions.splice(idx, 1);
  activeKey.value = activeKey.value.filter(v => v !== questionForm.uid);
};
const onSubmit = () => {
  console.log("submit!", toRaw(formState));
};
const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };
</script>
