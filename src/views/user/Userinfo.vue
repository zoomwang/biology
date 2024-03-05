<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent, onMounted } from "vue";
import { editUser, getUser, getSchool } from "../../services/user";
import { identity } from "./config";
import areaData from "../../public/area.js";
import { notification, Form } from "ant-design-vue";
import $localStorage from "@/hooks/localStorage";
import UploadFile from "@/components/UploadFile.vue";
import moment from 'moment';
import { formatLocalTime } from "../../utils/index";
import dayjs from 'dayjs';

const dateFormat = 'YYYY-MM-DD';
const monthFormat = 'YYYY/MM';
const useForm = Form.useForm;
let formState = reactive({
  id: "",
  address: "",
  mobile: "",
  userIdentity: "",
  university: "",
  additionUrl: "",
});
const schoolState = ref([]);
const userId = ref('');
const {
  resetFields: resetFieldsp,
  validate: validatep,
  validateInfos: validateInfosp,
} = useForm(
  formState,
  reactive({
    inviterMobile: [
      {
        required: true,
        message: "请输入手机号",
        pattern: /^1[3456789]\d{9}$/,
      },
    ],
    address: [
      {
        required: true,
      },
    ]
  })
);
const visible = ref(false);
const canEdit = ref(false);
const onSubmit = async () => {
  try {
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
    } else {
      // notification.error({
      //   message: "",
      //   description: res.msg,
      // });
    }
  } catch (err) {}
};
const getUserInfo = async function () {
  try {
    const res = await getUser();
    if (res.code == 0) {
      const { username, university, address } = res.data;
      res.data.mobile = username;
      res.data.university = university ? (university - 0) : '';
      res.data.address = Array.isArray(address) && address.map((item) => {
        return `${item}`;
      });
      res.data.studyStart = ref(dayjs(formatLocalTime(res?.data?.studyStart, true), monthFormat));
      res.data.studyEnd = ref(dayjs(formatLocalTime(res?.data?.studyEnd, true), monthFormat));
      formState = Object.assign(formState, res.data);
      userId.value = res.data.id;
      localStorage.setItem('userName', res.data.username);
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
          value: item.id
        })
      })
      schoolState.value = data1;
    }
  } catch (err) {}
};
onMounted(() => {
  getUserInfo();
  getSchoolInfoInfo();
});
</script>

<template>
  <!-- <a-card title="用户注册资料" :bordered="false"> -->
  <div class="userinfo d-form">
    <a-form :model="formState">
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
        <div class="t-label f-fl">姓名：</div>
        <a-form-item class="f-fl">
          <a-input
            :disabled="!canEdit"
            v-model:value="formState.username"
            placeholder="请姓名"
          />
        </a-form-item>
      </div>
      <div class="l-item clear l-identity">
        <div class="t-label f-fl">身份：</div>
        <a-form-item class="f-fl">
          <a-radio-group
            :disabled="!canEdit"
            name="userIdentity"
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
        <a-form-item class="f-fl" v-bind="validateInfosp.inviterMobile">
          <a-input
            :disabled="!canEdit"
            v-model:value="formState.inviterMobile"
            placeholder="请输入手机号"
          />
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">附件上传：</div>
        <a-form-item class="f-fl">
           <UploadFile :onSuccess="(url) => {
             formState.additionUrl = url;
            }" />
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">地区：</div>
        <a-form-item class="f-fl">
          <a-cascader
            allowClear
            :disabled="!canEdit"
            showSearch
            :options="areaData"
            v-model:value="formState.address"
          />
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">高校：</div>
        <a-form-item class="f-fl">
          <a-select showSearch optionFilterProp="label" :options="schoolState" :filterOption="(value,option) => {
            if(option?.label?.includes(value)) {
              return true;
            }
          }" v-model:value="formState.university" :disabled="!canEdit">
            <!-- <a-select-option v-for="item in schoolState" :value="item.id">{{ item.name }}</a-select-option> -->
          </a-select>
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">院系：</div>
        <a-form-item class="f-fl">
          <!-- <a-select v-model:value="formState.department" :disabled="!canEdit">
            <a-select-option value="lucy">Lucy</a-select-option>
          </a-select> -->
          <a-input
          :disabled="!canEdit"
            v-model:value="formState.department"
            placeholder="请输入院系"
          />
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">所处阶段：</div>
        <a-form-item class="f-fl">
          <a-select v-model:value="formState.stage" :disabled="!canEdit">
            <a-select-option value="0">阶段1</a-select-option>
          </a-select>
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">请输入导师：</div>
        <a-form-item class="f-fl">
          <a-input
            :disabled="!canEdit"
            v-model:value="formState.mentor"
            placeholder="请输入导师"
          />
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">入学年份：</div>
        <a-form-item class="f-fl">
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
        <div class="t-label f-fl">毕业年份：</div>
        <a-form-item class="f-fl">
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
