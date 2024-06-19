<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    {{ formState }}
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
      <a-radio-group v-model:value="formState.resource">
        <a-radio value="1">Sponsor</a-radio>
        <a-radio value="2">Venue</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="设备总负责人">
      <a-select v-model:value="formState.resource" :options="userList">
      </a-select>
    </a-form-item>
    <a-form-item label="下单通知邮箱">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="注意事项">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px">Cancel</a-button>
    </a-form-item>
  </a-form>
</template>
<script  setup>
import { reactive, toRaw } from "vue";
import { DETECT_CATEGORY_TYPES } from "@/utils/const";
const userList = reactive([
  {label: '张总', value: '张总'},
  {label: '张总1', value: '张总1'},
])
const formState = reactive({
  name: "",
  delivery: false,
  categorys: [],
  subCategorys: {},
  resource: "",
  desc: "",
});
const onSubmit = () => {
  console.log("submit!", toRaw(formState));
};
const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };
</script>

