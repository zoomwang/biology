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
import {formatTime} from "@/utils/index";
import Detail from "./Detail.vue"

const id = ref('');
const visible = ref(false);
const isCreate = ref(true);
const createShow = ref(false);
const supplierDetail = ref(null);

const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
    username: "",
    cardStatus: 0
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
    title: "学校/单位",
    dataIndex: "university",
    key: "university",
  },
  {
    title: "注册时间",
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: "开卡状态",
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

const getUserLists = async () => {
  try {
    const res = await getUserList(param);
    res.data.list = [
    {
        "id": 0,
        "username": "2334324",
        "realName": "KHkajs",
        "userIdentity": 0,
        "email": "string",
        "inviterMobile": "string",
        "isCertified": 0,
        "address": [
          "string"
        ],
        "university": "string",
        "department": "string",
        "stage": "string",
        "corporation": "string",
        "branch": "string",
        "position": "string",
        "studyStart": "2024-05-16T12:13:18.281Z",
        "studyEnd": "2024-05-16T12:13:18.281Z",
        "mentor": "string",
        "createTime": "2024-05-16T12:13:18.281Z",
        "additionUrl": "string",
        "cardStatus": 0,
        "transMap": {
          "additionalProp1": {},
          "additionalProp2": {},
          "additionalProp3": {}
        }
      }
    ];
    res?.data?.list.forEach((item) => {
      item.createTime = formatTime(item.createTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

const showModal = (id) => {
  visible.value = true;
  id.value = id;
}

onMounted(() => {
  getUserLists();
});

const menus = ["未开卡", "待审核", "已开卡"];
const identity = ["学生", "教职工", "企业", "医院", "个人", "未知"];
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-form style="margin: 10px 10px 20px 0" :model="formState" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="用户名" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.param.username" placeholder="用户名" style="width:140px" />
      </a-form-item>
      <a-form-item label="开卡状态" :wrapperCol="{
        span: 7
      }">
        <a-select v-model:value="param.param.deleted" style="width: 100px">
          <a-select-option value="-1">全部状态</a-select-option>
          <a-select-option v-for="(item, index) in menus" :key="item" :value="index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 7 }">
        <a-button type="primary" @click="() => {
          getUserLists();
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
      <template #userIdentity="{ text }">
        <span>
          {{ identity[text] }}
        </span>
      </template>
      <template #cardStatus="{ text }">
        <span>
          {{ menus[text] }}
        </span>
      </template>
      <template #action="{ record }">
        <!-- <a-button type="link" @click="showEditDetail(record)"
          >编辑</a-button
        > -->
        <a-button type="link" @click="showModal(record.id)"
          >更多详情</a-button
        >
      </template>
    </a-table>
  </main>
  <a-modal class="modal-tab" v-model:visible="visible" width="80%" title="更多详情" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    visible = false;
  }">
    <Detail v-if="visible" :id="id" />
  </a-modal>

</template>
<style lang="scss"></style>
