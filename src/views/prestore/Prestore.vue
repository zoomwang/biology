<script setup>
import { ref, computed, defineComponent, reactive } from "vue";
import Payment from "../../assets/order/payment.png";
import Add from "../../assets/order/i-add.png";
import { notification, Form } from "ant-design-vue";
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';

const formState = reactive({
  // layout: "horizontal",
  identity: "1",
  // no: "",
  name: "",
});
// import TheWelcome from '@/components/Wx.vue';
// 预存页面prestore
</script>

<template>
  <main>
    <!-- 预存信息html -->
    <p>预存页面prestore</p>
    <div class="content-prestore">
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
              <button type="primary" class="payway b-base-button">对公转账</button>
              <button type="primary" class="payway b-base-button-active b-base-button">扫码支付</button>
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
                  style="width: 250px;height: 40px;
    padding-left: 12px;
    border: 1px solid rgba(0, 0, 0, .15);
    border-radius: 4px;"
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
                  style="width: 180px"
                  placeholder="0"
                  class="t-gaincode f-fl"
                />
              </a-form-item>
              <span class="t-unil">元</span>
            </li>
            <li class="clear l-payment l-remark">
              <div class="t-title f-fl">
                <span>预存备注：</span>
              </div>
              <a-textarea
                placeholder="1，若以下没有您需要的发票类型，请备注所需发票类型；2，若需要加急开票，请填写【加急】字样；3，其它需要留言"
                class="custom"
                style="height: 50px"
              />
              <div id="charCount">当前已输入0字 / 最多200字</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 发票信息 -->
      <div class="invoice">
        <div class="h3">发票信息</div>
        <div class="invoice-msg">
          <ul>
            <li class="clear invoice-style">
              <div class="t-title f-fl">
                <span class="t-red">*</span>
                <span>发票类型</span>
              </div>
              <div class="electronic-invoices">
                <p>电子增值税普通发票</p>
                <p>最快5分钟开具</p>
              </div>
              <div class="paper-invoices">
                <p>纸质增值税专用发票</p>
                <p>预计7天内送达</p>
              </div>
            </li>
            <li class="total-invoice clear">
              <div class="t-title f-fl">
                <span class="t-red">*</span>
                <span>开票总额</span>
              </div>
              <div class="total-ticket f-fl">
                <span class="">0</span>
                <span>元</span>
              </div>
            </li>
            <li class="clear">
              <div class="t-title f-fl">附加文件：</div>
              <div class="attached-files f-fl">
                <span>电子合同</span>
                <!-- 多选框没看到合适的 -->
              </div>
            </li>
            <li class="clear">
              <div class="t-title f-fl">需方名称：</div>
              <div class="f-fl">
                <!-- <a-form-item>
                  <a-input placeholder="请输入手机号" />
                </a-form-item> -->
                <a-form-item class="f-fl">
                <a-input
                  style="width: 180px"
                  placeholder="请输入手机号"
                  class="t-gaincode f-fl"
                >
      <template #suffix>
        <a-tooltip title="Extra information">
          <a>修改</a>
        </a-tooltip>
      </template>
                </a-input>
              </a-form-item>
                <span class="tips"
                  >需方名称是指您的清单、合同等文件中注明的需方单位名称</span
                >
              </div>
            </li>
            <li class="need-some-invoices clear">
              <div class="t-title f-fl">
                <span class="t-red">*</span>
                <span>需要几张发票：</span>
              </div>
              <div class="total-ticket f-fl">
                <a-radio-group
                  name="identity"
                  v-model:value="formState.identity"
                >
                  <a-radio value="1">一张发票</a-radio>
                  <a-radio value="2">多张发票</a-radio>
                </a-radio-group>
              </div>
            </li>
            <li class="clear item-detection">
              <div class="t-title f-fl">项目检测：</div>
              <div class="f-fl">
                <a-form-item>
                  <a-input placeholder="写于清单合同中的测试项目(可添加多个)" />
                </a-form-item>
              </div>
            </li>          
          </ul>
        </div>
      </div>
      <!-- 发票抬头及地址 -->
      <div class="invoice-title">
        <div class="">
          <div class="invoice-title-addr t-title">发票抬头及地址</div>
          <div class="app_tips">请核实发票抬头及以下内容是否正确，如果不正确请编辑并保存。</div>
        </div>
        <div class="content-invoice clear">
          <div class="h3 f-fl">发票抬头</div>
          <div class="invoice-add f-fl">
            <img class="i-add" :src="Add"/>
            <span>新增发票抬头</span>
          </div>
        </div>
        <div class="content-invoice-mail">
          <div class="h3">电子发票收件邮箱</div>
          <div class="invoice-mail clear">
            <div class="f-fl">
              <span class="t-red">*</span>
              <span>收件邮箱：</span>             
            </div>
            <a-form-item class="f-fl">
                <a-input
                  style="width: 180px"
                  placeholder="请输入邮箱"
                  class="t-gaincode f-fl"
                >
      <template #suffix>
        <a-tooltip title="Extra information">
          <a>修改</a>
        </a-tooltip>
      </template>
                </a-input>
              </a-form-item>
          </div>
        </div>
      </div>
      <div class="m-button">
        <button class="">提交预存申请</button>
      </div>
    </div>
    <TheWelcome />
  </main>
</template>
<style lang="scss">
.h3{
  line-height: 22px;
    padding: 16px 0;
    font-size: 16px;
    color: #333;
    font-weight: bold;
}
.payment{
  .tips{
    margin: 20px -10px 50px;
    padding: 20px 10px;
    background-color: rgba(254, 160, 0, 0.1);
    font-size: 16px;
    line-height: 30px;
    color: #FEA000;
  }
}
.t-title{
  width: 134px;
    line-height: 20px;
    padding: 10px 22px 10px 0;
    font-size: 14px;
    color: #000;
    text-align: right;
}
.l-payment{
  min-height: 40px;
  height: 50px;
  margin-top: 15px;
}
.lfirst-payment {
  position: relative;
  height: 80px;
  margin-top: 40px;
  .i-img {
    position: absolute;
    display: block;
    width: 154px;
    height: 38px;
    top: 40px;
    left: 240px;
    z-index: 9;
    .i-payment{
      width: 100%;
      height: 100%;
    }
  }

}
</style>
