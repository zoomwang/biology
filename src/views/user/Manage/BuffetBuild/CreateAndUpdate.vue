<template>
  <a-form class="buffet-build-form">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane v-for="item in tabs" :key="item.value" :tab="item.label">
        <component ref="formRef" :is="item.comp" :model="buffetBuildData" />
      </a-tab-pane>
    </a-tabs>
    <a-affix :offset-bottom="20">
      <a-form-item :wrapper-col="{ span: 24 }" style="margin-top: 16px">
        <a-button type="primary" :loading="submitting" @click="onSubmit"
          >保存</a-button
        >
      </a-form-item>
    </a-affix>
  </a-form>
</template>
<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";

import BasicInfo from "./Modules/BasicInfo.vue";
import SampleQuestions from "./Modules/SampleQuestions.vue";
import GlobalQuestions from "./Modules/GlobalQuestions.vue";
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
  { label1: "1", label: "样品问题", value: "SampleQuestions", comp: SampleQuestions },
  { label1: "1", label: "全局问题", value: "GlobalQuestions", comp: GlobalQuestions },
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
  extInfo: {},
});

const getConfig = async () => {
  const { data } = await fetchConfig({ orderTypeId: orderTypeId.value });
  Object.assign(buffetBuildData, data);
};

const onSubmit = async () => {
  try {
    submitting.value = true;
    // const idx = tabs.findIndex(item => item.value === activeKey.value);
    // console.log(formRef.value);

    // const form = await formRef.value[0].validate();
    const form = formRef.value.reduce((sum, item) => {
      Object.assign(sum, item.getFormValue());
      return sum;
    }, {});
    const extInfo = form.extInfo || buffetBuildData.extInfo || {}
    extInfo.sampleNumberOption = form.sampleNumberOption
    delete form.sampleNumberOption
    const { data } = await (isEdit.value
      ? updateConfig({ ...form, extInfo, orderTypeId: orderTypeId.value })
      : createConfig({ ...form, extInfo, orderTypeId: 0 }));
    message.success(isEdit.value ? "修改成功" : "新增成功");

    if (!isEdit.value) {
      await router.replace({
        query: {
          ...route.query,
          typeId: data,
        },
      })
      
    }
    getConfig()
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

<style lang="less">
.ant-menu-root {
  /* display: none; */
}
.buffet-build-form {
  table {
    border-spacing: 0;
    td,th {
      border-width: 1px !important ;
    }
  }
}
</style>
