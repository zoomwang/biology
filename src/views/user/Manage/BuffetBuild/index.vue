<template>
  <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane v-for="item in tabs" :key="item.value" :tab="item.label">
      <component :is="item.comp" />
    </a-tab-pane>
  </a-tabs>
</template>
<script setup>
import { ref } from "vue";
import BasicInfo from "./Modules/BasicInfo.vue";
import Form1 from "./Modules/Form1.vue";
import Form2 from "./Modules/Form2.vue";
import DetailSetting from "./Modules/DetailSetting.vue";
const tabs = [
  { label: "基础信息", value: "BasicInfo", comp: BasicInfo },
  { label: "下单页面一", value: "form1", comp: Form1 },
  { label: "下单页面二", value: "form2", comp: Form2 },
  { label: "详细设置", value: "detailSetting", comp: DetailSetting },
];
const activeKey = ref(tabs[0].value);
</script>

