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
  supplierItemDetailList
} from "../../../../services/supplier";
// import { notification } from "ant-design-vue";
import {formatTime} from "@/utils/index";
import ItemCreate from "./ItemCreate.vue"

const isCreate = ref(true);
const createShow = ref(false);
const supplierDetail = ref({
  supplierId: ''
});
const props = defineProps(['id']);
const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
    supplierId: props.id
  }
});

const columns = [
  {
    title: "项目名称",
    dataIndex: "itemname",
    key: "itemname",
  },
  {
    title: "说明文件",
    dataIndex: "document",
    key: "document",
  },
  {
    title: "上传说明文件",
    dataIndex: "uploadDocument",
    key: "uploadDocument",
  },
  {
    title: "设备类型",
    dataIndex: "deviceType",
    key: "deviceType",
  },
  {
    title: "成本价",
    dataIndex: "costrice",
    key: "costrice",
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "remark",
  },
  {
    title: "订单数",
    dataIndex: "orderNum",
    key: "orderNum",
  },
  {
    title: "正在做的样品数/截止周容量",
    dataIndex: "doingAndMaxWeekCapacityRatio",
    key: "doingAndMaxWeekCapacityRatio",
  },
  {
    title: "已分派的样品数",
    dataIndex: "assignedSampleNum",
    key: "assignedSampleNum",
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
const showModal = async (type, record) => {
  if (type == 'create') {
    supplierDetail.value = {};
    supplierDetail.value.supplierId = props.id;
    isCreate.value = true;
  } else {
    isCreate.value = false;
    Object.assign(supplierDetail.value, record);
  }
  createShow.value = true;
};

const labelCol = {
  style: {
    width: "120px",
  },
};
const wrapperCol = {
  span: 24,
};

const dataSource = ref([]);
const getSupplierItemDetailList = async () => {
  try {
    const res = await supplierItemDetailList(param);
    res?.data?.list.forEach((item) => {
      item.createTime = formatTime(item.createTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

onMounted(() => {
  getSupplierItemDetailList();
});

const menus = ["已上架", "已下架"];
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-button type="primary" style="margin-bottom: 10px" @click="showModal('create')"
      >新增项目</a-button
    >
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 5 }"
      bordered
    >
      <template #deleted="{ text }">
        <span>
          {{ menus[text] }}
        </span>
      </template>
      <template #action="{ record }">
        <a-button type="link" @click="showModal('edit', record)"
          >编辑</a-button
        >
      </template>
    </a-table>
    <a-modal v-model:visible="createShow" width="50%" :title="isCreate ? '新增测试项目' :'编辑测试项目'" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    visible = false;
  }">
    <ItemCreate style="margin-top: 20px" :successCallBack="() => {
      getSupplierItemDetailList(); 
      isCreate = true;
      createShow = false;
    }" :detail="supplierDetail" :isCreate="isCreate" />
  </a-modal>
  </main>
</template>
<style lang="scss"></style>
