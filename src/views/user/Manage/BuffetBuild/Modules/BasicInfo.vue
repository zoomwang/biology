<template>
  <a-form ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
    <a-form-item name="deviceName" label="设备名称">
      <a-input placeholder="请输入" v-model:value="formState.deviceName" />
    </a-form-item>
    <a-form-item name="deviceAliases" label="设备别名">
      <a-input placeholder="请输入" v-model:value="formState.deviceAliases" />
    </a-form-item>
    <a-form-item name="deviceModel" label="设备型号">
      <a-input placeholder="请输入" v-model:value="formState.deviceModel" />
    </a-form-item>
    <a-form-item name="brand" label="品牌">
      <a-input placeholder="请输入" v-model:value="formState.brand" />
    </a-form-item>
    <a-form-item label="类别">
      <a-checkbox-group v-model:value="formState.categorys" v-if="0">
        <div v-for="(subCategorys, category) in DETECT_CATEGORY_TYPES" :key="category">
          <a-checkbox :value="category"> {{ category }}: </a-checkbox>
          <a-checkbox-group v-model:value="formState.subCategorys[category]">
            <a-checkbox v-for="subCategory in subCategorys" :key="subCategory" :value="subCategory">
              {{ subCategory }}
            </a-checkbox>
          </a-checkbox-group>
        </div>
      </a-checkbox-group>
      <a-tree-select v-model:value="formState.projectType" show-search style="width: 100%"
        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }" placeholder="请选择" allow-clear tree-default-expand-all
        :tree-data="projectTypeTree" tree-node-filter-prop="title" :field-names="{
          children: 'children',
          value: 'value',
          label: 'title',
        }">
      </a-tree-select>
    </a-form-item>
    <a-form-item name="pictureUrl" label="列表图">
      <Upload v-model:value="formState.pictureUrl" :max-count="1"></Upload>
    </a-form-item>
    <a-form-item name="deviceSuperintendent" label="设备总负责人">
      <a-input placeholder="请输入" v-model:value="formState.deviceSuperintendent" />
    </a-form-item>
    <a-form-item name="notificationEmail" label="下单通知邮箱">
      <a-input placeholder="请输入" v-model:value="formState.notificationEmail" />
    </a-form-item>
    <a-form-item name="attention" label="注意事项">
      <Editor style="height: 500px;" v-model:value="formState.attention" placeholder="请输入注意事项" />
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive, toRaw, ref, onMounted, watch } from "vue";
import { DETECT_CATEGORY_TYPES } from "@/utils/const";
// import { supplierList } from '@/services/supplier'
import Editor from "@/components/Editor.vue";
import Upload from "@/components/Upload.vue";

const props = defineProps({ model: Object })


const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };
// const userList = ref([]);
const projectTypeTree = ref([])

const formRef = ref();
const formState = reactive({
  deviceName: undefined,
  deviceAliases: undefined,
  types: undefined,
  brand: undefined,
  pictureUrl: undefined,
  deviceSuperintendent: undefined,
  notificationEmail: undefined,
  attention: undefined,
  // categorys: [],
  // subCategorys: {}
});
const rules = {
  deviceName: [{ required: true, message: '必填项', trigger: 'change' }],
}

watch(() => props.model, (model) => {
  setFormValue(model)
}, { immediate: true })


function setFormValue(model) {
  Object.assign(formState, model)

}
function getFormValue() {
  return { baseInfo: toRaw(formState) }
}

async function validate() {
  await formRef.value.validate()
  return getFormValue()
}

defineExpose({
  getFormValue,
  validate,
})
// const getUserList = async () => {
//   const params = {
//     curPage: 1,
//     pageSize: 999,
//   }
//   const {data} = await supplierList(params)
//   userList.value = (data.list||[]).map(item => {
//     return {
//       label: item.supplierName,
//       value: item.supplierId,
//     }
//   })
// }

const getProjectTypeTree = async () => {
  projectTypeTree.value = [
    {
      title: '高端测试',
      value: 2,
      selectable: false,
      children: [
        {
          title: '同步辐射类',
          value: 1501,
        },
        {
          title: '高端电镜类',
          value: 1502,
        },
        {
          title: '高端原位类',
          value: 1503,
        },
        {
          title: '高端质谱',
          value: 1504,
        },
      ],
    },
  ]
}

onMounted(() => {
  // getUserList()
  getProjectTypeTree()
})
</script>
