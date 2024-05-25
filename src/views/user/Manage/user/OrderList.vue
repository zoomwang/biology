<script setup>
// import TheWelcome from '@/components/Wx.vue';
import {
  ref,
  reactive,
  onMounted,
} from "vue";
import {
  getOrderList
} from "../../../../services/manage";
import {formatTime} from "@/utils/index";
import FinalStep from "../../../process/components/FinalStep.vue";
import {
  getOrderInfo,
} from "@/services/process";
const props = defineProps(['id']);
const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
    uid: props.id
  }
});
const orderDetail = ref({});
const orderData = ref({});
const visible = ref(false)


const getOrderInfos = async (params) => {
  try {
    const res = await getOrderInfo(params);
    if (res?.code == 0) {
      orderDetail.value = res?.data;
      visible.value = true;
    }
  } catch (err) {}
};
const showModal = async (orderId) => {
  await getOrderInfos(orderId);
};

const columns = [
  {
    title: "订单编号",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "预约仪器",
    dataIndex: "itemname",
    key: "itemname",
  },
  {
    title: "支付金额",
    key: "payAmount",
    dataIndex: "payAmount"
    // slots: {
    //   customRender: "realOrderPrice",
    // },
  },
  {
    title: "支付方式",
    key: "types",
    slots: {
      customRender: "types",
    },
  },
  
  {
    title: "欠款金额",
    dataIndex: "debtAmount",
    key: "debtAmount",
  },
  {
    title: "欠款状态",
    dataIndex: "s",
    key: "s",
    slots: {
      customRender: "s",
    },
  },
  {
    title: "订单状态",
    dataIndex: "status",
    key: "status",
    slots: {
      customRender: "status",
    },
  },
  {
    title: "操作",
    key: "action",
    slots: {
      customRender: "action",
    },
  },
];

const labelCol = {
  style: {
    width: "120px",
  },
};
const diffPayData = ref({
  codeUrl: '',
  payPlatform: '',
  cost: ''
})
const wrapperCol = {
  span: 24,
};
const formState = reactive({
  startTime: "",
  endTime: "",
});

const dataSource = ref([]);

const getOrderLists = async () => {
  try {
    const res = await getOrderList(param);
    res?.data?.list.forEach((item) => {
      item.createTime = formatTime(item.createTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

onMounted(() => {
  getOrderLists();
});

const payPlatform = ["","支付宝","微信","银联"];
const payMode = ["预存", "扫码", "信用"];
const status = ["","待报价", "可支付", "待实验", "实验中", "已完成", "欠款中","已开票", "已还款", "已取消"];
const priceDifferenceStatus = ["不欠款", "还款中", "已还款"]
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 5 }"
      bordered
    >
      <template #types="{ text }">
        <span>
          {{ text.payMode == "1" ?  payPlatform[text.payPlatform] : payMode[text.payMode]}}
        </span>
      </template>
      <template #s="{ text }">
        <span>
          {{ s == '6' ? '已欠款' : '已还款'}}
        </span>
      </template>
      <template #status="{ text }">
        <span>
          {{ status[text]}}
        </span>
      </template>
      <template #action="{ record }">
        <a-button type="text" @click="showModal(record.orderId)"
          >订单详情</a-button
        >
      </template>
    </a-table>
     <a-drawer
    title="订单详情"
    placement="right"
    :closable="false"
    width="75%"
    v-model:visible="visible"
  >
    <a-descriptions title="联系方式" bordered :column="2">
      <a-descriptions-item label="联系人">{{
        orderDetail.contactName
      }}</a-descriptions-item>
      <a-descriptions-item label="联系号码">{{
        orderDetail.contactsPhone
      }}</a-descriptions-item>
      <a-descriptions-item label="寄样地址">{{
        orderDetail.officeDetailAddress
      }}</a-descriptions-item>
      <a-descriptions-item label="运费支付方式">{{
        ["到付", "自付"][orderDetail.freightMode]
      }}</a-descriptions-item>
      <a-descriptions-item label="支付方式" v-if="orderDetail.status > 2">{{
        (orderDetail?.payMode != 1) ? ['预存支付', '', '信用支付'][orderDetail.payMode] : ["","支付宝", "微信","银联"][orderDetail.payPlatform]
      }}</a-descriptions-item>
    </a-descriptions>
    <a-descriptions
      title="支付金额"
      bordered
      :column="2"
      style="margin-top: 10px"
    >
      <a-descriptions-item label="订单金额"
        >¥{{ orderDetail.costInfo["订单金额"] }}</a-descriptions-item
      >
      <a-descriptions-item label="优惠券抵扣"
        >¥{{ orderDetail.costInfo["优惠券"] }}</a-descriptions-item
      >
      <a-descriptions-item label="样品回收费"
        >¥{{ orderDetail.costInfo["样品回收费"] }}</a-descriptions-item
      >
      <a-descriptions-item label="运费"
        >¥{{ orderDetail.costInfo["运费"] }}</a-descriptions-item
      >
      <a-descriptions-item label="支付金额"
        >¥{{ orderDetail.costInfo["支付金额"] }}</a-descriptions-item
      >
    </a-descriptions>
    <a-descriptions
      title="订单要求"
      bordered
      :column="2"
      style="margin-top: 10px"
    >
      <a-descriptions-item label="样品是否要回收"
        >¥{{
          ["不需要", "需要"][orderDetail.needRecovery]
        }}</a-descriptions-item
      >
      <a-descriptions-item label="实验留言">{{
        orderDetail.remark
      }}</a-descriptions-item>
    </a-descriptions>
    <h3 style="margin-top: 10px">订单信息</h3>
    <a-card size="small" style="width: 100%">
      <a-table
        :dataSource="orderDetail.sampleInfo || []"
        :columns="orderColums"
      >
        <template #costInfo="{ numberList }">
          <span>
            {{ numberList.join(",") }}
          </span>
        </template>
      </a-table>
    </a-card>
  </a-drawer>
  </main>
</template>
<style lang="scss"></style>
