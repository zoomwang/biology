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
  addDetermineFee,
  sendOrder,
  deleteOrder,
  deleteSendOrder,
  updateOrderProcess
} from "../../../../services/manage";
import {
  getOrderInfo,
} from "../../../../services/process";
import { notification, message } from "ant-design-vue";
import {formatTime} from "@/utils/index";
import RemarkList from './RemarkList.vue'
import SupplierList from './SupplierList.vue';
import { DollarCircleOutlined, UploadOutlined } from "@ant-design/icons-vue";

const drawerVisible = ref(false);
const assignOrderVisible = ref(false);
const remarkVisible = ref(false);
const remarkListVisible = ref(false);
const invoiceVisible = ref(false);
const repaymentVisible = ref(false);
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
const invoiceData = ref({
  orderId: '',
  invoiceStatus: '',
  repaymentStatus: '',
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
  param: {},
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
    slots: {
      customRender: "orderId",
    },
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
  // {
  //   title: "订单状态",
  //   dataIndex: "status",
  //   slots: {
  //     customRender: "status",
  //   },
  // },
  // {
  //   title: "沟通",
  //   dataIndex: "remark",
  // },
  // {
  //   title: "供应商反馈",
  //   dataIndex: "supplierFeedback",
  // },
  {
    title: "是否已派单",
    dataIndex: "dispatch",
    slots: {
      customRender: "dispatchAction",
    },
  },
  // {
  //   title: "分派",
  //   dataIndex: "dispatch",
  //   slots: {
  //     customRender: "dispatch",
  //   },
  // },
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
    slots: {
      customRender: "orderId",
    },
  },
  {
    title: "是否需要回收",
    dataIndex: "needRecovery",
    slots: {
      customRender: "needRecovery",
    },
  },
  // {
  //   title: "样品抵达时间",
  //   dataIndex: "sampleArrivalTime",
  // },
  // {
  //   title: "要求供应商出结果时间",
  //   dataIndex: "supplierResultDeadline",
  // },
  // {
  //   title: "承诺用户出结果时间",
  //   dataIndex: "promisedUserResultTime",
  // },
  {
    title: "下单金额",
    dataIndex: "orderAmount",
  },
  // {
  //   title: "供应商反馈",
  //   dataIndex: "supplierFeedback",
  // },
  {
    title: "是否已派单",
    dataIndex: "dispatch",
    slots: {
      customRender: "dispatchAction",
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
    title: "是否已上传文件",
    // dataIndex: "resultUploaded",
    slots: {
      customRender: "resultUploaded",
    },
  },
  {
    title: "操作",
    key: "remark",
    slots: {
      customRender: "remark",
    },
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
    slots: {
      customRender: "orderId",
    },
  },
  {
    title: "预约人",
    dataIndex: "contactName",
  },
  {
    title: "下单金额",
    dataIndex: "orderAmount",
  },
  // {
  //   title: "确认费用",
  //   dataIndex: "confirmedCost",
  // },
  // {
  //   title: "实际支付金额",
  //   dataIndex: "actualPayment",
  // },
  // {
  //   title: "完成时间",
  //   dataIndex: "completionTime",
  // },
  // {
  //   title: "订单时长",
  //   dataIndex: "orderDuration",
  // },
  {
    title: "发票状态",
    // dataIndex: "invoiceStatus",
    slots: {
      customRender: "invoiceStatus",
    },
  },
  {
    title: "还款状态",
    // dataIndex: "repaymentStatus",
    slots: {
      customRender: "repaymentStatus",
    },
  },
  /**{
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
    title: "是否已上传文件",
    dataIndex: "uploadFileInfo",
    slots: {
      customRender: "uploadFileInfo",
    },
  },***/
  // {
  //   title: "是否已派单",
  //   dataIndex: "dispatch",
  // },
];

const labelCol = {
  style: {
    width: "120px",
  },
};
const wrapperCol = {
  span: 18,
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

const onOk = async(data) => {
  try {
    const res = await addAssignOrder({
      orderId: remarkOrderId.value,
      id: data[0].id,
    });
    if (res?.code == 0) {
      supplierListVisible.value = false;
      getOrderList();
      message.success("派单成功");
    }
  } catch (err) {
    debugger
  }
}

// const onSubmit = async(data) => {
//   try {
//     const res = await sendOrder({
//       orderId: data.orderId,
//     });
//     if (res?.code == 0) {
//       getOrderList();
//       message.success("寄样成功");
//     }
//   } catch (err) {
//     debugger
//   }
// }

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
      <a-form-item label="订单号" :wrapperCol="{
        span: 5
      }">
        <a-input v-model:value="param.param.orderId" placeholder="请输入" style="width:160px" />
      </a-form-item>
      <a-form-item label="订单状态" :wrapperCol="{
        span: 6
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
          if (!text.resultUploaded) {
            notification.error({
              description: '请先上传文件',
            });
            return;
          }
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
      <template #resultUploaded="{ text }">
        <span :style="{
            color: text ? 'green': 'red'
          }">
          {{ text.resultUploaded ? '已上传' : '未上传' }}
          <br />
          <a v-if="text.resultUploaded" target="_blank" :href="text.uploadFileInfo"
            >下载</a
          >
        </span>
      </template>
      <template #needRecovery="{ text }">
        <span>
          {{ needRecoveryMenus[text] }}
        </span>
      </template>
      <template #dispatchAction="{ record }">
        <span>
          <div :style="{
            color: record?.dispatch ? 'green': 'red',
            textAlign: 'center'
          }">{{ record?.dispatch ? '已派单' : '未派单' }}</div>
          <a-button
            v-if="!record?.dispatch"
            type="link"
            style="display: block;width: 100%;text-align: center;"
            @click="() => {
              remarkOrderId = record.orderId;
              supplierListVisible = true;
            }"
            >派单</a-button>
            <a-popconfirm
            v-if="record?.dispatch"
          title="确定要删除派单吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="async()=>{
            try {
                  const res = await deleteOrder({
                    orderId: record.orderId
                  });
                  if (res.code == 0) {
                    message.success('删除派单成功');
                  }
                } catch (err) {}
          }"
          @cancel="()=>{}"
        >
        <a-button
          type="link"
          ><span :style="{
            color: 'red'
          }">删除派单</span></a-button
        >
        </a-popconfirm>
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
          :disabled="!record.message"
          @click="() => {
            remarkOrderId = record.orderId;
            remarkListVisible = true;
          }"
          >查看备注</a-button
        >
      </template>

      <template #sendSamples="{ record }">
        <div :style="{
            textAlign: 'center',
            color: record?.sendSamples ? 'green': 'red'
          }">{{ record?.sendSamples ? '已寄样' : '未寄样' }}</div>

        <a-popconfirm
          title="确定要寄样嘛?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="async()=>{
            if (!record?.sendSamples) {
              try {
                const res = await sendOrder({
                  orderId: record.orderId,
                });
                if (res?.code == 0) {
                  getOrderList();
                  message.success('寄样成功');
                }
              } catch (err) {
                debugger
              }
            } else {
              
              try {
              const res = await deleteSendOrder({
                orderId: record.orderId,
              });
              if (res?.code == 0) {
                getOrderList();
                message.success('删除寄样成功');
              }
            } catch (err) {
              debugger
            }
            }
            
          }"
          @cancel="()=>{}"
        >
        <a-button
          type="link"
          ><span :style="{
            color: record.sendSamples ? 'red' : '#1677ff'
          }">{{ record.sendSamples ? '删除寄样':'寄样' }}</span></a-button
        >
        </a-popconfirm>
      </template>
      <template #orderId="{ text }">
        <span>
          {{ text }}
          <a-button
            type="link"
            @click="() => {
              showModal(text)
            }"
            >查看详情</a-button
          >
        </span>
      </template>
      <template #invoiceStatus="{ record }">
        <span :style="{
            color: record?.invoiceStatus ? 'green': 'red'
          }">{{ record?.invoiceStatus ? '已开票' : '未开票' }}</span>
        <a-button
          type="link"
          @click="() => {
            const { orderId, invoiceStatus, repaymentStatus } = record;
            invoiceData.orderId = orderId;
            invoiceVisible = true;
            invoiceData.invoiceStatus = invoiceStatus;
            invoiceData.repaymentStatus = repaymentStatus;
          }"
          >修改</a-button
        >
      </template>
      <template #repaymentStatus="{ record }">
        <span :style="{
            color: record?.repaymentStatus ? 'green': 'red'
          }">{{ record?.repaymentStatus ? '已还款' : '未还款' }}</span>
        <a-button
          type="link"
          @click="() => {
            console.log('record===', record);
            const { orderId, invoiceStatus, repaymentStatus } = record;
            invoiceData.orderId = orderId;
            repaymentVisible = true;
            invoiceData.invoiceStatus = invoiceStatus;
            invoiceData.repaymentStatus = repaymentStatus;
          }"
          >修改</a-button
        >
      </template>
    </a-table>
    <a-modal class="remark-wrap" v-model:visible="remarkVisible" width="200px" title="" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
      remarkVisible = false;
    }">
      <a-form
      ref="formRef"
      :model="formState"
      :label-col="{ span: 1 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="备注" name="remark">
        <a-textarea  v-model:value="formState.remark" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onRemarkSubmit">提交</a-button>
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
    <a-modal class="width-40 upload-wrap" v-model:visible="orderUploadVisible" title="文件上传" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
      orderUploadVisible = false;
    }">
      <!-- <UploadFile
        :onSuccess="
          async(url) => {
            orderUpload.ossUrl = url;
          }
        "
      />       -->
      <a-form
        ref="formRef"
        :model="orderUpload"
        :rules="rules"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="oss链接" name="ossUrl">
          <a-textarea  v-model:value="orderUpload.ossUrl" />
        </a-form-item>
      </a-form>
      <a-button style="margin-top:20px;" type="primary" @click="async() => {
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
              getOrderList();
              orderUploadVisible = false;
            }
      }">确认</a-button>
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
              getOrderList();
              orderFeeVisible = false;
            } else {
              message.error(res?.msg || '确认失败');
            }
      }">确认费用</a-button>
    </a-modal>
    <a-modal class="width-60" v-model:visible="invoiceVisible" title="" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
      invoiceVisible = false;
    }">
      <a-form
        ref="formRef"
        :model="invoiceData"
        :rules="rules"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="发票状态确认" name="">
          <a-radio-group v-model:value="invoiceData.invoiceStatus">
            <a-radio :value="true">已开票</a-radio>
            <a-radio :value="false">未开票</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-button style="margin-top:20px" type="primary" @click="async() => {
          const { orderId, invoiceStatus, repaymentStatus } = invoiceData;
          const res = await updateOrderProcess({
                orderId,
                invoiceStatus,
                repaymentStatus,
              });
              if (res.code == 0) {
                message.success('确认成功');
                getOrderList();
                invoiceVisible  = false;
              } else {
                message.error(res?.msg || '修改失败');
              }
        }">确认费用</a-button>
      </a-form>
    </a-modal>
    <a-modal class="width-60" v-model:visible="repaymentVisible" title="" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
      repaymentVisible = false;
    }">
      <a-form
        ref="formRef"
        :model="invoiceData"
        :rules="rules"
        :wrapper-col="wrapperCol"
      >
        <a-form-item label="还款状态确认" name="">
          <a-radio-group v-model:value="invoiceData.repaymentStatus">
            <a-radio :value="true">已还款</a-radio>
            <a-radio :value="false">未还款</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-button style="margin-top:20px" type="primary" @click="async() => {
          const { orderId, invoiceStatus, repaymentStatus } = invoiceData;
          const res = await updateOrderProcess({
                orderId,
                invoiceStatus,
                repaymentStatus,
              });
              if (res.code == 0) {
                message.success('修改成功');
                getOrderList();
                repaymentVisible = false;
              } else {
                message.error(res?.msg || '修改失败');
              }
        }">确认费用</a-button>
      </a-form>
    </a-modal>
    <!-- 订单详情 -->
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
<style lang="scss">
.upload-wrap,.remark-wrap{
  .ant-modal-body{
    overflow: hidden;
  }
}
</style>
