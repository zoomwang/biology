<template>
  <a-form>
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane v-for="item in tabs" :key="item.value" :tab="item.label">
        <component ref="formRef" :is="item.comp" :model="buffetBuildData" />
      </a-tab-pane>
    </a-tabs>
    <a-form-item :wrapper-col="{ span: 24 }" style="margin-top: 16px">
      <a-button type="primary" :loading="submitting" @click="onSubmit"
        >保存</a-button
      >
    </a-form-item>
  </a-form>
</template>
<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";

import BasicInfo from "./Modules/BasicInfo.vue";
import Form1 from "./Modules/Form1.vue";
import Form2 from "./Modules/Form2.vue";
import DetailSetting from "./Modules/DetailSetting.vue";
import {
  createConfig,
  updateConfig,
  fetchConfig,
} from "@/services/buffet-build";
const route = useRoute();
const router = useRouter();

// const props = defineProps({
//   orderTypeId: String,
// });
const orderTypeId = computed(() => route.query.typeId);

const isEdit = computed(() => !!orderTypeId.value);

const formRef = ref();
const submitting = ref(false);
const tabs = [
  { label1: "1", label: "基础信息", value: "BasicInfo", comp: BasicInfo },
  { label1: "1", label: "下单页面一", value: "form1", comp: Form1 },
  { label1: "1", label: "下单页面二", value: "form2", comp: Form2 },
  {
    label1: "1",
    label: "详细设置",
    value: "detailSetting",
    comp: DetailSetting,
  },
];
const activeKey = ref(tabs[0].value);
const buffetBuildData = reactive({
  baseInfo: {},
});

const getConfig = async () => {
  const { data } = await fetchConfig({ orderTypeId: orderTypeId.value });
  Object.assign(buffetBuildData, data);
};

const onSubmit = async () => {
  try {
    submitting.value = true;
    const idx = tabs.findIndex(item => item.value === activeKey.value);
    console.log(formRef.value);

    // const form = await formRef.value[0].validate();
    const form = formRef.value.reduce((sum, item) => {
      Object.assign(sum, item.getFormValue());
      return sum;
    }, {});
    const { data } = await (isEdit.value
      ? updateConfig({ ...form, orderTypeId: orderTypeId.value })
      : createConfig({ ...form, orderTypeId: 0 }));
    message.success(isEdit.value ? "修改成功" : "新增成功");

    if (!isEdit.value) {
      router.replace({
        query: {
          ...route.query,
          typeId: data,
        },
      });
    }
  } catch (error) {
    console.error("submit error", error);
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  if (isEdit.value) {
    getConfig();
  }
});
</script>

<style>
.ant-menu-root {
  /* display: none; */
}
</style>
