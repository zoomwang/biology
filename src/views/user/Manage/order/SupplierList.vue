<script setup>
import {
  ref,
  reactive,
  onMounted,
} from "vue";
import { message } from "ant-design-vue";
import {
  assignOrder
} from "../../../../services/manage";
// import {formatTime} from "@/utils/index";

const props = defineProps(['id', 'onOk']);
const param = reactive({
  orderId: props.id || '1234567890',
  dispatchContactPerson: "",
  sampleNum: "",
});

const onSubmit = () => {
  if (state.selectedRowKeys.length != 1){
    message.error('请选择一个供应商');
    return;
  }
  const data = dataSource.value.filter((item) => {
    return item.supplierId == state.selectedRowKeys[0];
  })
  props.onOk(data);
}

const columns = [
  {
    title: "供应商名称",
    dataIndex: "supplierName",
    key: "supplierName",
  },
  {
    title: "说明文件",
    dataIndex: "document",
  },
  {
    title: "设备类型",
    dataIndex: "deviceType",
  },
  {
    title: "负责人",
    dataIndex: "head",
  },
  {
    title: "成本价",
    dataIndex: "costprice",
  },
  {
    title: "备注",
    dataIndex: "remark",
  },
  {
    title: "订单数",
    dataIndex: "orderNum",
  },
  {
    title: "正在做样品数",
    dataIndex: "doingAndMaxWeekCapacityRatio",
  },
  {
    title: "已分派样品数",
    dataIndex: "assignedSampleNum",
  },
  
];

const state = reactive({
  selectedRowKeys: [],
})

const onSelectChange = (selectedRowKeys) => {
  state.selectedRowKeys = selectedRowKeys;
};

const wrapperCol = {
  span: 24,
};

const dataSource = ref([]);

const getSupplierList = async () => {
  try {
    const res = await assignOrder(param);
    const sysSupplierVOList = res?.data?.sysSupplierDetailItemVOs;
    Array.isArray(sysSupplierVOList) && sysSupplierVOList.forEach((item) => {
      item.key = item.supplierId
    })
    if (res?.code == 0) dataSource.value = res?.data?.sysSupplierDetailItemVOs;
  } catch (err) {}
};

onMounted(() => {
  getSupplierList();
});


</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-form style="margin: 10px 10px 20px 0" :model="param" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="订单号" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.orderId" style="width: 250px"></a-input>
      </a-form-item>
      <a-form-item label="对接人" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.dispatchContactPerson" style="width: 100px"></a-input>
      </a-form-item>
      <a-form-item label="样品数量" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.sampleNum" style="width: 100px"></a-input>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 7 }">
        <a-button type="primary" @click="() => {
          getSupplierList();
        }">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 5 }"
      :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
      bordered
    >
      <template #status="{ text }">
        <span>
          {{ menus[text] }}
        </span>
      </template>
      <template #orderType="{ text }">
        <span>
          {{ type[text] }}
        </span>
      </template>
    </a-table>
    <a-button type="primary" @click="onSubmit">提交</a-button>
  </main>
</template>
<style lang="scss"></style>
