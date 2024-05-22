<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, reactive, onMounted } from "vue";
import { getSchool } from "../../../../services/user";
import { getUserInfo, activeCreditPay } from "../../../../services/manage";
import areaData from "@/public/area.js";
import PreStoreUpdate from "./PrestoreUpdate.vue";
import { notification, Form } from "ant-design-vue";
import { formatLocalTime } from "@/utils/index";
import dayjs from "dayjs";

const identitys = ["学生", "教职工", "企业", "医院"];
const props = defineProps(['id', "username"]);
const monthFormat = "YYYY/MM";
const useForm = Form.useForm;
const stageMenu1 = ref([
  {
    label: "讲师",
    value: "讲师",
  },
  {
    label: "副教授/副研究员",
    value: "副教授/副研究员",
  },
  {
    label: "教授/研究员",
    value: "教授/研究员",
  },
  {
    label: "其他",
    value: "其他",
  },
]);
const originMenu = ref([
  {
    label: "本科",
    value: "本科",
  },
  {
    label: "硕士",
    value: "硕士",
  },
  {
    label: "博士",
    value: "博士",
  },
  {
    label: "博士后",
    value: "博士后",
  },
  {
    label: "讲师",
    value: "讲师",
  },
  {
    label: "副教授/副研究员",
    value: "副教授/副研究员",
  },
  {
    label: "教授/研究员",
    value: "教授/研究员",
  },
]);
const stageMenu = ref([
]);
let stageMenu2 = ref([
  {
    label: "本科",
    value: "本科",
  },
  {
    label: "硕士",
    value: "硕士",
  },
  {
    label: "博士",
    value: "博士",
  },
  {
    label: "博士后",
    value: "博士后",
  },
  {
    label: "讲师",
    value: "讲师",
  },
]);;
let formState = reactive({
  id: "",
  address: "",
  mobile: "",
  userIdentity: "",
  university: "",
  additionUrl: "",
  email: "",
});
const　activeKey = ref(1)
const schoolState = ref([]);
const userId = ref(props.id);
const { resetFields, validate, validateInfos } = useForm(
  formState,
  reactive({
    inviterMobile: [
      {
        required: true,
        message: "请输入手机号",
        pattern: /^1[3456789]\d{9}$/,
      },
    ],
    realName: [
      {
        required: true,
        message: "请输入姓名",
      },
    ],
    userIdentity: [
      {
        required: true,
        message: "请选择身份",
      },
    ],
    corporation: [
      {
        required: true,
        message: "请输入企业",
      },
    ],
    branch: [
      {
        required: true,
        message: "请输入部门",
      },
    ],
    position: [
      {
        required: false,
        message: "请输入职位",
      },
    ],
    address: [
      {
        required: true,
        message: "请选择地区",
      },
    ],
    university: [
      {
        required: true,
        message: "请选择高校",
      },
    ],
    department: [
      {
        required: true,
        message: "请选择院系",
      },
    ],
    stage: [
      {
        required: true,
        message: "请选择所处阶段",
      },
    ],
    studyStart: [
      {
        required: true,
        message: "请选择入学年份",
      },
    ],
    studyEnd: [
      {
        required: true,
        message: "请选择毕业年份",
      },
    ],
    mentor: [
      {
        required: formState.userIdentity != 1 ? false : true,
        message: "请输入导师信息",
      },
    ],
    email: [
      {
        required: true,
        message: "请输入正确格式邮箱",
        pattern: /\w[-.\w]*\@[-a-z0-9]+(\.[-a-z0-9]+)*\.(com|cn|edu|uk)/gi,
      },
    ],
  })
);

const visible = ref(false);
let canEdit = ref(false);
const onSubmit = async () => {
  validate().then(async (res) => {
    try {
      
      formState.id = userId.value;
      if (formState.mobile == formState.inviterMobile) {
        notification.error({
          message: "",
          description: "邀请人和当前账号重复，请重新输入",
        });
        return;
      }
      const res = await editUser(formState);
      if (res.code == 0) {
        notification.success({
          message: "",
          description: "编辑成功",
        });
        canEdit = false;
        await getUserInfos();
      } else {
        // notification.error({
        //   message: "",
        //   description: res.msg,
        // });
      }
    } catch (err) {}
  }).catch((e) => {
    notification.error({
      description: e?.errorFields[0]?.errors[0] || '请重试',
    });
  });
};
const getUserInfos = async function () {
  try {
    const res = await getUserInfo(props.username);
    if (res.code == 0) {
      const { username, university, address } = res.data;
      res.data.mobile = username;
      res.data.university = university;
      res.data.address =
        Array.isArray(address) &&
        address.map((item) => {
          return `${item}`;
        });
      res.data.studyStart = dayjs(
        formatLocalTime(
          res?.data?.studyStart ? res?.data?.studyStart : new Date(),
          true
        ),
        monthFormat
      );
      res.data.studyEnd = dayjs(
        formatLocalTime(
          res?.data?.studyEnd ? res?.data?.studyEnd : new Date(),
          true
        ),
        monthFormat
      );
      formState = Object.assign(formState, res.data);
      userId.value = res.data.id;
      localStorage.setItem("userName", res.data.username);
    }
  } catch (err) {}
};
const getSchoolInfoInfo = async function () {
  try {
    const res = await getSchool();
    if (res?.code == 0) {
      // schoolState.value = res.data;
      const data1 = [];
      res.data.forEach((item) => {
        data1.push({
          label: item.name,
          value: item.name,
        });
      });
      schoolState.value = data1;
    }
  } catch (err) {}
};
const initStageMenu = function (val){
  if (val == 0) {
      stageMenu.value = stageMenu2.value;
    } else if(val == 1){
      stageMenu.value = stageMenu1.value;
    } else {
      stageMenu.value = originMenu.value;
    }
}
onMounted(async() => {
  await getUserInfos();
  initStageMenu(formState.userIdentity);
  getSchoolInfoInfo();
});
</script>

<template>
  <!-- <a-card title="用户注册资料" :bordered="false"> -->
  <div class="userinfo-manage d-form">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="0" header="用户基本信息">
      <a-form  :model="formState" :rules="validateInfos">
      <div class="l-item clear">
        <div class="t-label f-fl">登录账号：</div>
        <a-form-item class="f-fl">
          {{ formState.mobile }}
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl"><span class="t-red">*</span>姓名：</div>
        <a-form-item class="f-fl" v-bind="validateInfos.realName">
          {{ formState.realName }}
        </a-form-item>
      </div>
      <div class="l-item clear l-identity">
        <div class="t-label f-fl"><span class="t-red">*</span>身份：</div>
        <a-form-item class="f-fl">
          {{ identitys[formState.userIdentity] }}
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">邀请人手机号：</div>
        <a-form-item class="f-fl" v-bind="validateInfos.inviterMobile">
          {{ formState.inviterMobile }}
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl"><span class="t-red">*</span>邮箱：</div>
        <a-form-item class="f-fl" v-bind="validateInfos.email">
          {{ formState.email }}
        </a-form-item>
      </div>
      
      <div class="l-item clear">
        <div class="t-label f-fl"><span class="t-red">*</span>地区：</div>
        <a-form-item class="f-fl" v-bind="validateInfos.address">
          <a-cascader
            allowClear
            showSearch
            class="ant-select-disabled-manage"
            :options="areaData"
            v-model:value="formState.address"
          />
        </a-form-item>
      </div>
      <template v-if="formState.userIdentity != 2 && formState.userIdentity != 3">
        <div class="l-item clear">
          <div class="t-label f-fl"><span class="t-red">*</span>高校：</div>
          <a-form-item class="f-fl" v-bind="validateInfos.university">
            <a-select
              showSearch
              optionFilterProp="label"
              :options="schoolState"
              :filterOption="
                (value, option) => {
                  if (option?.label?.includes(value)) {
                    return true;
                  }
                }
              "
              v-model:value="formState.university"
              :disabled="!canEdit"
            >
              <!-- <a-select-option v-for="item in schoolState" :value="item.id">{{ item.name }}</a-select-option> -->
            </a-select>
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-label f-fl"><span class="t-red">*</span>院系：</div>
          <a-form-item class="f-fl" v-bind="validateInfos.department">
            <a-input
              :disabled="!canEdit"
              v-model:value="formState.department"
              placeholder="请输入院系"
            />
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-label f-fl"><span class="t-red">*</span>所处阶段：</div>
          <a-form-item class="f-fl" v-bind="validateInfos.stage">
            <a-select v-model:value="formState.stage" :disabled="!canEdit">
              <a-select-option
                v-for="item in stageMenu"
                :key="item.label"
                :value="item.value"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-label f-fl"><span class="t-red" v-if="formState.userIdentity != 1">*</span>请输入导师：</div>
          <a-form-item class="f-fl" v-bind="validateInfos.mentor">
            {{ formState.mentor }}
          </a-form-item>
        </div>
        <template v-if="formState.userIdentity != 1">
          <div class="l-item clear">
            <div class="t-label f-fl"><span class="t-red">*</span>入学年份：</div>
            <a-form-item class="f-fl" v-bind="validateInfos.studyStart">
              <a-space direction="vertical">
                <a-month-picker
                  :disabled="!canEdit"
                  style="width: 300px"
                  :format="monthFormat"
                  v-model:value="formState.studyStart"
                  placeholder="请选择入学年份"
                />
              </a-space>
            </a-form-item>
          </div>
          <div class="l-item clear">
            <div class="t-label f-fl"><span class="t-red">*</span>毕业年份：</div>
            <a-form-item class="f-fl" v-bind="validateInfos.studyEnd">
              <a-space direction="vertical">
                <a-month-picker
                  :disabled="!canEdit"
                  style="width: 300px"
                  :format="monthFormat"
                  v-model:value="formState.studyEnd"
                  placeholder="请选择毕业年份"
                />
              </a-space>
            </a-form-item>
          </div>
        </template>
      </template>
      <template v-if="formState.userIdentity == 2 || formState.userIdentity == 3">
        <div class="l-item clear">
          <div class="t-label f-fl"><span class="t-red">*</span>企业：</div>
          <a-form-item class="f-fl" v-bind="validateInfos.corporation">
            {{ formState.corporation }}
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-label f-fl"><span class="t-red">*</span>部门：</div>
          <a-form-item class="f-fl" v-bind="validateInfos.branch">
            {{ formState.branch }}
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-label f-fl"><span class="t-red">*</span>职位：</div>
          <a-form-item class="f-fl" v-bind="validateInfos.position">
            {{ formState.position }}
          </a-form-item>
        </div>
      </template>
    </a-form>
    </a-collapse-panel>
    </a-collapse>
    <div class="l-item" style="">
      <div style="overflow: hidden;">
        <div class="t-label f-fl"><span class="t-red">*</span>客户上传资料：</div>
        <a-form-item class="f-fl">
          <a :href="formState.additionUrl">点击查看</a>
        </a-form-item>
      </div>
        <a-button class="f-fl" style="margin-left:20px" type="primary" @click="() => {
          visible= true;
        }">更新授信信息</a-button>
      </div>
  </div>
  <!-- 用户注册资料 -->
  <a-modal
    v-model:visible="visible"
    title="信用金调整"
    :footer="null"
    @ok="
      () => {
        visible = false;
      }
    "
  >
    <PreStoreUpdate :uid="formState.id" :successCallBack="async() => {
      await getUserInfos();
      visible = false;
    }" />
  </a-modal>
</template>
<style lang="scss" scoped>
.userinfo-manage {
  .t-label{width: 120px}
  .ant-form-item {
    width: 450px;
    margin-top: 5px;
    .ant-select {
      width: 450px !important;
    }
  }
  .ant-radio-wrapper {
    margin-top: 5px;
  }
  .b-submit-button {
    width: auto;
  }
}
// .ant-form-item {
//   width: 600px;
//   text-align: left;
// }
</style>
