<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent, onMounted } from "vue";
import { editUser, getUser, getSchool } from "../../services/user";
import { identity } from "./config";
import areaData from "../../public/area.js";
import { notification, Form } from "ant-design-vue";
import $localStorage from "@/hooks/localStorage";
import UploadFile from "@/components/UploadFile.vue";
import moment from "moment";
import { formatLocalTime } from "../../utils/index";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";
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
const schoolState = ref([]);
const userId = ref("");
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
        required: true,
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
        message: "请输入导师",
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
const canEdit = ref(false);
const onSubmit = async () => {
  validate().then(async (res) => {
    try {
      // if (!formState.additionUrl) {
      //   notification.error({
      //     message: "",
      //     description: "请上传附件",
      //   });
      //   return;
      // }
      formState.id = userId.value || 2;
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
        await getUserInfo();
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
const getUserInfo = async function () {
  try {
    const res = await getUser();
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
  await getUserInfo();
  initStageMenu(formState.userIdentity);
  getSchoolInfoInfo();
});
</script>

<template>
  <!-- <a-card title="用户注册资料" :bordered="false"> -->
  <div class="userinfo d-form">
    <a-form :model="formState" :rules="validateInfos">
      <div class="l-item clear">
        <div class="t-label f-fl">登录账号：</div>
        <a-form-item class="f-fl">
          <a-button
            class="f-fl"
            @click.prevent="
              () => {
                visible = true;
              }
            "
            >点击查看联系方式</a-button
          >
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl"><span class="t-red">*</span>姓名：</div>
        <a-form-item class="f-fl" v-bind="validateInfos.realName">
          <a-input
            :disabled="!canEdit"
            v-model:value="formState.realName"
            placeholder="请输入姓名"
          />
        </a-form-item>
      </div>
      <div class="l-item clear l-identity">
        <div class="t-label f-fl"><span class="t-red">*</span>身份：</div>
        <a-form-item class="f-fl">
          <a-radio-group
            :disabled="!canEdit"
            name="userIdentity"
            @change="
              (val) => {
                initStageMenu(val.target.value)
              }
            "
            v-model:value="formState.userIdentity"
          >
            <a-radio
              v-for="item in identity"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</a-radio
            >
          </a-radio-group>
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">邀请人手机号：</div>
        <a-form-item class="f-fl" v-bind="validateInfos.inviterMobile">
          <a-input
            disabled
            v-model:value="formState.inviterMobile"
            placeholder="请输入手机号"
          />
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl"><span class="t-red">*</span>邮箱：</div>
        <a-form-item class="f-fl" v-bind="validateInfos.email">
          <a-input
            :disabled="!canEdit"
            v-model:value="formState.email"
            placeholder="请输入正确格式"
          />
        </a-form-item>
      </div>
      <div class="l-item clear" style="position: relative">
        <div class="t-label f-fl"><span class="t-red">*</span>附件上传：</div>
        <a-form-item class="f-fl">
          <UploadFile
            :onSuccess="
              (url) => {
                formState.additionUrl = url;
              }
            "
          />
        </a-form-item>
        <span
          style="position: absolute; left: 100px; top: 5px; margin-left: 100px"
          >上传工作证或学生证等真实信息</span
        >
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl"><span class="t-red">*</span>地区：</div>
        <a-form-item class="f-fl" v-bind="validateInfos.address">
          <a-cascader
            allowClear
            :disabled="!canEdit"
            showSearch
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
            <a-input
              :disabled="!canEdit"
              v-model:value="formState.mentor"
              placeholder="请输入导师"
            />
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
          <div class="t-label f-fl"><span class="t-red">*</span>请输入企业：</div>
          <a-form-item class="f-fl" v-bind="validateInfos.corporation">
            <a-input
              :disabled="!canEdit"
              v-model:value="formState.corporation"
              placeholder="请输入"
            />
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-label f-fl"><span class="t-red">*</span>请输入部门：</div>
          <a-form-item class="f-fl" v-bind="validateInfos.branch">
            <a-input
              :disabled="!canEdit"
              v-model:value="formState.branch"
              placeholder="请输入"
            />
          </a-form-item>
        </div>
        <div class="l-item clear">
          <div class="t-label f-fl"><span class="t-red">*</span>请输入职位：</div>
          <a-form-item class="f-fl" v-bind="validateInfos.position">
            <a-input
              :disabled="!canEdit"
              v-model:value="formState.position"
              placeholder="请输入"
            />
          </a-form-item>
        </div>
      </template>
      <a-button
        type="primary"
        class="b-submit-button"
        v-if="!canEdit"
        @click.prevent="
          () => {
            canEdit = true;
          }
        "
        >编辑用户信息</a-button
      >
      <a-popconfirm
        v-if="canEdit"
        title="确认要提交用户信息吗?"
        ok-text="是"
        cancel-text="否"
        @confirm="onSubmit"
      >
        <a-button
          type="primary"
          class="b-submit-button"
          @click.prevent="() => {}"
          >提交用户信息</a-button
        >
      </a-popconfirm>
    </a-form>
  </div>
  <!-- 用户注册资料 -->
  <a-modal
    v-model:visible="visible"
    title="登录账号"
    @ok="
      () => {
        visible = false;
      }
    "
  >
    {{ formState.mobile }}
  </a-modal>
</template>
<style lang="scss" scoped>
.userinfo {
  .ant-form-item {
    .ant-select {
      width: 600px !important;
    }
  }
  .ant-radio-wrapper {
    margin-top: 5px;
  }
  .b-submit-button {
    width: auto;
  }
}
.ant-form-item {
  width: 600px;
  text-align: left;
}
</style>
