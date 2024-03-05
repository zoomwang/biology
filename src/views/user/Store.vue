<script setup>
// import TheWelcome from '@/components/Wx.vue';
import {
  ref,
  computed,
  reactive,
  defineComponent,
  onMounted,
  watch,
} from "vue";
import { isLogged } from "../../services/user";
import FinalStep from "../process/components/FinalStep.vue";
import {
  getOrderLists,
  cancelOrder,
  getOrderInfo,
} from "../../services/process";
import { getStoreList, cancelStoreRefund } from "@/services/prestore";
import { notification } from "ant-design-vue";
import {formatTime} from "@/utils/index";

let orderData = reactive({
});
const drawerVisible = ref(false);
const showDrawer = async (record) => {
  orderData = record;
  await getOrderInfos(record.orderId);
};
const orderDetail = ref({});
const visible = ref(false);
const showModal = async (record) => {
  orderDetail.value =  record;
  visible.value = true;
};
const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};
const param = reactive({
  pageSize: 999,
  curPage: 1,
  status: "0",
  startTime: "",
  endTime: "",
});

const orderColums = [
  {
    title: "样品数量",
    dataIndex: "count",
    key: "count",
  },
  {
    title: "实验目的",
    dataIndex: "goal",
    key: "age",
  },
  {
    title: "样品编号",
    dataIndex: "numberList",
    key: "address",
    slots: {
      customRender: "numberList",
    },
  },
];

const columns = [
  {
    title: "订单号",
    dataIndex: "storeId",
  },
  {
    title: "预存福利",
    dataIndex: "welfare",
    slots: {
      customRender: "welfare",
    },
  },
  {
    title: "预存金额",
    className: "amount",
    dataIndex: "amount",
  },
  {
    title: "发票类型",
    dataIndex: "invoiceType",
    slots: {
      customRender: "invoiceType",
    },
  },
  {
    title: "订单状态",
    dataIndex: "status",
    slots: {
      customRender: "status",
    },
  },
  {
    title: "附件地址",
    dataIndex: "additionUrl",
    
  },
  {
    title: "邮箱",
    dataIndex: "mailBox",
    
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
const wrapperCol = {
  span: 24,
};
const formState = reactive({
  startTime: "",
  endTime: "",
});

const dataSource = ref([]);

const getOrderInfos = async (params, type) => {
  try {
    const res = await getOrderInfo(params);
    if (res?.code == 0) {
      orderDetail.value = res?.data;
      if (type == "detail") {
        visible.value = true;
      } else {
        drawerVisible.value = true;
      }
    }
  } catch (err) {}
};

const cancelOrders = async (orderId) => {
  try {
    const res = await getStoreRefund({
      storeId: orderId,
    });
    if (res?.code == 0) {
      getOrderList();
      notification.success({
        description: "取消订单成功",
      });
    }
  } catch (err) {}
};

const getOrderList = async () => {
  try {
    const res = await getStoreList(param);
    res?.data?.list.forEach((item) => {
      item.createTime = formatTime(item.createTime);
    })
    // console.log(res?.data?.list)
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

onMounted(() => {
  getOrderList();
});

const menus = ["待支付", "已支付", "已退款"];
const welfares = ["测试费", "京东卡"];
const invoiceTypes = ["普票", "专票"];
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-form style="margin: 10px 10px 20px 0" :model="formState" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="订单创建时间" :wrapperCol="{
        span: 7
      }">
        <a-date-picker v-model:value="param.startTime" style="width:140px" />
      </a-form-item>
      <a-form-item label="订单结束时间" :wrapperCol="{
        span: 5
      }">
        <a-date-picker v-model:value="param.endTime" style="width:120px" />
      </a-form-item>
      <!-- <a-form-item label="订单状态" :wrapperCol="{
        span: 7
      }">
        <a-select v-model:value="param.status" style="width: 100px">
          <a-select-option value="0">全部订单</a-select-option>
          <a-select-option v-for="(item, index) in menus" :key="item" :value="++index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item> -->
      <a-form-item :wrapper-col="{ offset: 8, span: 7 }">
        <a-button type="primary" @click="() => {
          getOrderList();
        }">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 5 }"
      bordered
    >
      <template #status="{ text }">
        <span>
          {{ menus[text] }}
        </span>
      </template>
      <template #welfare="{ text }">
        <span>
          {{ welfares[text] }}
        </span>
      </template>
      <template #invoiceType="{ text }">
        <span>
          {{ invoiceTypes[text] }}
        </span>
      </template>
      <template #action="{ record }">
        <!-- <space> -->
        <!-- <a-button
          style="margin-bottom: 5px"
          type="primary"
          v-if="record.status <= 1"
          @click="showDrawer(record)"
          >立即支付</a-button
        > -->
        <br v-if="record.status <= 1" />
        <a-button type="text" @click="showModal(record)"
          >订单详情</a-button
        >
         <br v-if="record.status <= 1" />
        <a-popconfirm
          title="你确认要取消订单吗?"
          ok-text="确定"
          v-if="record.status >= 1"
          cancel-text="取消"
          @confirm="cancelOrders(record.storeId)"
          @cancel="cancel"
        >
          <a-button danger style="margin-bottom: 5px" type="text">取消订单</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </main>
  <a-drawer
    title="订单详情"
    placement="right"
    :closable="false"
    width="75%"
    v-model:visible="visible"
  >
    <a-descriptions title="订单基础信息" bordered :column="2">
      <a-descriptions-item label="订单号">{{
        orderDetail.storeId
      }}</a-descriptions-item>
      <a-descriptions-item label="预存福利">{{
        welfares[orderDetail.welfare]
      }}</a-descriptions-item>
      <a-descriptions-item label="预存金额">{{
        orderDetail.amount
      }}</a-descriptions-item>
      <a-descriptions-item label="发票类型">{{
        invoiceTypes[orderDetail.invoiceType]
      }}</a-descriptions-item>
    </a-descriptions>
    <a-descriptions
      title="更多信息"
      bordered
      :column="2"
      style="margin-top: 10px"
    >
      <a-descriptions-item label="附件地址"
        >{{ orderDetail.additionUrl }}</a-descriptions-item
      >
      <a-descriptions-item label="备注"
        >{{ orderDetail.remind }}</a-descriptions-item
      >
    </a-descriptions>
    <a-descriptions
      title="发票信息"
      bordered
      :column="2"
      style="margin-top: 10px"
      v-for="item in orderDetail.invoiceTitle"
    >
      <a-descriptions-item  label="开户行帐号"
        >{{
          item.banksn
        }}</a-descriptions-item
      >
      <a-descriptions-item  label="发票抬头"
        >{{
          item.title
        }}</a-descriptions-item
      >
      <a-descriptions-item  label="企业税号"
        >{{
          item.registrationo
        }}</a-descriptions-item
      >
      <a-descriptions-item  label="开户行名称"
        >{{
          item.depositbank
        }}</a-descriptions-item
      >
    </a-descriptions>
    <!-- <h3 style="margin-top: 10px">订单信息</h3>
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
    </a-card> -->
  </a-drawer>
  <a-drawer
    title="订单支付"
    placement="right"
    :closable="false"
    width="70%"
    v-model:visible="drawerVisible"
    :after-visible-change="afterVisibleChange"
  >
    <FinalStep :cost="orderDetail.costInfo" :orderId="orderDetail.orderId" :orderData="orderData" />
  </a-drawer>
</template>
<style lang="scss"></style>
