<script setup>
import {
  ref,
  computed,
  reactive,
  defineComponent,
  watch,
  defineEmits,
} from "vue";
import {
  CalendarTwoTone,
  DeleteTwoTone,
  PlusSquareTwoTone,
  QuestionCircleTwoTone,
  EnvironmentOutlined,
  UploadOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
// import { isLogged } from "../../services/user";
import areaData from "../../../public/area.js";
import { Form, Modal } from "ant-design-vue";
const emit = defineEmits(["submit", "next"]);

const useForm = Form.useForm;
const containerRef = ref();
let visible = ref(false);
const bottom = ref(10);
let modelRef = reactive({
  id: 0,
  receiver: "",
  phone: "",
  address: [],
  detailAddress: "",
  fullAddress: "",
});
const replaceChecked = (index) => {
  formState.recycleAddress.forEach((item) => {
    item.isdefault = 0;
  });
  formState.recycleAddress[index].isdefault = 1;
  // formState.recycleAddress = formState.recycleAddress[index];
  message.info("设置成功");
};
const addressList = [
  {
    id: "1",
    name: "广州办事处",
  },
  {
    id: "2",
    name: "深圳办事处",
  },
  {
    id: "3",
    name: "上海办事处",
  },
];
const editAddress = reactive({
  isEditInvoice: false,
  editIndex: 0,
});
const selectAdd = (item) => {
  Modal.confirm({
    closable: true,
    cancelText: "重新选择",
    content: `是否和经理确认，样品邮寄到${item.name}？`,
    onOk: () => {
      formState.deliveryAddress = item.id;
    },
  });
};
const formState = reactive({
  layout: "horizontal",
  type: 0,
  magnetism: 0,
  group: [
    {
      sampleNum: 1,
      sampleNo: [],
      goal: 1,
      addition: [],
    },
  ],
  recycleAddress: [
    {
      receiver: "zoom",
      phone: "12738921382",
      detailAddress: "北京啊就是劳动",
      address: ["130000", "130200", "130203"],
      fullAddress: "北京市建立的撒开的",
    },
    {
      receiver: "sss",
      phone: "12738921382",
      address: ["130000", "130200", "130203"],
      detailAddress: "北京啊就是劳动",
      isdefault: 1,
      fullAddress: "北京市建立的撒开的",
    },
  ],
  fee: 0,
  recycle: 0,
  device: 0,
  deliveryAddress: "1",
  message: "",
});

const headers = {
  authorization: "authorization-text",
};
const cost = ref(0);
const handleChange = (info) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};
const addItem = () => {
  formState.group.push({
    sampleNum: 1,
    sampleNo: [],
    time: 1,
    addition: [],
  });
};
const showModal = () => {
  visible.value = true;
};

const hideModal = () => {
  visible.value = false;
};

const handleOk = () => {
  if (!editAddress.isEditInvoice) {
    formState.recycleAddress.push({
      ...modelRef,
    });
  } else {
    formState.recycleAddress.splice(editAddress.editIndex, 1, {
      ...modelRef,
    });
  }
  hideModal();
};
const deleteItem = (idx) => {
  const group = formState.group;
  if (group.length <= 1) return;
  group.splice(idx, 1);
  formState.group = group;
};
const initFullName = (e, option) => {
  let fullName = "";
  option.forEach((item) => {
    fullName += item.label;
  });
  modelRef.fullAddress =
    fullName + formState.recycleAddress[editAddress.editIndex].detailAddress;
};
const labelCol = {
  span: 3,
};
let sampleNo = ref([[1]]);

const readme = ref([
  "啊看黄金时代卡是多久啊",
  "啊看黄金时代卡是多久啊",
  "啊看黄金时代卡是多久啊",
  "啊看黄金时代卡是多久啊",
]);
const activeKey = ref(["2", "3"]);

const canNext = () => {
  validate()
    .then(() => {
      // debugger
      emit("next");
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const { resetFields, validate, validateInfos } = useForm(
  formState,
  reactive({
    type: [
      {
        required: true,
        message: "请选择",
      },
    ],
    magnetism: [
      {
        required: true,
        message: "请输入",
      },
    ],
    group: [],
  })
);
</script>

<template>
  <!-- 第一步 -->
  <main
    id="components-affix-demo-target"
    ref="containerRef"
    class="scrollable-container"
  >
    <a-form :model="formState" labelAlign="right">
      <div class="first-step">
        <a-collapse v-model:activeKey="activeKey" expand-icon-position="left">
          <a-collapse-panel key="1" header="预约须知">
            <p v-for="(item, index) in readme" :key="index">
              {{ ++index }}.{{ item }}
            </p>
            <template #extra><CalendarTwoTone /></template>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="全局问题" :disabled="false">
            <a-form-item
              label="送样单"
              v-bind="validateInfos.type"
              class="no-margin"
            >
              <a-upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                directory
              >
                <a-button>
                  <UploadOutlined />
                  点击上传送样单
                </a-button>
              </a-upload>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel
            v-for="(item, index) in formState.group"
            :header="`第${index + 1}组样品数据`"
            :key="index + 3"
            :disabled="false"
          >
            <template #extra
              ><PlusSquareTwoTone
                style="margin-right: 10px"
                @click.stop="addItem" /><DeleteTwoTone
                @click.stop="deleteItem(index)"
            /></template>
            <a-form-item
              label="样品数量"
              :rules="{
                required: true,
                message: '请输入',
                trigger: 'change',
              }"
            >
              <a-input
                type="number"
                v-model:value="formState.group[index].sampleNum"
                placeholder="请输入样品数量"
                :max-length="25"
                style="width: 120px"
              />
            </a-form-item>
            <a-form-item
              label="样品编号"
              :rules="{
                message: '请输入',
                trigger: 'change',
              }"
            >
              <a-input
                v-for="(item, idx) in sampleNo[index]"
                :key="idx"
                placeholder="请输入"
                style="width: 120px; margin-right: 10px; margin-bottom: 10px"
                v-model:value="formState.group[index].sampleNo[idx]"
              >
                <template #prefix> {{ idx + 1 }}- </template>
              </a-input>
            </a-form-item>
            <a-form-item
              label="实验目的"
              :rules="{
                required: true,
                message: '请输入',
                trigger: 'change',
              }"
              class="no-margin"
            >
              <a-input
                v-model:value="formState.group[index].goal"
                placeholder="请输入"
                style="width: 160px"
              />
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel
            :key="formState.group.length + 2"
            header="样品寄送条件"
            :disabled="false"
          >
            <a-form-item label="同台设备" v-bind="validateInfos.device">
              <a-radio-group
                v-model:value="formState.device"
                button-style="solid"
              >
                <a-radio-button :value="0">
                  不需要
                  <a-popover placement="topLeft">
                    <template #content>
                      <p>
                        如果您需要和历史订单使用相同的设备测试，请选择“需要”并指定之前的订单号。
                      </p>
                    </template>
                    <template #title>
                      <span>提醒</span>
                    </template>
                    <QuestionCircleTwoTone />
                  </a-popover>
                </a-radio-button>
                <a-radio-button :value="1">需要</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              ::label-col="labelCol"
              label="是否回收"
              v-bind="validateInfos.recycle"
              class="no-margin"
            >
              <a-radio-group
                v-model:value="formState.recycle"
                button-style="solid"
              >
                <a-radio-button :value="0">
                  不回收
                  <a-popover placement="topLeft">
                    <template #content>
                      <p>
                        回收时没法保证样品100%不被污染
                        回收流程较繁琐，且部分测试对样品有破坏，如您的样品足够，建议不要选择回收
                      </p>
                    </template>
                    <template #title>
                      <span>提醒</span>
                    </template>
                    <QuestionCircleTwoTone />
                  </a-popover>
                </a-radio-button>
                <a-radio-button :value="1">回收</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              v-if="formState.recycle == 1"
              ::label-col="labelCol"
              label="回收地址"
              v-bind="validateInfos.recycleAddress"
            >
              <div
                class="recovery-address"
                v-for="(item, index) in formState.recycleAddress"
                :key="item"
                v-show="item.isdefault"
              >
                <div class="default">
                  <div class="content">
                    <div>
                      <span class="name">{{ item.receiver }}</span>
                      <span class="phone">{{ item.phone }}</span>
                    </div>
                    <div>
                      <!---->
                      <span class="address">{{ item.fullAddress }}</span>
                    </div>
                  </div>
                  <div class="modify-button">
                    <a
                      class="b-edit"
                      @click.stop="
                        () => {
                          editAddress.isEditInvoice = true;
                          editAddress.editIndex = index;
                          const {
                            id,
                            receiver,
                            phone,
                            address,
                            detailAddress,
                            fullAddress,
                            isdefault,
                          } = formState.recycleAddress[index];
                          modelRef.id = id;
                          modelRef.receiver = receiver;
                          modelRef.phone = phone;
                          modelRef.address = address;
                          modelRef.detailAddress = detailAddress;
                          modelRef.fullAddress = fullAddress;
                          modelRef.isdefault = isdefault;
                          showModal();
                        }
                      "
                      >修改</a
                    >
                  </div>
                </div>
              </div>
              <a-collapse
                style="width: 545px; margin-bottom: 15px"
                v-model:activeKey="activeKey1"
                accordion
                expandIconPosition="right"
                :bordered="false"
              >
                <a-collapse-panel key="1" header="其他地址">
                  <div
                    class="card-wrap card-uncheck"
                    v-for="(item, index) in formState.recycleAddress"
                    v-bind:key="item"
                    @click="
                      () => {
                        replaceChecked(index);
                      }
                    "
                  >
                    <div class="recovery-address recovery-address-each">
                      <div class="default">
                        <div class="content">
                          <div>
                            <span class="name">{{ item.receiver }}</span>
                            <span class="phone">{{ item.phone }}</span>
                          </div>
                          <div>
                            <!---->
                            <span class="address">{{ item.fullAddress }}</span>
                          </div>
                        </div>
                        <div class="modify-button">
                          <a
                            class="b-edit"
                            @click.stop="
                              () => {
                                editAddress.isEditInvoice = true;
                                editAddress.editIndex = index;
                                const {
                                  id,
                                  receiver,
                                  phone,
                                  address,
                                  detailAddress,
                                  fullAddress,
                                  isdefault,
                                } = formState.recycleAddress[index];
                                modelRef.id = id;
                                modelRef.receiver = receiver;
                                modelRef.phone = phone;
                                modelRef.address = address;
                                modelRef.detailAddress = detailAddress;
                                modelRef.fullAddress = fullAddress;
                                modelRef.isdefault = isdefault;
                                showModal();
                              }
                            "
                            >修改</a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </a-collapse-panel>
              </a-collapse>
              <div class="invoice-add">
                <a-button
                  type="dashed"
                  style="width: 545px"
                  @click="
                    () => {
                      editAddress.isEditInvoice = false;
                      showModal();
                    }
                  "
                  class="t-add"
                >
                  <div class="t-new-add t-blue">
                    <span class="text-add">+</span
                    ><span class="">新增地址</span>
                  </div>
                </a-button>
              </div>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel
            :key="formState.group.length + 3"
            header="寄样地址"
            :disabled="false"
          >
            <a-form-item label="运费" v-bind="validateInfos.fee">
              <a-radio-group v-model:value="formState.fee" button-style="solid">
                <a-radio-button :value="0">
                  运费到付
                  <a-popover placement="topLeft">
                    <template #content>
                      <p>选择运费到付，订单金额需加收12元快递费。</p>
                    </template>
                    <template #title>
                      <span>提醒</span>
                    </template>
                    <QuestionCircleTwoTone />
                  </a-popover>
                </a-radio-button>
                <a-radio-button :value="1">运费自付</a-radio-button>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              ::label-col="labelCol"
              label="寄样地址"
              v-bind="validateInfos.magnetism"
            >
              <div class="address-list f-fl addr_select_box">
                <div
                  v-for="item in addressList"
                  :key="item.id"
                  :class="{
                    default: item.id == formState.deliveryAddress,
                    li: true,
                  }"
                  @click="selectAdd(item)"
                >
                  {{ item.name }}
                </div>
              </div>
              <div class="fl addr post_addr_info">
                <div class="addr_title">
                  <h1 class="fl">曾老师</h1>
                </div>
                <div class="addr_body" style="position: relative">
                  <p>15818130780</p>
                  <div>
                    <EnvironmentOutlined />
                    <!-- <i class="iconfont com_icon_address"></i> -->
                    <span>广东省广州市海珠区</span>&nbsp;
                    <a
                      >新港东路68号华域创意园D1-2（非工作时间拒收同城，请提前联系）</a
                    >
                  </div>
                  <div class="sci-address-tips" style="display: none">
                    请寄顺丰快递！！！
                  </div>
                </div>
              </div>
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel
            :key="formState.group.length + 4"
            header="留言"
            :disabled="false"
          >
            <a-form-item label="实验留言" class="no-margin">
              <a-textarea v-model:value="formState.message" />
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </a-form>
    <a-affix :offset-bottom="bottom">
      <div class="d-flex">
        <div class="cost">
          合计费用：<a-button type="link">¥{{ cost }}</a-button>
        </div>
        <a-button style="display: block" @click="prev">保存草稿</a-button>
        <a-button
          style="margin-left: 8px; margin-right: 30px; display: block"
          type="primary"
          @click="canNext"
          >下一步</a-button
        >
      </div>
    </a-affix>
    <!-- 弹层 -->
    <a-modal
      class="prestore-modal-wrap"
      v-model:visible="visible"
      :title="editAddress.isEditInvoice ? '编辑地址信息' : '新增地址信息'"
      width="600px"
      @ok="handleOk"
      @cancel="
        () => {
          modelRef.receiver = '';
          modelRef.phone = '';
          modelRef.address = '';
          modelRef.detailAddress = '';
          modelRef.fullAddress = '';
          visible = false;
        }
      "
    >
      <form>
        <a-form-item
          label="收件人"
          :rules="{
            required: true,
            message: '请输入',
            trigger: 'change',
          }"
        >
          <a-input v-model:value="modelRef.receiver" placeholder="请输入" />
          <a-input v-model:value="modelRef.id" hidden />
        </a-form-item>
        <a-form-item
          label="联系电话"
          :rules="{
            required: true,
            message: '请输入',
            trigger: 'change',
          }"
        >
          <a-input v-model:value="modelRef.phone" placeholder="请输入" />
        </a-form-item>
        <a-form-item
          label="选择地区"
          :rules="{
            required: true,
            message: '请输入',
            trigger: 'change',
          }"
        >
          <a-cascader
            allowClear
            showSearch
            @change="initFullName"
            :options="areaData"
            v-model:value="modelRef.address"
          />
        </a-form-item>
        <a-form-item
          label="详细地址"
          :rules="{
            required: true,
            message: '请输入',
            trigger: 'change',
          }"
        >
          <a-input
            v-model:value="modelRef.detailAddress"
            placeholder="请输入"
          />
        </a-form-item>
      </form>
    </a-modal>
  </main>
</template>
<style lang="scss" scoped>
.cost {
  line-height: 32px;
  flex: 1;
  background: #fff;
}
.first-step {
  .ant-collapse-header-text {
    text-align: left !important;
  }
}

.steps-action {
  padding-top: 24px;
  background: #fff;
}
.d-flex {
  margin-top: 10px;
  padding: 15px 0 15px 10px;
  background: #fff;
  box-shadow: 3px 3px 4px 3px rgba(0, 0, 0, 0.1);
}
.ant-form-item-label {
  & > label {
    width: 81px !important;
  }
}
.upload {
  label {
    width: 81px !important;
  }
}
.addr_select_box {
  width: 350px;
  margin: 0 40px 0 0;
  padding: 12px 7px;
  background: rgba(22, 119, 225, 0.4);
  border: 1px solid #5284c9;
}
.addr_select_box .li {
  float: left;
  min-width: 82px;
  line-height: 28px;
  margin-bottom: 5px;
  padding: 0 5px;
  font-size: 14px;
  color: #000;
  text-align: center;
  cursor: pointer;
}
.addr_select_box .li:hover {
  background: #064cac;
  color: #fff;
}
.addr_select_box div.default {
  background: #064cac;
  color: #fff;
}
.addr_select_box div.active {
  line-height: 26px;
  background: #064cac;
  border: 1px solid #064cac;
  color: #fff;
}
.addr {
  width: 320px;
  height: 174px;
  float: left;
  padding: 0 10px;
  background: url("//statics.shiyanjia.com/c/yanlu/images/buffet/addr-bg.png")
    no-repeat;
  /*border: 1px solid #E8E8E8;*/
}
.addr_title {
  height: 53px;
  line-height: 52px;
  padding: 0 5px;
  border-bottom: 1px solid #e8e8e8;
}
.addr_title h1 {
  line-height: 52px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  font-weight: 500;
}
.addr_title span {
  font-size: 14px;
  color: #1890ff;
  font-weight: 500;
  cursor: pointer;
}
.addr_body p {
  margin: 17px 0 10px;
  line-height: 20px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
}
.addr_body div {
  position: relative;
  // padding-left: 32px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  font-weight: 500;
}
.addr_body div i {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 24px;
}
.addr_body div span {
  color: rgba(0, 0, 0, 0.75);
  font-weight: bold;
}
.addr_body div a {
  color: rgba(0, 0, 0, 0.65) !important;
}
.com_icon_address:before {
  content: "\e621";
}
.new_addr {
  line-height: 24px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
}
.new_addr img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.recovery-address {
  margin-bottom: 5px;
  line-height: normal;
}
.recovery-address .default {
  // margin-left:0;
  width: 545px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  padding: 11px 13px 2px 17px;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  // margin: 0 auto;
  border: 1px solid #4096ff;
}
.recovery-address .default .content {
  width: 418px;
}
.recovery-address .default .content div {
  margin-bottom: 9px;
}
.recovery-address .default .name {
  font-size: 16px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  margin-right: 8px;
}
.recovery-address .default .phone {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
}
.recovery-address .default .sign {
  width: 33px;
  height: 21px;
  line-height: 21px;
  background: #eff8f7;
  font-size: 12px;
  color: #56beb2;
  margin-right: 7px;
  display: inline-block;
  text-align: center;
}
.recovery-address .default .address {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}
.recovery-address .default .modify-button {
  cursor: pointer;
}
.recovery-address .default .modify-button a {
  font-size: 14px;
  color: #56beb2;
}
.recovery-address .default .modify-button a:hover {
  color: #16b799;
  text-decoration: underline;
}
.recovery-address .address-dialog .default {
  width: 469px;
  padding: 10px 16px;
  margin-bottom: 24px;
}
.recovery-address .address-dialog .add {
  cursor: pointer;
  margin-left: 28px;
  width: 20%;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
}
.recovery-address-each .default {
  cursor: pointer;
  width: 520px !important;
  border: 1px dashed #d9d9d9;
}
.recovery-address-each .default:hover {
  border: 1px solid #4096ff;
}
.no-margin {
  margin-bottom: 0 !important;
}
</style>