<script setup>
import { ref, computed, defineComponent, reactive} from "vue";
import Payment from "../../assets/order/payment.png";
// import Add from "../../assets/order/i-add.png";
import IconRecomends from "../../assets/order/i-ecommend.png";
import { notification, Form } from "ant-design-vue";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons-vue";

const formState = reactive({
  // layout: "horizontal",
  identity: "1",
  identitys: "1",
  // no: "",
  name: "",
});
const visible= ref(false);
const checked = ref(false);
const showModal = () => {
  visible = visible.value = true;
  // cancelText="取消";
  // Modal.method() =>{
  //    Modal.cancelText:"新增发票信息";

  // }
  // Modal.cancelText:"新增发票信息";
};
// const modal = Modal.info();

// modal.destroy();
// const handleOk = (e: MouseEvent) => {
//   console.log(e);
//   visible.value = false;
// };
// return {
//   visible,
//   showModal,
//   handleOk,
// };

// import TheWelcome from '@/components/Wx.vue';
// 预存页面prestore
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
              <button type="primary" class="payway b-base-button">
                对公转账
              </button>
              <button
                type="primary"
                class="payway b-base-button-active b-base-button"
              >
                扫码支付
              </button>
              <div class="i-img">
                <img :src="Payment" class="i-payment" />
              </div>
            </li>
            <li class="clear l-payment">
              <div class="t-title f-fl">
                <span class="t-red"> *</span>
                <span>预存账户：</span>
              </div>
              <a-button type="primary" class="b-base-button">个人账户</a-button>
            </li>
            <li class="clear l-payment">
              <div class="t-title f-fl">
                <span class="t-red"> *</span>
                <span>预存福利：</span>
              </div>
              <a-button type="primary" class="b-base-button">测试费</a-button>
            </li>
            <li class="clear l-payment">
              <div class="t-title f-fl">
                <span class="t-red"> *</span>
                <span>预存金额：</span>
              </div>
              <a-form-item class="f-fl">
                <a-input
                  style="
                    width: 250px;
                    height: 40px;
                    padding-left: 12px;
                    border: 1px solid rgba(0, 0, 0, 0.15);
                    border-radius: 4px;
                  "
                  placeholder="请输入预存金额(开票金额)"
                  class="t-gaincode f-fl"
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
                <a-input
                  style="
                    width: 250px;
                    height: 40px;
                    padding-left: 12px;
                    border: 1px solid rgba(0, 0, 0, 0.15);
                    border-radius: 4px;
                  "
                  placeholder="0"
                  class="t-gaincode f-fl"
                />
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
                class="electronic-invoices invoices-style-l invoices-style-active"
              >
                <p>电子增值税普通发票</p>
                <p>最快5分钟开具</p>
                <img :src="IconRecomends" class="i-payment" />
              </div>
              <div class="paper-invoices invoices-style-l">
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
                <span class="">0</span>
                <span>元</span>
              </div>
            </div>
            <div class="clear attached-files-li">
              <div class="t-title f-fl">附加文件：</div>
              <div class="attached-files f-fl">
                <a-radio-group
                  name="identitys"
                  v-model:value="formState.identitys"
                  style="height: 50px; line-height: 50px"
                >
                  <a-radio value="1">电子合同</a-radio>
                  <a-radio value="2">电子版测试清单</a-radio>
                  <a-radio value="3">电子报告</a-radio>
                </a-radio-group>
              </div>
            </div>
            <div class="clear">
              <div class="t-title f-fl">需方名称：</div>
              <div class="f-fl">
                <!-- <a-form-item>
                  <a-input placeholder="请输入手机号" />
                </a-form-item> -->
                <a-form-item class="f-fl">
                  <a-input
                    style="width: 180px"
                    placeholder=""
                    class="t-gaincode f-fl"
                  >
                    <template #suffix>
                      <a-tooltip title="Extra information">
                        <a>修改</a>
                      </a-tooltip>
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
                    name="identity"
                    v-model:value="formState.identity"
                  >
                    <a-radio value="1">一张发票</a-radio>
                    <a-radio value="2">多张发票</a-radio>
                  </a-radio-group>
                </div>
                <a-form-item class="f-fl">
                    <a-input
                      placeholder="请输入数量"
                      style="
                        width: 100px;
                        height: 40px;
                        padding-left: 12px;
                        border: 1px solid rgba(0, 0, 0, 0.15);
                        border-radius: 4px;
                      "
                    />
                  </a-form-item>
              </div>
              <div class="clear item-detection">
                <div class="t-title f-fl">项目检测：</div>
                <div class="f-fl">
                  <a-form-item>
                    <a-input
                      placeholder="写于清单合同中的测试项目(可添加多个)"
                      style="
                        width: 550px;
                        height: 40px;
                        padding-left: 12px;
                        border: 1px solid rgba(0, 0, 0, 0.15);
                        border-radius: 4px;
                      "
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
          <div class="h3 f-fl">发票抬头</div>
          <div class="invoice-add f-fl">
            <div class="t-new-add t-blue"><span class="text-add">+</span><span class="">新增发票抬头</span></div>
            <a-button type="primary" @click="showModal" class="t-add"></a-button>
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
            <a-form-item class="f-fl">
              <a-input
                style="
                  width: 300px;
                  height: 40px;
                  padding-left: 12px;
                  margin-bottom: 0px;
                  border: 1px solid rgba(0, 0, 0, 0.15);
                  border-radius: 4px;
                "
                placeholder="请输入邮箱"
                class="t-gaincode f-fl"
              >
              </a-input>
            </a-form-item>
          </div>
          <div class="t-red mail-tips">请输入邮箱</div>
        </div>
      </div>
      <div class="m-button">
        <div class="m-submit">
          <button class="submit-button">提交预存申请</button>
        </div>
      </div>
    </form>
    <!-- 弹层 -->
    <a-modal v-model:visible="visible" title="新增发票信息" cancelText="取消" okText="确定" @ok="handleOk">
      <form>
        <!-- <h3>新增发票信息</h3> -->
        <div class="content-mask">
          <div class="m-mask clear">
            <div class="t-title f-fl"><span class="t-red">*</span>发票抬头：</div>
            <a-form-item class="f-fl">
              <a-input
                style="
                  width: 250px;
                  height: 40px;
                  padding-left: 12px;
                  border: 1px solid rgba(0, 0, 0, 0.15);
                  border-radius: 4px;
                "
                placeholder="仅填写开票抬头即可，例：浙江大学"
                class="t-gaincode f-fl"
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
                  style="
                    width: 250px;
                    height: 40px;
                    padding-left: 12px;
                    border: 1px solid rgba(0, 0, 0, 0.15);
                    border-radius: 4px;
                  "
                  placeholder="请输入"
                  class="t-gaincode f-fl"
                />
              </a-form-item>
            </div>
            <a-checkbox v-model:checked="checked" class="checkbox">无税号单位</a-checkbox>
          </div>
        </div>
        <div class="m-mask clear ">
          <div class="t-title f-fl">开户行名称：</div>
          <a-form-item class="f-fl">
            <a-input
              style="
                width: 250px;
                height: 40px;
                padding-left: 12px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                border-radius: 4px;
              "
              placeholder="请输入"
              class="t-gaincode f-fl"
            />
          </a-form-item>
        </div>
        <div class="m-mask clear">
          <div class="t-title f-fl">开户行账号：</div>
          <a-form-item class="f-fl">
            <a-input
              style="
                width: 250px;
                height: 40px;
                padding-left: 12px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                border-radius: 4px;
              "
              placeholder="请输入"
              class="t-gaincode f-fl"
            />
          </a-form-item>
        </div>
        <div class="m-mask clear">
          <div class="t-title f-fl">注册地址：</div>
          <a-form-item class="f-fl">
            <a-input
              style="
                width: 250px;
                height: 40px;
                padding-left: 12px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                border-radius: 4px;
              "
              placeholder="请输入"
              class="t-gaincode f-fl"
            />
          </a-form-item>
        </div>
        <div class="m-mask clear">
          <div class="t-title f-fl">注册电话：</div>
          <a-form-item class="f-fl">
            <a-input
              style="
                width: 250px;
                height: 40px;
                padding-left: 12px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                border-radius: 4px;
              "
              placeholder="请输入"
              class="t-gaincode f-fl"
            />
          </a-form-item>
        </div>
      </form>
    </a-modal>
    <TheWelcome />
  </main>
</template>
<style lang="scss">
.wrap-prestore{
  padding: 8px 30px 70px;
  background: #fff;
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
  height: 50px;
  margin-top: 15px;
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
.ticket{
  margin-top:6px;
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
.invoice-add {
  position: relative;
  width: 904px;
  height: 44px;
  background: #ffffff;
  border-radius: 2px;
  border: 1px dashed #1677ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer; 
  
  .t-add{
    width: 900px !important;
  height: 40px !important;
  background: #ffffff !important;
  // border-radius: 2px !important;
  border-radius: 2px !important;
  border: 1px dashed #1677ff !important;
  // border:none;
  box-shadow:none;
      color: #1677ff;
   cursor: pointer; 
   z-index: 999;
   opacity: 0;
  }
}
// .m-add{
//    position:absolute;
//   top:8px;
//   left: 390px;
//   display: block;
//   width: 16px;
//   height: 16px;
//   z-index: 99;
// }
// .i-add {
//   width: 100%;
//   height: 100%;
// }
.mail-tips {
  line-height: 20px;
  font-size: 12px;
  padding-left: 133px;
  padding-top: 3px;
}
.m-button {
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 20px;
  .m-submit {
    width: 100%;
    height: 80px;
    background: #ffffff;
    box-shadow: 0px -3px 6px 0px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    box-sizing: border-box;
  }
  .submit-button {
    width: 140px;
    height: 48px;
    background: #1677ff;
    line-height: 48px;
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
  .t-title{
    text-align: left;
    width: 100px;
  }
}
.m-mask{
  margin-bottom: 20px;
  .t-title{
    color: #606266;
  }
}
.checkbox{
  margin-left: 134px;
  margin-top:5px;
  color: #606266;
}
.t-new-add{
  position: absolute;
  top:10px;
  left: 420px;
  width: 100px;
  height: 20px;
  line-height: 20px;
  color: #1677ff !important;
  z-index: 999;
  font-size: 14px;
  .text-add{
    padding-right: 4px;
    font-size: 18px;
  }
}
</style>
