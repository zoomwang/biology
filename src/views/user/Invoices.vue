<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent, onMounted } from "vue";
import { isLogged } from "../../services/user";
import {
  getInvoiceList,
  editInvoices,
  addInvoice,
  deleteInvoice,
} from "@/services/prestore";
import { Form } from "ant-design-vue";
import { copy } from "@/utils";
import checkIcon from "../../assets/prestore/bill67.png";
import uncheckIcon from "../../assets/prestore/bill66.png";
import defaultIcon from "../../assets/prestore/bill73.png";
import { notification, message } from "ant-design-vue";

const useForm = Form.useForm;
const formState = reactive({
  invoiceTitle: [],
});
const isShow = ref(true);
const initInvoiceList = async function () {
  try {
    const res = await getInvoiceList();
    if (res?.code == 0) {
      res?.data?.list?.forEach((item) => {
        item.checked = false;
      });
      for (let i = 0; i < res?.data.list.length; i++) {
        if (res.data.list[i].isdefault) {
          res.data.list[i].checked = true;
          break;
        }
      }
      formState.invoiceTitle = res?.data.list;
    }
  } catch (err) {}
};

const replaceChecked = (index) => {
  formState.invoiceTitle.forEach((item) => {
    item.isdefault = 0;
    item.checked = false;
  });
  formState.invoiceTitle[index].isdefault = 1;
  formState.invoiceTitle[index].checked = true;
  message.info("设置默认成功");
};

const deleteItem = async (data) => {
  const res = await deleteInvoice(data);
  if (res?.code == 0) {
    notification.success({
      description: "删除成功",
    });
    initInvoiceList();
  }
};
const originRef = reactive({
  value: {},
});
let modelRef = reactive({
  id: 0,
  invoiceid: 0,
  title: "",
  registrationo: "",
  depositbank: "",
  banksn: "",
  registaddress: "",
  registphone: "",
  isdefault: 1,
});
let visible = ref(false);
const editInvoice = reactive({
  isEditInvoice: false,
  editIndex: 0,
});

const showModal = () => {
  visible.value = true;
};

const hideModal = () => {
  visible.value = false;
};

const { resetFields, validate, validateInfos } = useForm(
  formState,
  reactive({
    amount: [
      {
        required: true,
        message: "预存金额不能少于1000",
        pattern: (num) => {
          return num >= 1000;
        },
      },
    ],
    mailBo: [
      {
        required: true,
        message: "请输入正确格式邮箱",
        pattern: /\w[-.\w]*\@[-a-z0-9]+(\.[-a-z0-9]+)*\.(com|cn|edu|uk)/gi,
      },
    ],
  })
);

const handleOk = async () => {
  let res;
  if (editInvoice.isEditInvoice) {
    res = await editInvoices(modelRef);
  } else {
    res = await addInvoice(modelRef);
  }
  if (res?.code == 0) {
    notification.success({
      description: editInvoice.isEditInvoice ? "编辑成功" : "新增成功",
    });
    initInvoiceList();
  }
  hideModal();
};
onMounted(() => {
  initInvoiceList();
});
</script>

<template>
  <!-- 发票抬头 -->
  <main>
    <div class="invoice-title">
      <div class="content-invoice clear">
        <div class="h3">发票抬头</div>
        <div
          class="card-wrap card-checked"
          v-for="(item, index) in formState.invoiceTitle"
          v-bind:key="item"
          v-show="item.checked"
          @click="
            () => {
              replaceChecked(index);
            }
          "
        >
          <a-descriptions class="card-list card-list-active" :column="2">
            <a-descriptions-item label="发票抬头"
              ><span>{{ item.title }}</span
              ><img
                width="40"
                height="18"
                class="default-icon"
                style=""
                :src="defaultIcon"
            /></a-descriptions-item>
            <a-descriptions-item label="企业税号">{{
              item.registrationo
            }}</a-descriptions-item>
            <a-descriptions-item label="开户行名称">{{
              item.depositbank
            }}</a-descriptions-item>
            <a-descriptions-item label="开户行帐号">{{
              item.banksn
            }}</a-descriptions-item>
            <a-descriptions-item label="注册地址">
              {{ item.registaddress }}
            </a-descriptions-item>
            <a-descriptions-item label="注册电话">
              {{ item.registphone }}
            </a-descriptions-item>
          </a-descriptions>
          <div class="edit-btn-wrap">
            <a
              class="b-edit"
              @click.stop="
                () => {
                  editInvoice.isEditInvoice = true;
                  editInvoice.editIndex = index;
                  const {
                    id,
                    invoiceid,
                    title,
                    registrationo,
                    depositbank,
                    banksn,
                    registaddress,
                    registphone,
                    checked,
                  } = formState.invoiceTitle[index];
                  modelRef.id = id;
                  modelRef.invoiceid = invoiceid;
                  modelRef.title = title;
                  modelRef.registrationo = registrationo;
                  modelRef.detailAddress = detailAddress;
                  modelRef.depositbank = depositbank;
                  modelRef.banksn = banksn;
                  modelRef.registaddress = registaddress;
                  modelRef.registphone = registphone;
                  modelRef.isdefault = isdefault;
                  modelRef.checked = checked;
                  originRef.value = JSON.parse(JSON.stringify(modelRef));
                  showModal();
                }
              "
              >修改</a
            >
            <a-popconfirm
              title="你确定要删除吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm.stop="
                () => {
                  deleteItem(formState.invoiceTitle[index]);
                }
              "
            >
              <a
                class="b-delete"
                @click.stop="
                  () => {
                    formState.invoiceTitle.splice(index, 1);
                  }
                "
                >删除</a
              >
            </a-popconfirm>
          </div>
          <img :src="checkIcon" class="card-icon icon-check" />
        </div>
        <div
          class="card-wrap card-uncheck"
          v-for="(item, index) in formState.invoiceTitle"
          v-bind:key="item"
          v-show="!item.checked"
          @click.stop="
            () => {
              replaceChecked(index);
            }
          "
        >
          <a-descriptions class="card-list" :column="2">
            <a-descriptions-item label="发票抬头">{{
              item.title
            }}</a-descriptions-item>
            <a-descriptions-item label="企业税号">{{
              item.registrationo
            }}</a-descriptions-item>
            <a-descriptions-item label="开户行名称">{{
              item.depositbank
            }}</a-descriptions-item>
            <a-descriptions-item label="开户行帐号">{{
              item.banksn
            }}</a-descriptions-item>
            <a-descriptions-item label="注册地址">
              {{ item.registaddress }}
            </a-descriptions-item>
            <a-descriptions-item label="注册电话">
              {{ item.registphone }}
            </a-descriptions-item>
          </a-descriptions>
          <div class="edit-btn-wrap">
            <a
              class="b-edit"
              @click.stop="
                () => {
                  editInvoice.isEditInvoice = true;
                  editInvoice.editIndex = index;
                  modelRef = formState.invoiceTitle[index];
                  originRef.value = JSON.parse(JSON.stringify(modelRef));
                  showModal();
                }
              "
              >修改</a
            >
            <a-popconfirm
              title="你确定要删除吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm.stop="
                () => {
                  formState.invoiceTitle.splice(index, 1);
                  deleteItem(formState.invoiceTitle[index]);
                }
              "
            >
              <a class="b-delete" @click.stop="">删除</a>
            </a-popconfirm>
          </div>
          <img :src="checkIcon" class="card-icon icon-check" />
          <img :src="uncheckIcon" class="card-icon icon-uncheck" />
        </div>
        <div class="invoice-add">
          <div class="t-new-add t-blue">
            <span class="text-add">+</span><span class="">新增发票抬头</span>
          </div>
          <a-button
            type="primary"
            @click="
              () => {
                editInvoice.isEditInvoice = false;
                originRef.value = JSON.parse(JSON.stringify(modelRef));
                showModal();
              }
            "
            class="t-add"
          ></a-button>
        </div>
        <div></div>
      </div>
    </div>
    <!-- 弹层 -->
    <a-modal
      class="prestore-modal-wrap"
      v-model:visible="visible"
      :title="editInvoice.isEditInvoice ? '编辑发票信息' : '新增发票信息'"
      width="600px"
      @ok="handleOk"
      @cancel="
        () => {
          formState.invoiceTitle[editInvoice.editIndex] = originRef.value;
        }
      "
    >
      <form>
        <!-- <h3>新增发票信息</h3> -->
        <div class="content-mask">
          <div class="m-mask clear">
            <div class="t-title f-fl">
              <span class="t-red">*</span>发票抬头：
            </div>
            <a-form-item class="f-fl" v-show="false">
              <a-input v-model:value="modelRef.id" :defaultValue="0" hidden />
            </a-form-item>
            <a-form-item class="f-fl">
              <a-input
                v-model:value="modelRef.title"
                placeholder="仅填写开票抬头即可，例：浙江大学"
                class="t-gaincode f-fl prestore-input"
              />
            </a-form-item>
          </div>
          <div class="m-mask">
            <div class="inner-mask-num clear">
              <div class="t-title f-fl">
                <span class="t-red">*</span>企业税号：
              </div>
              <a-form-item class="f-fl clear">
                <a-input
                  v-model:value="modelRef.registrationo"
                  placeholder="请输入"
                  class="t-gaincode f-fl prestore-input"
                />
              </a-form-item>
            </div>
            <a-checkbox v-model:checked="checked" class="checkbox"
              >无税号单位</a-checkbox
            >
          </div>
        </div>
        <div class="m-mask clear">
          <div class="t-title f-fl">开户行名称：</div>
          <a-form-item class="f-fl">
            <a-input
              v-model:value="modelRef.depositbank"
              placeholder="请输入"
              class="t-gaincode f-fl prestore-input"
            />
          </a-form-item>
        </div>
        <div class="m-mask clear">
          <div class="t-title f-fl">开户行账号：</div>
          <a-form-item class="f-fl">
            <a-input
              v-model:value="modelRef.banksn"
              placeholder="请输入"
              class="t-gaincode f-fl prestore-input"
            />
          </a-form-item>
        </div>
        <div class="m-mask clear">
          <div class="t-title f-fl">注册地址：</div>
          <a-form-item class="f-fl">
            <a-input
              v-model:value="modelRef.registaddress"
              placeholder="请输入"
              class="t-gaincode f-fl prestore-input"
            />
          </a-form-item>
        </div>
        <div class="m-mask clear">
          <div class="t-title f-fl">注册电话：</div>
          <a-form-item class="f-fl">
            <a-input
              v-model:value="modelRef.registphone"
              placeholder="请输入"
              class="t-gaincode f-fl prestore-input"
            />
          </a-form-item>
        </div>
      </form>
    </a-modal>
  </main>
</template>
<style lang="scss">
.prestore-modal-wrap {
  width: 600px !important;
}
.card-list {
  padding: 15px;
  // background: #FBFFFF;
  border: 1px solid #eeeeee;
  cursor: pointer;
}
.card-list-active,
.card-list:hover {
  background: #fbffff;
  border-color: #4096ff;
}
.card-wrap {
  position: relative;
  .card-icon {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 36px;
    height: 36px;
  }
  .default-icon {
    position: relative;
    top: 4px;
    margin-left: 3px;
  }
}
.card-wrap:hover {
  .icon-uncheck {
    display: none;
  }
  .edit-btn-wrap {
    display: block;
  }
}
.card-checked {
  // padding: 16px;
  padding-bottom: 0;
  .card-icon {
    right: 0;
    bottom: 0;
  }
}
.card-uncheck,
.card-checked {
  margin-bottom: 10px;
}
.content-invoice {
  .ant-descriptions-item-content {
  }
}
.wrap-prestore {
  padding: 8px 30px 0;
  background: #fff;
  .ant-collapse {
    background: transparent;
  }
}
.h3 {
  line-height: 22px;
  padding: 16px 0;
  font-size: 16px;
  color: #333;
  font-weight: bold;
}
.payment {
  .tips {
    margin: 20px -10px 50px;
    padding: 20px 10px;
    background-color: rgba(254, 160, 0, 0.1);
    font-size: 16px;
    line-height: 30px;
    color: #fea000;
  }
}
.t-title {
  width: 134px;
  line-height: 20px;
  padding: 10px 22px 10px 0;
  font-size: 14px;
  color: #000;
  text-align: right;
}
.l-payment {
  min-height: 40px;
  height: 60px;
  margin-bottom: 5px;
}
.t-unil {
  line-height: 34px;
  // padding: 10px 22px 10px 0;
  padding-left: 5px;
  font-size: 14px;
  color: #000;
}
.lfirst-payment {
  position: relative;
  height: 80px;
  // margin-top: 40px;
  .i-img {
    position: absolute;
    display: block;
    width: 154px;
    height: 38px;
    top: 40px;
    left: 240px;
    z-index: 9;
    .i-payment {
      width: 100%;
      height: 100%;
    }
  }
}
.custom {
  display: block;
  width: 580px;
  height: 74px;
  padding: 10px;
  font-family: "PingFang SC", "Microsoft YaHei", "Arial Narrow", "SimSun",
    HELVETICA;
  font-size: 14px;
  border: 1px solid #dedede !important;
  resize: none;
}
.l-remark {
  height: 120px;
}
.remark-tips {
  // display: inline;
  font-size: 12px;
  padding-left: 135px;
}
.invoice-style {
  .t-title {
    line-height: 60px;
  }
  .invoices-style-l {
    position: relative;
    float: left;
    width: 180px;
    height: 64px;
    margin-right: 20px;
    padding: 7px 0 4px;
    font-size: 14px;
    text-align: center;
    border: 1px solid #dedede;
    cursor: pointer;
    p {
      margin-bottom: 0px;
      line-height: 26px;
      font-size: 14px;
      // color: #424242;
    }
  }
  .invoices-style-active {
    background-color: #1677ff;
    color: #fff !important;
  }
  .i-payment {
    position: absolute;
    top: -1px;
    right: -1px;
    display: block;
    width: 26px;
    height: 20px;
  }
}
.total-invoice {
  height: 40px;
  line-height: 40px;
  .total-ticket span {
    display: inline;
    line-height: 20px;
  }
}
.ticket {
  margin-top: 6px;
}
.attached-files-li {
  height: 50px;
  line-height: 50px;
  .t-title {
    line-height: 30px;
  }
}
.tips {
  display: inline-block;
  line-height: 28px;
  margin-left: 20px;
  font-size: 14px;
}
.invoices-detection {
  width: 814px;
  margin: 10px 0 0 10px;
  padding: 20px 10px;
  background: #fafafa;
}
.need-some-invoices {
  margin-bottom: 20px;
}
.need-some-invoices,
.item-detection {
  .t-title {
    text-align: left;
  }
}
.invoice-title-addr {
  line-height: 20px;
}
.invoice-title-addr::before {
  display: inline-block;
  content: "";
  width: 4px;
  height: 20px;
  background: #1677ff;
  margin-right: 8px;
}
.app_tips {
  margin-bottom: 17px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 20px;
}
.content-invoice,
.content-invoice-mail {
  padding: 20px 0 10px 44px;
  box-sizing: border-box;
}
.content-invoice {
  position: relative;
  .edit-btn-wrap {
    display: none;
    position: absolute;
    top: 30px;
    right: 30px;
    .b-delete {
      margin-left: 10px;
    }
  }
}
.invoice-add {
  position: relative;
  width: 835px;
  // margin-left: 15px;
  height: 44px;
  background: #ffffff;
  border-radius: 2px;
  border: 1px dashed #1677ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;

  .t-add {
    width: 900px !important;
    height: 40px !important;
    background: #ffffff !important;
    // border-radius: 2px !important;
    border-radius: 2px !important;
    border: 1px dashed #1677ff !important;
    // border:none;
    box-shadow: none;
    color: #1677ff;
    cursor: pointer;
    z-index: 999;
    opacity: 0;
  }
}
.mail-tips {
  line-height: 20px;
  font-size: 12px;
  padding-left: 133px;
  padding-top: 3px;
}
.m-button {
  width: 100%;
  margin: 0 auto 20px 20px;
  .m-submit {
    width: 100%;
    height: 80px;
    background: #ffffff;
    // box-shadow: 0px -3px 6px 0px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    box-sizing: border-box;
  }
  .submit-button {
    width: 140px;
    height: 48px;
    // background: #1677ff;
    // line-height: 48px;
    color: #fff;
    text-align: center;
    border-radius: 4px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    cursor: pointer;
    margin: 16px 0 0 30px;
  }
}
:where(.css-dev-only-do-not-override-b92jn9).ant-form-item {
  margin-bottom: 0px;
}
.invoice-mail {
  // margin-top: 10px;
  .t-title {
    text-align: left;
    width: 100px;
  }
}
.m-mask {
  width: 700px;
  margin-bottom: 20px;
  .t-title {
    width: 120px;
    color: #606266;
  }
  .ant-form-item {
    width: 430px;
  }
  .prestore-input {
    width: 430px;
  }
}
.checkbox {
  margin-left: 124px;
  margin-top: 5px;
  color: #606266;
}
.t-new-add {
  position: absolute;
  top: 10px;
  left: 420px;
  width: 100px;
  height: 20px;
  line-height: 20px;
  color: #1677ff !important;
  z-index: 999;
  font-size: 14px;
  .text-add {
    padding-right: 4px;
    font-size: 18px;
  }
}
.prestore-input {
  width: 250px;
  height: 40px;
  padding-left: 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}
</style>