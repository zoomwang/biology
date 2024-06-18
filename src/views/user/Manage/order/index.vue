<script setup>
import {
  ref,
  reactive,
  onMounted,
} from "vue";
import {
  getPendingOrderList,
  getExperieOrderList,
  getCompletedOrderList,
  addAssignOrder
} from "../../../../services/manage";
import { notification } from "ant-design-vue";
import {formatTime} from "@/utils/index";
import DownLoad from "@/components/DownLoad.vue";
import { message } from "ant-design-vue";

let orderData = reactive({
});
const drawerVisible = ref(false);
const diffVisible = ref(false);
const showDrawer = async (record) => {
  orderData = record;
  await getOrderInfos(record.orderId);
};
const orderDetail = ref({});
const visible = ref(false);
const showModal = async (orderId) => {
  await getOrderInfos(orderId, "detail");
};
const param = reactive({
  pageSize: 999,
  curPage: 1,
  startTime: "",
  endTime: "",
  status: 0,
});

const sendSample = async(record) => {
  try {
    const res = await addAssignOrder(record);
    if (res.code == 0) {
      message.success("新建成功");
    }
  } catch (err) {}
}

const columns = ref([
]);

const peddingColumns =[
  {
    title: "预约仪器",
    dataIndex: "device",
    // key: "device",
  },
  {
    title: "用户所在分部",
    dataIndex: "officeName",
    // key: "age",
  },
  {
    title: "订单号",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "是否需要回收",
    dataIndex: "needRecovery",
    slots: {
      customRender: "needRecovery",
    },
  },
  {
    title: "预约会员",
    dataIndex: "contactName",
  },
  {
    title: "下单金额",
    dataIndex: "orderAmount",
  },
  {
    title: "订单状态",
    dataIndex: "status",
    slots: {
      customRender: "status",
    },
  },
  {
    title: "沟通",
    dataIndex: "remark",
  },
  {
    title: "供应商反馈",
    dataIndex: "supplierFeedback",
  },
  {
    title: "是否已分派供应商",
    dataIndex: "dispatch",
  },
  {
    title: "寄样",
    dataIndex: "sendSamples",
    slots: {
      customRender: "sendSamples",
    },
  },
  {
    title: "样品数",
    dataIndex: "sampleNum",
  },
  {
    title: "操作",
    key: "remark",
    slots: {
      customRender: "remark",
    },
  },
];
const experieColumns =[
  {
    title: "预约仪器",
    dataIndex: "device",
    // key: "device",
  },
  {
    title: "用户所在分部",
    dataIndex: "officeName",
    // key: "age",
  },
  {
    title: "对接人",
    dataIndex: "dispatchContactPerson",
    // key: "age",
  },
  {
    title: "订单号",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "是否需要回收",
    dataIndex: "needRecovery",
    slots: {
      customRender: "needRecovery",
    },
  },
  {
    title: "样品抵达时间",
    dataIndex: "sampleArrivalTime",
  },
  {
    title: "要求供应商出结果时间",
    dataIndex: "supplierResultDeadline",
  },
  {
    title: "承诺用户出结果时间",
    dataIndex: "promisedUserResultTime",
  },
  {
    title: "下单金额",
    dataIndex: "orderAmount",
  },
  {
    title: "供应商反馈",
    dataIndex: "supplierFeedback",
  },
  {
    title: "是否已分派供应商",
    dataIndex: "dispatch",
  },
  {
    title: "操作",
    key: "action1",
    slots: {
      customRender: "action1",
    },
  },
];

const completedColumns = [
  {
    title: "预约仪器",
    dataIndex: "device",
    // key: "device",
  },
  {
    title: "用户所在分部",
    dataIndex: "officeName",
    // key: "age",
  },
  {
    title: "对接人",
    dataIndex: "dispatchContactPerson",
    // key: "age",
  },
  {
    title: "订单号",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "预约人",
    dataIndex: "contactName",
  },
  {
    title: "下单金额",
    dataIndex: "orderAmount",
  },
  {
    title: "确认费用",
    dataIndex: "confirmedCost",
  },
  {
    title: "实际支付金额",
    dataIndex: "actualPayment",
  },
  {
    title: "完成时间",
    dataIndex: "completionTime",
  },
  {
    title: "订单时长",
    dataIndex: "orderDuration",
  },
  {
    title: "发票状态",
    dataIndex: "invoiceStatus",
    slots: {
      customRender: "invoiceStatus",
    },
  },
  {
    title: "还款状态",
    dataIndex: "repaymentStatus",
    slots: {
      customRender: "invoiceStatus",
    },
  },
  {
    title: "费用",
    dataIndex: "cost",
  },
  {
    title: "文件上传信息",
    dataIndex: "uploadFileInfo",
  },
  {
    title: "是否已分派供应商",
    dataIndex: "dispatch",
  },
  {
    title: "操作",
    key: "action2",
    slots: {
      customRender: "action2",
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

const successCall = () => {
  getOrderList();
  drawerVisible.value = false;
  diffVisible.value = false;
}

const cancelOrders = async (orderId) => {
  try {
    const res = await cancelOrder({
      orderId,
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
    let res;
    if (param.status == 0) {
      columns.value = peddingColumns;
      res = await getPendingOrderList(param);
    }
    if (param.status == 1) {
      columns.value = experieColumns;
      res = await getExperieOrderList(param);
    }
    if (param.status == 2) {
      columns.value = completedColumns;
      res = await getCompletedOrderList(param);
    }
    res?.data?.list.forEach((item) => {
      item.sampleArrivalTime = formatTime(item.sampleArrivalTime);
      item.supplierResultDeadline = formatTime(item.supplierResultDeadline);
      item.promisedUserResultTime = formatTime(item.promisedUserResultTime);
      item.completionTime = formatTime(item.completionTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

onMounted(() => {
  getOrderList();
});

const menus = ["待实验", "实验中", "已完成"];
const statusMenus = ["","待报价", "可支付", "待实验", "实验中", "已完成", "欠款中","已开票", "已还款", "已取消"];
const needRecoveryMenus = ["不需要", "需要"]
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
      <a-form-item label="订单状态" :wrapperCol="{
        span: 7
      }">
        <a-select v-model:value="param.status" style="width: 100px">
          <a-select-option v-for="(item, index) in menus" :key="item" :value="index">{{ item }}</a-select-option>
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
          {{ statusMenus[text] }}
        </span>
      </template>
      <template #remark="{ text }">
        <a-button
          type="link"
          @click="sendRemark(record)"
          >备注</a-button
        >
      </template>
      <template #sendSamples="{ record }">
        <a-button
          type="link"
          @click="sendSample(record)"
          >寄样</a-button
        >
      </template>
      <template #action="{ record }">
        <!-- <space> -->
        <a-button
          style="margin-bottom: 5px"
          type="primary"
          v-if="record.status == 2"
          @click="showDrawer(record)"
          >立即支付</a-button
        >
        <br v-if="record.priceDifferenceStatus == 1" />
        <a-button
          style="margin-bottom: 5px"
          type="primary"
          v-if="record.priceDifferenceStatus == 1 && record.priceDifference > 0"
          @click="getPayPriceDiffs(record)"
          >补差价{{record.priceDifference}}元</a-button
        >
        <a-button
          style="margin-bottom: 5px"
          type="primary"
          v-if="record.priceDifferenceStatus == 1 && record.priceDifference < 0"
          @click="getReturnPriceDiffs(record)"
          >退差价{{Math.abs(record.priceDifference)}}元</a-button
        >
        <br v-if="record.status <=2 || record.priceDifferenceStatus == 1" />
        <a-button type="text" @click="showModal(record.orderId)"
          >订单详情</a-button
        >
        <template v-if="record.status <= 3">
          <br />
          <a-popconfirm
            title="你确认要取消订单吗?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="cancelOrders(record.orderId)"
            @cancel="cancel"
          >
            <a-button danger style="margin-bottom: 5px" type="text">取消订单</a-button>
          </a-popconfirm>
        </template>
       
        <template v-if="record.status >= 3 && record.status <=5">
          <br />
          <DownLoad :props="record" type="link" />
        </template>
          
        <template v-if="record.status == 5 && record.additionUrl">
          <br />
          <a style="padding-left:10px" :href="record.additionUrl" download="实验结果.png">下载实验结果</a>
        </template>
      </template>
    </a-table>
  </main>
</template>
<style lang="scss"></style>
