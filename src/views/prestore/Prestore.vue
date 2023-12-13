<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import Payment from "../../assets/order/payment.png";
import IconRecomends from "../../assets/order/i-ecommend.png";
import checkIcon from "../../assets/prestore/bill67.png";
import uncheckIcon from "../../assets/prestore/bill66.png";
import defaultIcon from "../../assets/prestore/bill73.png";
import Pay from "./Pay.vue";
import Apply from "./Apply.vue";
import { addStore, getStoreList, getInvoiceList } from "@/services/prestore";
import { notification, Form } from "ant-design-vue";

const useForm = Form.useForm;
const formState = reactive({
  // layout: "horizontal",
  payType: 0, //支付类型，0、1表示
  invoiceNum: 1, // 发票数量
  invoiceNumType: 1,
  payAccount: 0, //预存账户，0、1表示
  welfare: 0, //福利
  invoiceType: 0, //发票类型
  amount: 0, //预存金额
  rebate: 0, //预存返利
  remind: "", //预存备注
  invoiceCostList: [], // 发票金额列表
  addition: ["电子合同", "电子版测试清单", "电子报告"], //附加文件
  canEdit: false, // 是否可以点击编辑需求方名称，接口无需关注
  demand: "", //需求方名称
  detection: "", //项目检测
  mailBox: "", //收件邮箱
  // invoiceTitle: [{
  //   "invoiceid": 174304,
  //   "title": "广东工业大学",
  //   "registrationo": "12330000470003281H",
  //   "depositbank": "招商银行",
  //   "banksn": "",
  //   "registaddress": "阿时间考虑的",
  //   "registphone": "15086726356",
  //   "isdefault": 1,
  //   "checked": true,
  // },{
  //   "invoiceid": 174304,
  //   "title": "广东工业大学111",
  //   "registrationo": "12330000470003281H",
  //   "depositbank": "招商银行111",
  //   "banksn": "",
  //   "registaddress": "阿时间考虑的",
  //   "registphone": "15086726356",
  //   "isdefault": 1,
  //   // "checked": true,
  // }],
  invoiceTitle: [],
});
const formOptions = reactive({
  plainOptions: ["电子合同", "电子版测试清单", "电子报告"],
});
const defaultInvoice = {
  id: 0,
  invoiceid: 0,
  title: "",
  registrationo: "",
  depositbank: "",
  banksn: "",
  registaddress: "",
  registphone: "",
};

watch(formState, async (newdata, olddata) => {
  invoiceCostList.value = new Array(newdata.invoiceNum - 0);
});
const getRebate = () => {
  if (formState.amount > 5000 && formState.amount < 10000) {
    formState.rebate = formState.amount * 0.03;
    return formState.amount * 0.03;
  }
  if (formState.amount >= 10000 && formState.amount < 30000) {
    formState.rebate = formState.amount * 0.04;
    return formState.amount * 0.04;
  }
  if (formState.amount >= 30000 && formState.amount < 50000) {
    formState.rebate = formState.amount * 0.06;
    return formState.amount * 0.06;
  }
  if (formState.amount >= 50000 && formState.amount < 100000) {
    formState.rebate = formState.amount * 0.08;
    return formState.amount * 0.08;
  }
  if (formState.amount >= 100000) {
    formState.rebate = formState.amount * 0.1;
    return formState.amount * 0.1;
  }
  return 0;
};
let modelRef = reactive({
  // "invoiceid": "",
  // "title": "广东工业大学222",
  // "registrationo": "12330000470003281H",
  // "depositbank": "招商银行2",
  // "banksn": "441782783288",
  // "registaddress": "阿时间考虑的",
  // "registphone": "15086726356",
  // "isdefault": 1,
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
let invoiceCostList = ref([]);
let payVisible = ref(false);
const checked = ref(false);
const editInvoice = reactive({
  isEditInvoice: false,
  editIndex: 0,
});
const initInvoiceList = async function () {
  try {
    const res = await getInvoiceList();
    if (res?.code == 0) {
      formState.invoiceTitle = res?.data;
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
};

const showModal = () => {
  visible.value = true;
};

const hideModal = () => {
  visible.value = false;
};

const changeField = (type, value) => {
  formState[type] = value || !formState[type];
};

const handleOk = () => {
  if (!editInvoice.isEditInvoice) {
    formState.invoiceTitle.push(modelRef);
  } else {
    formState.invoiceTitle.splice(editInvoice.editIndex, 1, modelRef);
  }
  hideModal();
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

const onSubmit = () => {
  validate()
    .then(async (res) => {
      try {
        formState.invoiceNum = formState.invoiceNum - 0;
        formState.amount = formState.amount - 0;
        const newArr = formState.invoiceCostList.map((item) => {
          return item - 0;
        });
        formState.invoiceCostList = newArr;
        const data = await addStore({
          ...formState,
        });
        if (data?.code == 0) {
          // notification.success({
          //   description: "预存成功",
          // });
          payVisible.value = true;
        }
      } catch (err) {
        alert(err);
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};
// 预存页面prestore

onMounted(() => {
  initInvoiceList();
});
</script>

<template>
  <main class="wrap-prestore">
    <!-- 预存信息html -->
    <form class="content-prestore">
      <div class="payment">
        <div class="h3">预存信息</div>
        <div class="tips">
          注：1.计算预存返利时，以申请预存金额计算。2.订单使用预存支付或还款时，不赠送积分。3.自2024/01/01起，返利金额将只能用于订单支付和补差，不能用于还款。
        </div>
        <div class="mode-payment">
          <ul>
            <li class="clear lfirst-payment">
              <div class="t-title f-fl">
                <span class="t-red"> *</span>
                <span>支付方式：</span>
              </div>
              <a-button
                type="primary"
                class="b-base-button"
                :class="{ 'b-base-button-active': formState.payType }"
                @click="changeField('payType', 1)"
              >
                对公转账
              </a-button>
              <a-button
                type="primary"
                class="b-base-button"
                :class="{ 'b-base-button-active': !formState.payType }"
                @click="changeField('payType', 0)"
              >
                扫码支付
              </a-button>
              <div class="i-img">
                <img :src="Payment" class="i-payment" />
              </div>
            </li>
            <li class="clear l-payment">
              <div class="t-title f-fl">
                <span class="t-red"> *</span>
                <span>预存账户：</span>
              </div>
              <a-button
                type="primary"
                class="b-base-button"
                :class="{ 'b-base-button-active': !formState.payAccount }"
                >个人账户</a-button
              >
            </li>
            <li class="clear l-payment">
              <div class="t-title f-fl">
                <span class="t-red"> *</span>
                <span>预存福利：</span>
              </div>
              <a-button
                type="primary"
                class="b-base-button"
                :class="{ 'b-base-button-active': !formState.welfare }"
                >测试费</a-button
              >
            </li>
            <li class="clear l-payment">
              <div class="t-title f-fl">
                <span class="t-red"> *</span>
                <span>预存金额：</span>
              </div>
              <a-form-item class="f-fl" v-bind="validateInfos.amount">
                <a-input
                  type="number"
                  placeholder="请输入预存金额(开票金额)"
                  class="t-gaincode f-fl prestore-input"
                  style="width: 250px"
                  v-model:value="formState.amount"
                />
              </a-form-item>
              <span class="t-unil">元</span>
            </li>
            <li class="clear l-payment">
              <div class="t-title f-fl">
                <span class="t-red"> *</span>
                <span>预计返利：</span>
              </div>
              <a-form-item class="f-fl">
                <!-- <a-input
                  placeholder="0"
                  disabled
                  class="t-gaincode f-fl prestore-input"
                  style="width: 250px"
                  v-model:value="formState.rebate"
                /> -->
                {{ getRebate() }}
              </a-form-item>
              <span class="t-unil">元</span>
            </li>
            <li class="l-payment l-remark">
              <div class="clear">
                <div class="t-title f-fl">
                  <span>预存备注：</span>
                </div>
                <a-textarea
                  placeholder="1，若以下没有您需要的发票类型，请备注所需发票类型；2，若需要加急开票，请填写【加急】字样；3，其它需要留言"
                  class="custom f-fl"
                  style="min-height: 80px"
                  :maxlength="200"
                  v-model:value="formState.remind"
                />
              </div>
              <div id="charCount" class="remark-tips">
                当前已输入0字 / 最多200字
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 发票信息 -->
      <div class="invoice">
        <div class="h3">发票信息</div>
        <div class="invoice-msg">
          <div class="invoice-ul">
            <div class="clear invoice-style">
              <div class="t-title f-fl">
                <span class="t-red">*</span>
                <span>发票类型：</span>
              </div>
              <div
                class="electronic-invoices invoices-style-l"
                :class="{ 'invoices-style-active': !formState.invoiceType }"
                @click="changeField('invoiceType', 0)"
              >
                <p>电子增值税普通发票</p>
                <p>最快5分钟开具</p>
                <img :src="IconRecomends" class="i-payment" />
              </div>
              <div
                class="paper-invoices invoices-style-l"
                :class="{ 'invoices-style-active': formState.invoiceType }"
                @click="changeField('invoiceType', 1)"
              >
                <p>纸质增值税专用发票</p>
                <p>预计7天内送达</p>
              </div>
            </div>
            <div class="total-invoice clear">
              <div class="t-title f-fl">
                <span class="t-red">*</span>
                <span>开票总额：</span>
              </div>
              <div class="total-ticket f-fl">
                <span class="">{{ formState.amount }}</span>
                <span>元</span>
              </div>
            </div>
            <div class="clear attached-files-li">
              <div class="t-title f-fl">附加文件：</div>
              <div class="attached-files f-fl">
                <a-checkbox-group
                  name="addition"
                  v-model:value="formState.addition"
                  :options="formOptions.plainOptions"
                />
              </div>
            </div>
            <div class="clear">
              <div class="t-title f-fl">需方名称：</div>
              <div class="f-fl">
                <a-form-item class="f-fl">
                  <a-input
                    style="width: 180px"
                    placeholder=""
                    class="t-gaincode f-fl"
                    :disabled="!formState.canEdit"
                    v-model:value="formState.demand"
                  >
                    <template #suffix>
                      <a
                        @click="
                          () => {
                            formState.canEdit = !formState.canEdit;
                          }
                        "
                        >{{ !formState.canEdit ? "修改" : "确定" }}</a
                      >
                    </template>
                  </a-input>
                </a-form-item>
                <span class="tips t-orange"
                  >需方名称是指您的清单、合同等文件中注明的需方单位名称</span
                >
              </div>
            </div>
            <div class="invoices-detection">
              <div class="need-some-invoices clear">
                <div class="t-title f-fl">
                  <span class="t-red">*</span>
                  <span>需要几张发票：</span>
                </div>
                <div class="total-ticket ticket f-fl">
                  <a-radio-group
                    name="invoiceNum"
                    v-model:value="formState.invoiceNumType"
                  >
                    <a-radio :value="1">一张发票</a-radio>
                    <a-radio :value="2">多张发票</a-radio>
                  </a-radio-group>
                </div>
                <a-form-item class="f-fl" v-if="formState.invoiceNumType == 2">
                  <a-input
                    placeholder="请输入数量"
                    class="prestore-input"
                    style="width: 100px"
                    v-model:value="formState.invoiceNum"
                  />
                </a-form-item>
              </div>
              <div
                class="clear item-detection"
                v-if="formState.invoiceNumType == 2"
              >
                <div
                  class="t-title f-fl"
                  style="text-align: right !important; padding-right: 30px"
                >
                  发票金额：
                </div>
                <div class="f-fl" style="width: 80%">
                  <a-form-item>
                    <a-input
                      type="number"
                      v-for="(item, index) in invoiceCostList"
                      :key="item"
                      placeholder="请输入这张发票金额"
                      class="prestore-input"
                      style="
                        width: 200px;
                        margin-right: 10px;
                        margin-bottom: 10px;
                      "
                      v-model:value="formState.invoiceCostList[index]"
                    />
                  </a-form-item>
                </div>
              </div>
              <div class="clear item-detection">
                <div
                  class="t-title f-fl"
                  style="text-align: right !important; padding-right: 30px"
                >
                  项目检测：
                </div>
                <div class="f-fl">
                  <a-form-item>
                    <a-input
                      placeholder="写于清单合同中的测试项目(可添加多个)"
                      class="prestore-input"
                      style="width: 550px"
                      v-model:value="formState.detection"
                    />
                  </a-form-item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 发票抬头及地址 -->
      <div class="invoice-title">
        <div class="">
          <div class="invoice-title-addr h3">发票抬头及地址</div>
          <div class="app_tips">
            请核实发票抬头及以下内容是否正确，如果不正确请编辑并保存。
          </div>
        </div>
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
                @click="
                  () => {
                    editInvoice.isEditInvoice = true;
                    editInvoice.editIndex = index;
                    modelRef = formState.invoiceTitle[index];
                    showModal();
                  }
                "
                >修改</a
              >
              <a-popconfirm
                title="你确定要删除吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="
                  () => {
                    formState.invoiceTitle.splice(index, 1);
                  }
                "
              >
                <a
                  class="b-delete"
                  @click="
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
          <a-collapse
            v-model:activeKey="activeKey"
            accordion
            expandIconPosition="right"
            :bordered="false"
          >
            <a-collapse-panel key="1" header="使用其他抬头">
              <div
                class="card-wrap card-uncheck"
                v-for="(item, index) in formState.invoiceTitle"
                v-bind:key="item"
                v-show="!item.checked"
                @click="
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
                    @click="
                      () => {
                        editInvoice.isEditInvoice = true;
                        editInvoice.editIndex = index;
                        modelRef = formState.invoiceTitle[index];
                        showModal();
                      }
                    "
                    >修改</a
                  >
                  <a-popconfirm
                    title="你确定要删除吗？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="
                      () => {
                        formState.invoiceTitle.splice(index, 1);
                      }
                    "
                  >
                    <a class="b-delete">删除</a>
                  </a-popconfirm>
                </div>
                <img :src="checkIcon" class="card-icon icon-check" />
                <img :src="uncheckIcon" class="card-icon icon-uncheck" />
              </div>
            </a-collapse-panel>
          </a-collapse>
          <div class="invoice-add">
            <div class="t-new-add t-blue">
              <span class="text-add">+</span><span class="">新增发票抬头</span>
            </div>
            <a-button
              type="primary"
              @click="
                () => {
                  editInvoice.isEditInvoice = false;
                  showModal();
                }
              "
              class="t-add"
            ></a-button>
          </div>
          <div></div>
        </div>
        <div class="content-invoice-mail">
          <div class="h3">电子发票收件邮箱</div>
          <div class="invoice-mail clear">
            <div class="f-fl t-title">
              <span class="t-red">*</span>
              <span>收件邮箱：</span>
            </div>
            <a-form-item class="f-fl" v-bind="validateInfos.mailBox">
              <a-input
                placeholder="请输入邮箱"
                class="t-gaincode f-fl prestore-input"
                v-model:value="formState.mailBox"
              >
              </a-input>
            </a-form-item>
          </div>
          <div class="t-red mail-tips">请输入邮箱</div>
        </div>
      </div>
      <div class="m-button">
        <div class="m-submit">
          <a-button
            type="primary"
            class="submit-button"
            @click.prevent="onSubmit"
            >提交预存申请</a-button
          >
        </div>
      </div>
    </form>
    <!-- 弹层 -->
    <a-modal
      class="prestore-modal-wrap"
      v-model:visible="visible"
      :title="editInvoice.isEditInvoice ? '编辑发票信息' : '新增发票信息'"
      width="600px"
      @ok="handleOk"
      @cancel="
        () => {
          modelRef = defaultInvoice;
          visible = false;
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
    <!-- 支付弹层 -->
    <a-modal
      class="prestore-modal-wrap"
      v-model:visible="payVisible"
      :title="formState.payType == 1 ? '在线支付' : '申请提示'"
      width="400px"
      :footer="null"
    >
      <Pay v-if="formState.payType == 0" />
      <Apply :detail="formState" v-else />
    </a-modal>
    <TheWelcome />
  </main>
</template>
<style lang="scss" scoped>
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
  padding: 16px;
  padding-bottom: 0;
  .card-icon {
    right: 16px;
    bottom: 0;
  }
}
.card-uncheck {
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
  margin-left: 15px;
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
