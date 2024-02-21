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
import { notification } from "ant-design-vue";
// import moment from 'moment';
import {formatTime} from "@/utils/index";

let orderData = reactive({
});
const drawerVisible = ref(false);
const showDrawer = async (record) => {
  orderData = record;
  debugger
  await getOrderInfos(record.orderId);
};
const orderDetail = ref({});
const visible = ref(false);
const showModal = async (orderId) => {
  await getOrderInfos(orderId, "detail");
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
    title: "项目名称",
    dataIndex: "itemname",
  },
  {
    title: "下单时间",
    className: "column-money",
    dataIndex: "createTime",
  },
  {
    title: "订单号",
    dataIndex: "orderId",
  },
  {
    title: "实付款",
    dataIndex: "costInfo",
    slots: {
      customRender: "costInfo",
    },
  },
  {
    title: "订单状态",
    dataIndex: "status",
    slots: {
      customRender: "status",
    },
  },
  // {
  //   title: "发票状态",
  //   dataIndex: "ticketStatus",
  //   slots: {
  //     customRender: "ticketStatus",
  //   },
  // },
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
    const res = await cancelOrder({
      orderId,
    });
    if (res?.code == 0) {
      notification.success({
        description: "取消订单成功",
      });
    }
  } catch (err) {}
};

const getOrderList = async () => {
  try {
    const res = await getOrderLists(param);
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

const menus = ["待支付", "待实验", "实验中", "已完成", "已取消"];
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <!-- <a-tabs
      v-model:activeKey="activeKey"
      @change="
        (tab) => {
          param.status = tab;
          getOrderList();
        }
      "
    >
      <a-tab-pane key="0" tab="全部订单"></a-tab-pane>
      <a-tab-pane
        v-for="(item, index) in menus"
        :key="++index"
        :tab="item"
        force-render
      ></a-tab-pane>
    </a-tabs> -->
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
      <a-form-item label="订单状态" :wrapperCol="{
        span: 7
      }">
        <a-select v-model:value="param.status" style="width: 100px">
          <a-select-option value="0">全部订单</a-select-option>
          <a-select-option v-for="(item, index) in menus" :key="item" :value="++index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
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
          {{ menus[++text] }}
        </span>
      </template>
      <template #costInfo="{ text }">
        <span>
          {{ text["支付金额"] }}
        </span>
      </template>
      <template #ticketStatus="{ text }">
        <span>
          {{ ["无需开票", "无", "待申请"][text] }}
        </span>
      </template>
      <template #action="{ record }">
        <!-- <space> -->
        <a-button
          style="margin-bottom: 5px"
          type="primary"
          v-if="record.status <= 1"
          @click="showDrawer(record)"
          >立即支付</a-button
        >
        <br />
        <a-popconfirm
          title="你确认要取消订单吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="cancelOrders(record.orderId)"
          @cancel="cancel"
        >
          <a-button style="margin-bottom: 5px" type="text">取消订单</a-button>
        </a-popconfirm>
        <br />
        <a-button type="text" @click="showModal(record.orderId)"
          >订单详情</a-button
        >
        <!-- </space> -->
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
