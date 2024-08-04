<script setup>
// import TheWelcome from '@/components/Wx.vue';
import {
  ref,
  reactive,
  onMounted,
} from "vue";
import {
  supplierList,
  supplierItemList,
  supplierPersonList,
} from "../../../../services/supplier";
import {formatTime} from "@/utils/index";
import Create from "./Create.vue"

const id = ref('');
const data = ref([]);
const data1 = ref([]);
const visible = ref(false);
const isCreate = ref(true);
const createShow = ref(false);
const supplierDetail = ref(null);

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
  },
  {
    title: "供应商电话",
    dataIndex: "telephone",
  },
  {
    title: "工作单位",
    dataIndex: "company",
  },
  {
    title: "寄样地方",
    dataIndex: "address",
  },
  {
    title: "转账方式",
    dataIndex: "transferMethod",
    slots: {
      customRender: "transfer",
    },
  },
  {
    title: "支付方式",
    dataIndex: "payMethod",
    slots: {
      customRender: "pay",
    },
  },
  {
    title: "发票信息",
    dataIndex: "invoiceInformation",
  },
  {
    title: "创建者",
    dataIndex: "creator",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "更新时间",
    dataIndex: "updateTime",
  },
  {
    title: "状态",
    dataIndex: "deleted",
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


const getSupplierItemList = async () => {
  try {
    const res = await supplierPersonList(param);
    res?.data?.list.forEach((item) => {
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

const showEditDetail = async (record) => {
  supplierDetail.value = record;
  isCreate.value = false;
  createShow.value = true;
}

const filterOption = (inputValue, option) => {
  return option.label.includes(inputValue);
};

const menus = ["已上架", "已下架"];

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
      <a-form-item label="供应商模糊搜索" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.param.supplierName" placeholder="请输入" style="width:140px" />
      </a-form-item>
      <a-form-item label="状态" :wrapperCol="{
        span: 7
      }">
        <a-select v-model:value="param.param.deleted" allowClear style="width: 100px">
          <a-select-option value="-1">全部状态</a-select-option>
          <a-select-option v-for="(item, index) in menus" :key="item" :value="index">{{ item }}</a-select-option>
        </a-select>
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
      <template #deleted="{ record }">
        {{ ['已上架', '已下架'][record.deleted] }}
      </template>
      <template #transfer="{ record }">
        {{ ['不确定', '对公转账', '对私转账'][record.transferMethod] }}
      </template>
      <template #pay="{ record }">
        {{ ['不确定', '微信', '支付宝', '银行'][record.payMethod] }}
      </template>
      <template #action="{ record }">
        <a-button type="link" @click="showEditDetail(record)"
          >编辑</a-button
        >
      </template>
    </a-table>
  </main>

   <a-modal v-model:visible="createShow" width="50%" :title="isCreate ? '新增供应商' : '编辑供应商'" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    visible = false;
  }">
    <Create style="margin-top: 20px" :successCallBack="() => {
      getSupplierItemList(); 
      isCreate = true;
      createShow = false;
    }" :detail="supplierDetail" :isCreate="isCreate" />
  </a-modal>
</template>
<style lang="scss"></style>
