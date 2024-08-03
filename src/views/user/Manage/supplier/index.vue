<script setup>
import {
  ref,
  reactive,
  onMounted,
} from "vue";
import { message } from "ant-design-vue";
import {
  supplierItemList,
  supplierItemUpdate
} from "../../../../services/supplier";
import {formatTime} from "@/utils/index";
import Create from "./Create.vue"
import Detail from "./Detail.vue"

const id = ref('');
const visible = ref(false);
const isCreate = ref(true);
const createShow = ref(false);
const supplierDetail = ref(null);
const showModal = async (orderId) => {
  getOrderInfos(orderId, "detail");
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
    title: "项目名称",
    dataIndex: "itemname",
    key: "itemname",
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
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
    slots: {
      customRender: "createTime",
    },
  },
  {
    title: "对接分值",
    dataIndex: "itemValues",
    key: "itemValues",
  },
  {
    title: "供应商数量",
    dataIndex: "supplierNumber",
    key: "supplierNumber",
    slots: {
      customRender: "supplierNumber",
    },
  },
  {
    title: "订单数量",
    dataIndex: "orderNumber",
    key: "orderNumber",
    slots: {
      customRender: "orderNumber",
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
    const res = await supplierItemList(param);
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
      <a-form-item label="项目名称" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.param.itemname" placeholder="测试项目" style="width:140px" />
      </a-form-item>
      <a-form-item label="订单状态" :wrapperCol="{
        span: 7
      }">
        <a-select v-model:value="param.param.deleted" allowClear style="width: 100px">
          <a-select-option value="-1">全部订单</a-select-option>
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
          :title="record.deleted  ? '确认要上线吗?' : '确认要下线吗?'"
          ok-text="确定"
          cancel-text="取消"
          @confirm="async() => {
            record.deleted = record.deleted ? 0 : 1;
            const res = await supplierItemUpdate(record);
            if (res?.code == 0) {
              getSupplierItemList();
              message.success(record.deleted ? '上线成功': '下线成功');
            }
          }"
          @cancel="cancel"
        >
          <a-button type="link" :danger="!record.deleted">{{ record.deleted ? '上线' : '下线'}}</a-button>
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
