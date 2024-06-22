<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <div style="word-wrap: break-word;white-space:pre-wrap; ">
    {{ formState }}
  </div>
    <a-form-item label="设备信息">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="设备别名">
      <a-input v-model:value="formState.alias" />
    </a-form-item>
    <a-form-item label="设备型号">
      <a-input v-model:value="formState.types" />
    </a-form-item>
    <a-form-item label="品牌">
      <a-input v-model:value="formState.brand" />
    </a-form-item>
    <a-form-item label="类别">
      <a-checkbox-group v-model:value="formState.categorys">
        <div
          v-for="(subCategorys, category) in DETECT_CATEGORY_TYPES"
          :key="category"
        >
          <a-checkbox :value="category"> {{ category }}: </a-checkbox>
          <a-checkbox-group v-model:value="formState.subCategorys[category]">
            <a-checkbox
              v-for="subCategory in subCategorys"
              :key="subCategory"
              :value="subCategory"
            >
              {{ subCategory }}
            </a-checkbox>
          </a-checkbox-group>
        </div>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="列表图">
      <Upload v-model:value="formState.listPic" :max-count="3"></Upload>
    </a-form-item>
    <a-form-item label="设备总负责人">
      <a-select v-model:value="formState.resource" :options="userList">
      </a-select>
    </a-form-item>
    <a-form-item label="下单通知邮箱">
      <a-input v-model:value="formState.email" />
    </a-form-item>
    <a-form-item label="注意事项">
      <Editor style="height: 500px;" v-model:value="formState.notify" placeholder="请输入注意事项" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px">Cancel</a-button>
    </a-form-item>
  </a-form>
</template>
<script  setup>
import { reactive, toRaw, ref } from "vue";
import { DETECT_CATEGORY_TYPES } from "@/utils/const";
import Editor from "@/components/Editor.vue";
import Upload from "@/components/Upload.vue";
const userList = reactive([
  { label: "张总", value: "张总" },
  { label: "张总1", value: "张总1" },
]);
const formState = reactive({
  name: "",
  delivery: false,
  categorys: [],
  subCategorys: {},
  resource: "",
  desc: "",
  email: "",
  notify: "",
  listPic: ['https://etest-oss.oss-cn-beijing.aliyuncs.com/20240623/xps656_6531_52f68dec4e4202247f184d71bc40b9c4.png'],
});
const onSubmit = () => {
  console.log("submit!", toRaw(formState));
};
const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };

const fileList = ref([
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-xxx',
    percent: 50,
    name: 'image.png',
    status: 'uploading',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-5',
    name: 'image.png',
    status: 'error',
  },
]);
</script>

