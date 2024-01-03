<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive,defineComponent } from "vue";
import { isLogged } from "../../services/user";
import FinalStep from "../process/components/FinalStep.vue";

const drawerVisible = ref(false);
const showDrawer = () => {
  drawerVisible.value = true;
};
const visible = ref(false);
const showModal = () => {
  visible.value = true;
};
const handleOk = e => {
  console.log(e);
  visible.value = false;
};
const columns = [
  {
    title: '项目名称',
    dataIndex: 'name',
  },
  {
    title: '下单时间',
    className: 'column-money',
    dataIndex: 'time',
  },
  {
    title: '订单号',
    dataIndex: 'orderId',
  },
  {
    title: '实付款',
    dataIndex: 'money',
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    slots: {
      customRender: 'status',
    },
  },
  {
    title: '发票状态',
    dataIndex: 'ticketStatus',
    slots: {
      customRender: 'ticketStatus',
    },
  },
  {
    title: '操作',
    key: 'action',
    slots: {
      customRender: 'action',
    },
  },
];
const data = [
  {
    name: 'John Brown',
    time: "2023-12-28",
    orderId: '23231321',
    money: 123,
    status: 0,
    ticketStatus: 0,
  },
  {
    name: 'John Brown',
    time: "2023-12-28",
    orderId: '23231321',
    money: 123,
    status: 1,
    ticketStatus: 1,
  },
]

</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="全部订单"></a-tab-pane>
      <a-tab-pane key="2" tab="待支付" force-render></a-tab-pane>
      <a-tab-pane key="3" tab="已完成"></a-tab-pane>
    </a-tabs>
    <a-table :columns="columns" :data-source="data" bordered>
      <template #status="{ text }">
        <span>
          {{["待支付", "已取消"][text]}}
        </span>
      </template>
      <template #ticketStatus="{ text }">
        <span>
          {{["无需开票", "无", "待申请"][text]}}
        </span>
      </template>
      <template #action="{ record }">
        <!-- <space> -->
          <a-button style="margin-bottom: 5px" type="primary" @click="showDrawer">立即支付</a-button>
          <br />
          <a-button style="margin-bottom: 5px" type="text">取消订单</a-button>
          <br />
          <a-button type="text" @click="showModal">订单详情</a-button>
        <!-- </space> -->
      </template>
    </a-table>
  </main>
  <a-modal v-model:visible="visible" title="订单详情" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
  <a-drawer
    title="订单详情"
    placement="right"
    :closable="false"
    width="70%"
    v-model:visible="drawerVisible"
    :after-visible-change="afterVisibleChange"
  >
    <FinalStep :cost="{
      '支付金额': 1111,
      '订单金额': 360,
      '样品回收费': 0,
      '运费': 12
    }" :orderId="1212121" />
  </a-drawer>
</template>
<style lang="scss">

</style>