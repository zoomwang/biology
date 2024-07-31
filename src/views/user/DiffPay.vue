<script setup>
// import TheWelcome from '@/components/Wx.vue';
import {
  ref,
  computed,
  reactive,
  defineComponent,
  watch,
  onUpdated,
  onMounted,
  defineProps,
} from "vue";
import {
  getDiffStatus
} from "@/services/order";
import QRCode from 'qrcode';
import { notification } from "ant-design-vue";

let props = defineProps(["diffPayData","successCall"]);
const { codeUrl, payType, cost, orderId, successCall } = props.diffPayData;
const isPaySuccess = ref(false);
let interval = ref(null);
let imgUrl = reactive({
  value: ''
});

watch(codeUrl, async (newdata, olddata) => {
  getQrCode()
})

const getQrCode = async() => {
  QRCode.toDataURL(codeUrl)
  .then(url => {
    imgUrl.value = url;
    console.log(url)
  })
  .catch(err => {
    console.error(err)
  })
}

const roll = () => {
  interval.value = setInterval(async () => {
    const res = await getDiffStatus(orderId);
    if (res?.code == 0 && res?.data == 2) {
      isPaySuccess.value = true;
      props.successCall();
      clearInterval(interval.value);
    }
  }, 2000);
};

let payVisible = ref(true);

onMounted(() => {
  getQrCode();
  roll();
})
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <!-- 支付弹层 -->
    <a-modal
      class="order-modal-wrap"
      v-model:visible="payVisible"
      title="在线支付"
      width="400px"
      :footer="null"
    >
    <div class="pay-wrap d-flex" id="cmbPayDialog">
    <div v-show="!isPaySuccess">
      <div class="unionPayMoney">
        应付金额<span>￥</span><span class="unionPayMoney_span">{{cost}}</span>
      </div>
      <img
        id="cmbPayDialog_img"
        alt="聚合二扫码支付"
        :src="imgUrl.value"
      />
      <div class="cmbPayDialog_img_smegma_refresh" @click="getQrCode()">
        <img
          class="cmbPayDialog_img_smegma_refresh_icon"
          src="../../assets/prestore/6.png"
          alt=""
        />点击刷新二维码
      </div>
      <div class="crmbpay_tips">您可以使用以下软件扫描上方二维码付款</div>
      <div class="crmbpay_tips_img_box">
        <div v-if="payType == 1">
          <img class="ali_icon" src="../../assets/prestore/3.png" alt="" />
          <div class="payment_text" style="margin-left: 54px">支付宝</div>
        </div>
        <div v-if="payType == 2">
          <img class="wx_icon" src="../../assets/prestore/2.png" alt="" />
          <div class="payment_text" style="margin-left: 54px">微信</div>
        </div>
        <div v-if="payType == 3">
          <img
            class="unionpay_icon"
            src="../../assets/prestore/9.png"
            alt=""
          />
          <div class="payment_text" style="margin-left: 54px">银联</div>
        </div>
      </div>
    </div>
    <div v-show="isPaySuccess">
      <a-result status="success" title="支付成功!">
      </a-result>
    </div>
    </div>
    </a-modal>
  </main>
</template>
<style lang="scss" scoped>
.d-pay {
  margin-top: 10px;
  padding: 15px 0 15px 10px;
  background: #fff;
  box-shadow: 3px 3px 4px 3px rgba(0, 0, 0, 0.1);
}
.cost {
  line-height: 32px;
  flex: 1;
  background: #fff;
}
.card-wrap {
  p {
    font-weight: bold;
    span {
      margin-top: 14px;
      font-size: 24px;
      color: #1890ff !important;
      vertical-align: bottom;
    }
  }
  .wait_pay {
    overflow: hidden;
    height: 37px;
    line-height: 37px;
  }
}

.payway_list {
  width: 100%;
}
.payway_list_item {
  position: relative;
  width: 100%;
  height: 48px;
  line-height: 48px;
  padding-left: 16px;
  cursor: pointer;
}
.payway_list_item_active {
  background-color: #eefcf6;
  background-color: rgba(50, 214, 147, 0.08);
  background-repeat: no-repeat;
  background-position: 20px center;
}
.payway_list_item img {
  float: left;
  width: 28px;
  height: 28px;
  margin-top: 10px;
}
.payway_list_item img.pay_type {
  width: 120px;
  height: 32px;
}
.payway_list_item img.credit {
  position: absolute;
  left: 110px;
  top: -14px;
  width: 148px;
  height: 19px;
}
.payway_list_item p {
  float: left;
  line-height: 48px;
  margin-left: 12px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.65);
}
.payway_list_item span {
  display: block;
  height: 48px;
  line-height: 54px;
  float: left;
  margin-left: 10px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
}
.coupon_box {
  position: relative;
  background: #fff;
  margin-top: 20px;
  padding: 30px 20px 0 0;
  transition: all 0.3s linear;
}
.payway_list_other {
  height: auto;
}
.amount {
  color: #1890ff !important;
  font-size: 16px;
  vertical-align: middle;
  font-weight: bold;
}
.pay-wrap {
  flex-direction: column;
  text-align: center;
  p {
    padding-left: 30px;
    text-align: left;
  }
}
#cmbPayDialog {
  height: 400px;
}
#cmbPayDialog .unionPayMoney {
  font-size: 14px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
  line-height: 20px;
  // position: absolute;
  // top: 82px;
  text-align: center;
  width: 100%;
  span {
    color: red;
    font-size: 22px;
  }
}
#cmbPayDialog #cmbPayDialog_img {
  display: block;
  width: 180px;
  height: 180px;
  margin: 0 auto;
  // position: absolute;
  // top: 118px;
  // left: 106px;
}
#cmbPayDialog .cmbPayDialog_img_smegma_refresh {
  cursor: pointer;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 20px;
  // position: absolute;
  // top: 296px;
  // left: 138px;
}
#cmbPayDialog .crmbpay_tips {
  margin: 20px 0;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 20px;
  // position: absolute;
  // top: 328px;
  text-align: center;
  width: 100%;
}
#cmbPayDialog .crmbpay_tips_img_box {
  margin-bottom: 32px;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 105px;
  justify-content: flex-start;
  // position: absolute;
  // top: 362px;
}
#cmbPayDialog .cmbPayDialog_img_smegma_refresh_icon {
  width: 14px;
  height: 14px;
  margin: -2px 3px 0 0;
}

#cmbPayDialog .ali_icon {
  width: 24px;
  height: 24px;
  margin-left: 58px;
  margin-bottom: 4px;
}

#cmbPayDialog .wx_icon {
  width: 27px;
  height: 24px;
  margin-left: 58px;
  margin-bottom: 4px;
}

#cmbPayDialog .unionpay_icon {
  width: 36px;
  height: 24px;
  margin-left: 58px;
  margin-bottom: 4px;
}

#cmbPayDialog .payment_text {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 17px;
}
</style>