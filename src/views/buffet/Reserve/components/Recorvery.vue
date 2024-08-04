<template>
  <div>
    <a-form :model="formData" :labelCol="{ span: 5 }">
      <a-form-item label="是否回收">
        <a-radio-group v-model:value="formData.needRecovery" button-style="solid">
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
      <a-form-item v-if="formData.needRecovery == 1" label="回收地址">
        <div class="recovery-address" v-for="(item, index) in formData.recoveryAddress" :key="item"
          v-show="item.isdefault">
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
              <a class="b-edit" @click.stop="() => {
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
                } = formData.recoveryAddress[index];
                modelRef.id = id;
                modelRef.receiver = receiver;
                modelRef.phone = phone;
                modelRef.address = address;
                modelRef.detailAddress = detailAddress;
                modelRef.fullAddress = fullAddress;
                modelRef.isdefault = isdefault;
                showModal();
              }
                ">修改</a>
              <a-popconfirm title="你确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="() => {
                formData.recoveryAddress.splice(index, 1);
              }
                ">
                <a class="b-delete" style="margin-left: 10px" @click="() => {
                  formData.recoveryAddress.splice(index, 1);
                }
                  ">删除</a>
              </a-popconfirm>
            </div>
          </div>
        </div>
        <a-collapse style="width: 545px; margin-bottom: 15px" v-model:activeKey="activeKey1" accordion
          expandIconPosition="right" :bordered="false">
          <a-collapse-panel key="1" header="其他地址">
            <div class="card-wrap card-uncheck" v-for="(item, index) in formData.recoveryAddress" v-bind:key="item" @click="() => {
              replaceChecked(index);
            }
              ">
              <div class="recovery-address recovery-address-each">
                <div class="default">
                  <div class="content">
                    <div>
                      <span class="name">{{ item.receiver }}</span>
                      <span class="phone">{{ item.phone }}</span>
                    </div>
                    <div>
                      <!---->
                      <span class="address">{{
                        item.fullAddress
                      }}</span>
                    </div>
                  </div>
                  <div class="modify-button">
                    <a class="b-edit" @click.stop="() => {
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
                      } = formData.recoveryAddress[index];
                      modelRef.id = id;
                      modelRef.receiver = receiver;
                      modelRef.phone = phone;
                      modelRef.address = address;
                      modelRef.detailAddress = detailAddress;
                      modelRef.fullAddress = fullAddress;
                      modelRef.isdefault = isdefault;
                      showModal();
                    }
                      ">修改</a>
                    <a-popconfirm title="你确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="() => {
                      formData.recoveryAddress.splice(index, 1);
                    }
                      ">
                      <a class="b-delete" style="margin-left: 10px" @click.stop="() => {
                        formData.recoveryAddress.splice(index, 1);
                      }
                        ">删除</a>
                    </a-popconfirm>
                  </div>
                </div>
              </div>
            </div>
          </a-collapse-panel>
        </a-collapse>
        <div class="invoice-add">
          <a-button type="dashed" style="width: 545px" @click="() => {
            editAddress.isEditInvoice = false;
            showModal();
          }
            " class="t-add">
            <div class="t-new-add t-blue">
              <span class="text-add">+</span><span class="">新增地址</span>
            </div>
          </a-button>
        </div>
      </a-form-item>
    </a-form>
    <!-- 弹层 -->
    <a-modal class="prestore-modal-wrap" v-model:visible="visible"
      :title="editAddress.isEditInvoice ? '编辑地址信息' : '新增地址信息'" width="600px" @ok="handleOk" @cancel="() => {
        modelRef.receiver = '';
        modelRef.phone = '';
        modelRef.address = '';
        modelRef.detailAddress = '';
        modelRef.fullAddress = '';
        visible = false;
      }
        ">
      <a-form>
        <a-form-item label="收件人" :rules="{
          required: true,
          message: '请输入',
          trigger: 'change',
        }">
          <a-input v-model:value="modelRef.receiver" placeholder="请输入" />
          <a-input v-model:value="modelRef.id" v-show="false" />
        </a-form-item>
        <a-form-item label="联系电话" :rules="{
          required: true,
          message: '请输入',
          trigger: 'change',
        }">
          <a-input v-model:value="modelRef.phone" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="选择地区" :rules="{
          required: true,
          message: '请输入',
          trigger: 'change',
        }">
          <a-cascader allowClear showSearch @change="initFullName" :options="areaData"
            v-model:value="modelRef.address" placeholder="请选择地址" />
        </a-form-item>
        <a-form-item label="详细地址" :rules="{
          required: true,
          message: '请输入',
          trigger: 'change',
        }">
          <a-input @input="(e) => {
            modelRef.fullAddress = modelRef.initAddress + e.target.value;
          }" v-model:value="modelRef.detailAddress" placeholder="请输入" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, watch } from "vue";
import { message } from "ant-design-vue";
import areaData from "@/public/area.js";
import { genUid } from "@/utils";
import {
  QuestionCircleTwoTone,
} from "@ant-design/icons-vue";

const props = defineProps({
  model: {
    type: Object,
    default: () => ({}),
  }
})
// const recoveryAddress = reactive([])
const formData = ref({});
watch(() => props.model, (val) => {
  formData.value = val
},{
  immediate: true
})

let modelRef = reactive({
  id: genUid(),
  receiver: "",
  phone: "",
  address: [],
  detailAddress: "",
  fullAddress: "",
});
const replaceChecked = (index) => {
  formData.value.recoveryAddress.forEach((item) => {
    item.isdefault = 0;
  });
  formData.value.recoveryAddress[index].isdefault = 1;
  message.info("设置成功");
};
let addressList = reactive({
  value: [],
  detail: {
    name: "",
    phone: "",
    detail_address: "",
    user: "",
  },
});
const editAddress = reactive({
  isEditInvoice: false,
  editIndex: 0,
});

const visible = ref(false)
const showModal = () => {
  visible.value = true;
};

const hideModal = () => {
  modelRef.receiver = '';
  modelRef.phone = '';
  modelRef.address = '';
  modelRef.detailAddress = '';
  modelRef.fullAddress = '';
  visible.value = false;
};

const handleOk = () => {
  if (!modelRef.receiver) {
    notification.error({
      message: "",
      description: "请填写收件人",
    });
    return;
  }

  if (!modelRef.phone) {
    notification.error({
      message: "",
      description: "请填写手机号",
    });
    return;
  }
  if (!modelRef.address) {
    notification.error({
      message: "",
      description: "请选择地区",
    });
    return;
  }
  if (!modelRef.detailAddress) {
    notification.error({
      message: "",
      description: "请填写详细地址",
    });
    return;
  }
  
  if (!editAddress.isEditInvoice) {
    formData.value.recoveryAddress.push({
      ...modelRef,
    });
  } else {
    formData.value.recoveryAddress.splice(editAddress.editIndex, 1, {
      ...modelRef,
    });
  }
  // console.log(formData.recoveryAddress)
  // debugger
  hideModal();
};
const initFullName = (e, option) => {
  let fullName = "";
  option.forEach((item) => {
    fullName += item.label;
  });
  // if (!formState?.formData.recoveryAddress) return;
  modelRef.initAddress = fullName;
  modelRef.fullAddress =  fullName + modelRef.detailAddress;
  // modelRef.fullAddress =
  //   fullName + formState?.formData.recoveryAddress[editAddress.editIndex].detailAddress;
  //   console.log(modelRef);
  };
</script>

<style lang="less" scoped>

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
  color: #1890ff;
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
  color: #1890ff;
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
</style>