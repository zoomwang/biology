<script setup>
// import TheWelcome from '@/components/Wx.vue';
import {
  ref,
  reactive,
  onMounted,
} from "vue";
import { message } from "ant-design-vue";
import {
  supplierList,
  supplierItemList,
  supplierPersonList,
  supplierItemUpdate
} from "../../../../services/supplier";
import { notification } from "ant-design-vue";
import {formatTime} from "@/utils/index";
import Create from "./Create.vue"

const id = ref('');
const data = ref([]);
const data1 = ref([]);
const visible = ref(false);
const isCreate = ref(true);
const createShow = ref(false);
const supplierDetail = ref(null);
const transferMethod = [
  {
    label: '不确定',
    value: 0,
  },
  {
    label: '对公转账',
    value: 1,
  },
  {
    label: '对私转账',
    value: 2,
  },
];
const payMethod = [
  {
    label: '不确定',
    value: 0,
  },
  {
    label: '微信',
    value: 1,
  },
  {
    label: '支付宝',
    value: 2,
  },
  {
    label: '银行',
    value: 3,
  },
];

const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
  }
});

async function fake() {
  const data2 = [];
  const res = await supplierPersonList({
    pageSize: 999,
    curPage: 1,
    param: {
    },
  });
  if (res?.code == 0) {
    Array.isArray(res?.data.list) &&
      res?.data.list.forEach((item) => {
        data2.push({
          label: item.supplierName,
          value: item.id,
        });
      });
    data.value = data2;
    // callback(data);
  }
  const data3 = [];
  const res1 = await supplierItemList({
    pageSize: 999,
    curPage: 1,
    param: {
    },
  });
  if (res1?.code == 0) {
    Array.isArray(res1?.data.list) &&
      res1?.data.list.forEach((item) => {
        data3.push({
          label: item.itemname,
          value: item.id,
        });
      });
    data1.value = data3;
    // callback(data);
  }
}

const columns = [
  {
    title: "供应商名称",
    dataIndex: "supplierName",
    key: "itemname",
  },
  {
    title: "测试项目",
    dataIndex: "itemname",
  },
  {
    title: "设备类型",
    dataIndex: "deviceType",
  },
  {
    title: "仪器台数",
    dataIndex: "deviceNum",
    key: "deviceNum",
  },
  {
    title: "参考价",
    dataIndex: "price",
  },
  {
    title: "截止周容量",
    dataIndex: "maxWeekSampleCapacity",
  },
  {
    title: "正在做样品数",
    dataIndex: "doingSampleNum",
  },
  {
    title: "已分派样品数",
    dataIndex: "assignedSampleNum",
  },
  {
    title: "历史订单总数",
    dataIndex: "historyOrderNum",
  }
];

const labelCol = {
  style: {
    width: "150px",
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

const getSupplierItemList = async () => {
  try {
    const res = await supplierList(param);
    res?.data?.list.forEach((item) => {
      item.createTime = formatTime(item.createTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};


const filterOption = (inputValue, option) => {
  return option.label.includes(inputValue);
};

onMounted(() => {
  getSupplierItemList();
  fake();
});

</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-form style="margin: 10px 10px 20px 0" :model="formState" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="供应商姓名" :wrapperCol="{
        span: 7
      }">
        <a-select
        style="width: 200px"
        show-search
        allowClear
        :filterOption="filterOption"
        :default-active-first-option="false"
        :options="data"
        v-model:value="param.param.supplierId"
      />
      </a-form-item>
      <a-form-item label="测试项目" :wrapperCol="{
        span: 7
      }">
        <a-select
        allowClear
        style="width: 200px"
        show-search
        :filterOption="filterOption"
        :default-active-first-option="false"
        :options="data1"
        v-model:value="param.param.supplierItemId"
      />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 7 }">
        <a-button type="primary" @click="() => {
          getSupplierItemList();
        }">搜索</a-button>
      </a-form-item>
      <a-button type="primary" style="margin-left: 20px" @click="() => {
          supplierDetail = null;
          isCreate = true;
          createShow = true;
        }">新建</a-button>
    </a-form>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 5 }"
      bordered
    >
    </a-table>
  </main>

   <a-modal v-model:visible="createShow" width="50%" title="新增总表" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    visible = false;
  }">
    <Create style="margin-top: 20px" :successCallBack="() => {
      getSupplierItemList(); 
      isCreate = true;
      createShow = false;
    }" :isCreate="isCreate" />
  </a-modal>
</template>
<style lang="scss"></style>
