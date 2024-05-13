<script setup>
import { ref } from 'vue';
import OrderList from "./OrderList.vue"
import SupplierList from "./SupplierList.vue"

const activeKey = ref('1');
const props = defineProps(['id']);
</script>
<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="供应商列表">
      <SupplierList :id="props.id" />
    </a-tab-pane>
    <a-tab-pane key="2" tab="供应商订单列表" force-render>
      <OrderList :id="props.id" />
    </a-tab-pane>
  </a-tabs>
</template>
