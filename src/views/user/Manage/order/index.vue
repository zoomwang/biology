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
  addAssignOrder,
  addRemark,
  addExperimentResult,
  determinefee,
  addDetermineFee
} from "../../../../services/manage";
import { notification, message } from "ant-design-vue";
import {formatTime} from "@/utils/index";
import RemarkList from './RemarkList.vue'
import SupplierList from './SupplierList.vue';
import { DollarCircleOutlined, UploadOutlined } from "@ant-design/icons-vue";

const drawerVisible = ref(false);
const assignOrderVisible = ref(false);
const remarkVisible = ref(false);
const remarkListVisible = ref(false);
const supplierListVisible = ref(false);
const orderUploadVisible = ref(false);
const orderFeeVisible = ref(false);
const remarkOrderId = ref("");
const orderDetail = ref({});
const visible = ref(false);
const supplierDetail = ref({});
const orderUpload = ref({
  orderId: '',
  ossUrl: '',
});
const orderFee = ref({
  orderId: '',
});
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

// const sendSample = async(record) => {
//   try {
//     const res = await addAssignOrder(record);
//     if (res.code == 0) {
//       message.success("新建成功");
//     }
//   } catch (err) {}
// }

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
    title: "分派",
    dataIndex: "dispatch",
    slots: {
      customRender: "dispatch",
    },
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
    title: "分派",
    dataIndex: "dispatch",
    slots: {
      customRender: "dispatch",
    },
  },
  {
    title: "供应商反馈",
    dataIndex: "supplierFeedback",
  },
  {
    title: "是否已分派供应商",
    dataIndex: "dispatch",
  },
];

const completedColumns = [
  {
    title: "预约仪器",
    dataIndex: "device",
  },
  {
    title: "用户所在分部",
    dataIndex: "officeName",
  },
  {
    title: "对接人",
    dataIndex: "dispatchContactPerson",
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
    slots: {
      customRender: "feeData",
    },
  },
  {
    title: "上传",
    slots: {
      customRender: "uploadData",
    },
  },
  {
    title: "文件上传信息",
    dataIndex: "uploadFileInfo",
  },
  {
    title: "是否已分派供应商",
    dataIndex: "dispatch",
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
  orderId: "",
  remark: "",
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

const onRemarkSubmit = async () => {
  try {
    const res = await addRemark(formState);
    if (res?.code == 0) {
      message.success("添加成功");
      // getOrderList();
      remarkVisible.value = false;
    }
  } catch (err) {
    debugger
  }
};

const onOk = (data) => {
  supplierListVisible.value = false;
  assignOrderVisible.value = true;
  supplierDetail.value = data[0];
}

const onSubmit = async() => {
  try {
    const res = await addAssignOrder({
      orderId: remarkOrderId.value,
      ...supplierDetail.value
    });
    if (res?.code == 0) {
      message.success("寄样成功");
      assignOrderVisible.value = false;
    }
  } catch (err) {
    debugger
  }
}

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
      <DollarCircleOutlined />
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
      <template #feeData="{ text }">
        <DollarCircleOutlined style="cursor:pointer" @click="async()=>{
          orderFee.orderId = text?.orderId;
          const res = await determinefee({
            orderId: text?.orderId
          })
          if (res.code == 0) {
            Object.assign(orderFee, res?.data);
          }
          orderFeeVisible = true;
        }" />
      </template>
      <template #uploadData="{ text }">
        <UploadOutlined style="cursor:pointer" @click="()=>{
          orderUpload.orderId = text?.orderId;
          orderUploadVisible = true;
        }" />
      </template>
      <template #status="{ text }">
        <span>
          {{ statusMenus[text] }}
        </span>
      </template>
      <template #remark="{ record }">
        <a-button
          type="link"
          @click="() => {
            formState.orderId = record.orderId;
            remarkVisible = true;
          }"
          >添加备注</a-button
        >
        <a-button
          type="link"
          @click="() => {
            remarkOrderId = record.orderId;
            remarkListVisible = true;
          }"
          >查看备注</a-button
        >
      </template>
      <template #dispatch="{ record }">
        <a-button
          type="link"
          @click="() => {
            remarkOrderId = record.orderId;
            supplierListVisible = true;
          }"
          >分派</a-button
        >
      </template>
      <template #sendSamples="{ record }">
      </template>
      <template #action="{ record }">
        <!-- <space> -->
        <a-button type="text" @click="showModal(record.orderId)"
          >订单详情</a-button
        >
      </template>
    </a-table>
    <a-modal v-model:visible="remarkVisible" width="200px" title="添加备注" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
      remarkVisible = false;
    }">
      <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="备注" name="remark">
        <a-textarea  v-model:value="formState.remark" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button style="" type="primary" @click="onRemarkSubmit">提交</a-button>
      </a-form-item>
    </a-form>
    </a-modal>
    <a-modal v-model:visible="remarkListVisible" width="50%" title="备注详情" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
      remarkListVisible = false;
    }">
      <RemarkList :id="remarkOrderId" />
    </a-modal>
    <a-modal class="width-80" v-model:visible="supplierListVisible" width="80%" title="分派订单" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
      supplierListVisible = false;
    }">
      <SupplierList :id="remarkOrderId" :onOk="onOk" />
    </a-modal>
    <a-modal class="width-40" v-model:visible="assignOrderVisible" title="寄样" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
      assignOrderVisible = false;
    }">
      <a-descriptions title="" bordered>
        <a-descriptions-item :span="3" label="收件人：">{{ supplierDetail.head }}</a-descriptions-item>
        <a-descriptions-item :span="3" label="联系电话：">{{ supplierDetail.supplierName }}</a-descriptions-item>
        <a-descriptions-item :span="3" label="寄样地址：">{{ supplierDetail.supplierName }}</a-descriptions-item>
      </a-descriptions>
      <a-button style="margin-top:20px" type="primary" @click="onSubmit">确认寄样</a-button>
    </a-modal>
    <a-modal class="width-40" v-model:visible="orderUploadVisible" title="结果上传" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
      orderUploadVisible = false;
    }">
      <UploadFile
        :onSuccess="
          async(url) => {
            orderUpload.ossUrl = url;
          }
        "
      />      
      <a-button style="margin-top:20px" type="primary" @click="async() => {
        if (!orderUpload.ossUrl) {
          message.error('请先上传文件');
          return;
        }
        const res = await addExperimentResult({
              ossUrl: orderUpload.ossUrl,
              orderId: orderUpload.orderId,
            });
            if (res.code == 0) {
              message.success('上传成功');
              orderUploadVisible = false;
            } else {
              message.error(res?.msg || '上传失败');
            }
      }">确认寄样</a-button>
    </a-modal>
    <a-modal class="width-60" v-model:visible="orderFeeVisible" title="费用确认" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
      orderFeeVisible = false;
    }">
      <a-descriptions title="" bordered>
        <a-descriptions-item :span="3" label="预约人登录手机号：">{{ orderFee.username }}</a-descriptions-item>
        <a-descriptions-item :span="3" label="预约人姓名：">{{ orderFee.realName }}</a-descriptions-item>
        <a-descriptions-item :span="3" label="供应商名称：">{{ orderFee.supplierName }}</a-descriptions-item>
        <a-descriptions-item :span="3" label="供应商电话：">{{ orderFee.telephone }}</a-descriptions-item>
        <a-descriptions-item :span="3" label="寄样地方：">{{ orderFee.address }}</a-descriptions-item>
        <a-descriptions-item :span="3" label="优惠前原价：">{{ orderFee.originalPrice }}</a-descriptions-item>
        <a-descriptions-item :span="3" label="优惠：">{{ orderFee.discount }}</a-descriptions-item>
        <a-descriptions-item :span="3" label="用户实付：">{{ orderFee.actualPayment }}</a-descriptions-item>
      </a-descriptions>
      <a-button style="margin-top:20px" type="primary" @click="async() => {
        const res = await addDetermineFee({
              orderId: orderFee.orderId,
            });
            if (res.code == 0) {
              message.success('确认成功');
              orderFeeVisible = false;
            } else {
              message.error(res?.msg || '确认失败');
            }
      }">确认费用</a-button>
    </a-modal>
  </main>
</template>
<style lang="scss"></style>
