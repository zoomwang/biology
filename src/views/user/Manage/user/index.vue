<script setup>
// import TheWelcome from '@/components/Wx.vue';
import {
  ref,
  computed,
  reactive,
  defineComponent,
  onMounted,
} from "vue";
import { message } from "ant-design-vue";
import {
  getUserList
} from "../../../../services/manage";
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
const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};
const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
    username: "",
    cardStatus: ""
  }
});

const columns = [
  {
    title: "手机号码",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "姓名",
    dataIndex: "realName",
    key: "realName",
    slots: {
      customRender: "deleted",
    },
  },
  {
    title: "身份",
    dataIndex: "userIdentity",
    key: "userIdentity",
    slots: {
      customRender: "userIdentity",
    },
  },
  {
    title: "邀请人手机号",
    dataIndex: "inviterMobile",
    key: "inviterMobile",
  },
  {
    title: "注册时间",
    dataIndex: "createTimer",
    key: "createTime",
  },
  {
    title: "订单数量",
    dataIndex: "cardStatus",
    key: "cardStatus",
    slots: {
      customRender: "cardStatus",
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

const getUserLists = async () => {
  try {
    const res = await getUserList(param);
    res?.data?.list.forEach((item) => {
      item.createime = formatTime(item.createTime);
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
  getUserLists();
});

const menus = ["未开卡", "待审核", "已开卡"];
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
        <a-select v-model:value="param.param.deleted" style="width: 100px">
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
