<script setup>
import {
  ref,
  reactive,
  onMounted,
} from "vue";
import {
  getUserList,
  updateUserRemark
} from "../../../../services/manage";
import {formatTime} from "@/utils/index";
import Detail from "./Detail.vue"
import { message } from "ant-design-vue";

const id = ref('');
const username = ref('');
const visible = ref(false);
const updateRemarkVisible = ref(false);
const isCreate = ref(true);
const createShow = ref(false);
const supplierDetail = ref(null);

const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
    username: "",
    cardStatus: "",
    university: ""
  }
});
const remarkFormState = reactive({
  uid: "",
  remark:  "",
});

const updateRemark = (record) => {
  remarkFormState.uid = record.id;
  updateRemarkVisible.value = true;
}

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
  // {
  //   title: "邀请人手机号",
  //   dataIndex: "inviterMobile",
  //   key: "inviterMobile",
  // },
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
    title: "备注",
    // dataIndex: "remarks",
    key: "remarks",
    slots: {
      customRender: "remarks",
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

const onRemarkSubmit = async() => {
  try {
    const res = await updateUserRemark(remarkFormState);
    if (res?.code == 0) {
      message.success(`编辑成功`);
      updateRemarkVisible.value = false;
    }
  //  }
    
  } catch (err) {
    // debugger
  }
};

const dataSource = ref([]);

const getUserLists = async () => {
  try {
    const res = await getUserList(param);
    res?.data?.list.forEach((item) => {
      item.createTime = formatTime(item.createTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

const showModal = (item, user) => {
  id.value = item;
  username.value = user;
  visible.value = true;
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
      <a-form-item label="学校/单位" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.param.university" placeholder="学校/单位" style="width:140px" />
      </a-form-item>
      <a-form-item label="开卡状态" :wrapperCol="{
        span: 7
      }">
        <a-select v-model:value="param.param.cardStatus" style="width: 100px">
          <a-select-option value="">全部状态</a-select-option>
          <a-select-option v-for="(item, index) in menus" :key="item" :value="index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 7 }">
        <a-button type="primary" @click="() => {
          getUserLists();
        }">搜索</a-button>
      </a-form-item>
      <!-- <a-button type="primary" style="margin-left: 20px" @click="() => {
          supplierDetail = null;
          isCreate = true;
          createShow = true;
        }">新建</a-button> -->
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
      <template #status="{ text }">
        <span>
          {{ status[text] }}
        </span>
      </template>
      <template #remarks="{ text }">
        <span>
          {{text.remark}}
           <a-button type="link" @click="updateRemark(text)">修改备注</a-button>
        </span>
      </template>
      <template #action="{ record }">
        <!-- <a-button type="link" @click="showEditDetail(record)"
          >编辑</a-button
        > -->
        <a-button type="link" @click="showModal(record.id, record.username)"
          >更多详情</a-button
        >
      </template>
    </a-table>
  </main>
  <a-modal class="modal-tab" v-model:visible="visible" width="80%" title="更多详情" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    visible = false;
  }">
    <Detail v-if="visible" :id="id" :username="username" />
  </a-modal>
  <a-modal class="modal-tab" v-model:visible="updateRemarkVisible" width="80%" title="更多详情" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    updateRemarkVisible = false;
  }">
    <a-form
    ref="formRef"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="remark" label="备注" name="remark">
        <a-textarea v-model:value="remarkFormState.remark" :rows="4" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onRemarkSubmit">提交</a-button>
    </a-form-item>
  </a-form>
  </a-modal>

</template>
<style lang="scss"></style>
