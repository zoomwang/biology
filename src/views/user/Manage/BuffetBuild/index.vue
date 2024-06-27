<template>
  <a-form>
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane v-for="item in tabs" :key="item.value" :tab="item.label">
        <component ref="formRef" :is="item.comp" :model="BuffetBuildData.baseInfo" />
      </a-tab-pane>
    </a-tabs>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" :loading="submitting" @click="onSubmit">保存</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive, ref } from "vue";
import BasicInfo from "./Modules/BasicInfo.vue";
import Form1 from "./Modules/Form1.vue";
import Form2 from "./Modules/Form2.vue";
import DetailSetting from "./Modules/DetailSetting.vue";
import { updateConfig } from '@/services/buffet-build'

const formRef = ref()
const submitting = ref(false)
const tabs = [
  { label: "基础信息", value: "BasicInfo", comp: BasicInfo },
  { label: "下单页面一", value: "form1", comp: Form1 },
  { label: "下单页面二", value: "form2", comp: Form2 },
  { label: "详细设置", value: "detailSetting", comp: DetailSetting },
];
const activeKey = ref(tabs[0].value);
const BuffetBuildData = reactive({
  baseInfo: { "deviceName": "s", "deviceAliases": "r", "brand": "r", "pictureUrl": "https://etest-oss.oss-cn-beijing.aliyuncs.com/20240627/微信截图_20240627230411_83686_fa5f3db097724696b4fc8ac4d9b68b9b.png", "deviceSuperintendent": "2", "notificationEmail": "2", "attention": "<p>222</p>", "deviceModel": "r", "projectType": 1501, "orderTypeId": 1501 }
})

const onSubmit = async () => {
  console.log(formRef.value[0])
  try {
    submitting.value = true
    const form = await formRef.value[0].validate()
    await updateConfig({ ...form, orderTypeId: 1501 })
  } catch (error) {

  } finally {
    submitting.value = false
  }
}
</script>
