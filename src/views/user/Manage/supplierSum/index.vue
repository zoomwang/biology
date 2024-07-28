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
import { message } from "ant-design-vue";
import {
  getOrderLists,
} from "../../../../services/process";
import {
  supplierList,
  supplierItemList,
  supplierPersonList,
  supplierItemUpdate
} from "../../../../services/supplier";
import { notification } from "ant-design-vue";
import {formatTime} from "@/utils/index";
import DownLoad from "@/components/DownLoad.vue";
import Create from "./Create.vue"
import Detail from "./Detail.vue"

const id = ref('');
const diffVisible = ref(false);
const orderDetail = ref({});
const visible = ref(false);
const isCreate = ref(true);
const createShow = ref(false);
const supplierDetail = ref(null);
const showModal = async (orderId) => {
  getOrderInfos(orderId, "detail");
};
const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};
const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
    deleted: "",
    itemname: ""
  }
});

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

const getOrderInfos = (params, type) => {
  if (type == "detail") {
    visible.value = true;
    id.value = params;
  } else {
    drawerVisible.value = true;
  }
};

const getSupplierItemList = async () => {
  try {
    const res = await supplierList(param);
    res?.data?.list.forEach((item) => {
      item.createTime = formatTime(item.createTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

const showEditDetail = async (record) => {
  supplierDetail.value = record;
  isCreate.value = false;
  createShow.value = true;
}

onMounted(() => {
  getSupplierItemList();
});

const menus = ["已上架", "已下架"];
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-form style="margin: 10px 10px 20px 0" :model="formState" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="供应商姓名" :wrapperCol="{
        span: 7
      }">
        <a-select v-model:value="param.param.deleted" style="width: 100px">
          <a-select-option value="-1">供应商姓名</a-select-option>
          <a-select-option v-for="(item, index) in menus" :key="item" :value="index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="测试项目" :wrapperCol="{
        span: 7
      }">
        <a-select v-model:value="param.param.deleted" style="width: 100px">
          <a-select-option value="-1">测试项目</a-select-option>
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
      <template #deleted="{ text }">
        <span>
          {{ menus[text] }}
        </span>
      </template>
      <template #action="{ record }">
        <a-button type="link" @click="showEditDetail(record)"
          >编辑</a-button
        >
        <a-button type="link" @click="showModal(record.id)"
          >更多详情</a-button
        >
        <a-popconfirm
          title="确认要删除吗?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="async() => {
            record.delete = 1;
            const res = await supplierItemUpdate(record);
            if (res?.code == 0) {
              message.success('删除成功');
            }
          }"
          @cancel="cancel"
        >
          <a-button type="text" danger>删除</a-button>
        </a-popconfirm>        
      </template>
    </a-table>
  </main>
  <a-modal class="modal-tab" v-model:visible="visible" width="80%" title="更多详情" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    visible = false;
  }">
    <Detail v-if="visible" :id="id" />
  </a-modal>

   <a-modal v-model:visible="createShow" width="50%" :title="isCreate ? '新建供应商测试项目' :'编辑供应商测试项目'" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
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
