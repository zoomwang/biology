<script setup>
import { ref } from 'vue';
import OrderList from "./OrderList.vue"
import PointsList from "./PointsList.vue"
import UserInfo from "./Userinfo.vue"
import PrestoreList from "./PrestoreList.vue"

const activeKey = ref('0');
const props = defineProps(['id', "username"]);
</script>
<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="0" tab="用户信息">
      <UserInfo :id="props.id" :username="props?.username" />
    </a-tab-pane>
    <a-tab-pane key="1" tab="订单情况" force-render>
      <OrderList :id="props.id" />
    </a-tab-pane>
    <a-tab-pane key="2" tab="积分情况">
      <PointsList :id="props.id" />
    </a-tab-pane>
    <a-tab-pane key="3" tab="预存情况">
      <PrestoreList :id="props.id" />
    </a-tab-pane>
  </a-tabs>
</template>
