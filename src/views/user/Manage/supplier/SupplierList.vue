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
import {
  supplierItemDetailList,
  supplierList,
  getSupplierDetail
} from "../../../../services/supplier";
// import { notification } from "ant-design-vue";
import {formatTime} from "@/utils/index";
import ItemList from "./ItemList.vue"
import SupplierCreate from "./SupplierCreate.vue"

const props = defineProps(['id']);
// const orderDetail = ref({});
const visible = ref(false);
// const isCreate = ref(true);
const createShow = ref(false);
const supplierData = ref(null);
const showModal = async (orderId) => {
  getOrderInfos(orderId, "detail");
};

const showDetailModal= async (record) => {
  const res = await getSupplierDetail(record.supplierId);
  createShow.value = true;
  supplierData.value = res.data;
};
const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
    id: props.id
  }
});

const columns = [
  {
    title: "供应商名称",
    // dataIndex: "supplierName",
    key: "actions",
    slots: {
      customRender: "actions",
    },
  },
  {
    title: "工作单位",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "设备型号",
    dataIndex: "deviceType",
    key: "deviceType",
  },
  {
    title: "仪器台数",
    dataIndex: "deviceNmu",
    key: "deviceNmu",
  },
  {
    title: "负责人",
    dataIndex: "head",
    key: "head",
  },
  {
    title: "参考价",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "截止周容量",
    dataIndex: "maxWeekSampleCapacity",
    key: "maxWeekSampleCapacity",
  },
  {
    title: "正在做样品数",
    dataIndex: "doingSampleNum",
    key: "doingSampleNum",
  },
  {
    title: "已分派样品数",
    dataIndex: "assignedSampleNum",
    key: "assignedSampleNum",
  },
  {
    title: "历史订单总数",
    dataIndex: "historyOrderNum",
    key: "historyOrderNum",
  },
  {
    title: "状态",
    dataIndex: "deleted",
    key: "deleted",
    slots: {
      customRender: "deleted",
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
const wrapperCol = {
  span: 24,
};
const formState = reactive({
  startTime: "",
  endTime: "",
});

const dataSource = ref([]);

const getOrderInfos = async (params, type) => {
  visible.value = true;
};

const getSupplierList = async () => {
  try {
    const res = await supplierList(param);
    res?.data?.list.forEach((item) => {
      item.createTime = formatTime(item.createTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

onMounted(() => {
  getSupplierList();
});

const menus = ["已上架", "已下架"];
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
      <template #actions="{ record }">
        <a-button type="link" @click="showDetailModal(record)"
          >{{ record.supplierName }}</a-button
        >
      </template>
      <template #deleted="{ text }">
        <span>
          {{ menus[--text] }}
        </span>
      </template>
      <template #action="{ record }">
        <a-button type="link" @click="showModal(record.id)"
          >查看</a-button
        >
      </template>
    </a-table>
  </main>
  <a-modal class="modal-tab" v-model:visible="visible" width="80%" title="供应商测试项目" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    visible = false;
  }">
    <ItemList :id="props.id" />
  </a-modal>

  <a-modal v-model:visible="createShow" width="50%" title="供应商资质" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    visible = false;
  }">
    <SupplierCreate :detail="supplierData" style="margin-top: 20px" :successCallBack="() => {
      getSupplierList(); 
      createShow = false;
    }" />
  </a-modal>
</template>
<style lang="scss"></style>
