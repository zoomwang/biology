<script setup>
import { ref } from "vue";
import { notification } from "ant-design-vue";

const isPaySuccess = ref(true);

const onRefrush = () => {
  setTimeout(() => {
    isPaySuccess.value = false;
  },4000)
}
</script>

<template>
  <div class="pay-wrap d-flex" id="cmbPayDialog">
    <div v-show="isPaySuccess">
      <div class="unionPayMoney">
        应付金额<span>￥</span><span class="unionPayMoney_span">1000</span>
      </div>
      <img id="cmbPayDialog_img" alt="聚合二扫码支付" src="https://pay.shiyanjia.com/qrcode.html?data=https%3A%2F%2Fqr.95516.com%2F03080000%2F1004%2F100423120519562994667700" />
      <div class="cmbPayDialog_img_smegma_refresh" @click="onRefrush()">
        <img
          class="cmbPayDialog_img_smegma_refresh_icon"
          src="../assets/prestore/6.png"
          alt=""
          
        />点击刷新二维码
      </div>
      <div class="crmbpay_tips">您可以使用以下软件扫描上方二维码付款</div>
      <div class="crmbpay_tips_img_box">
        <div>
          <img
            class="ali_icon"
            src="../assets/prestore/3.png"
            alt=""
          />
          <div class="payment_text" style="margin-left: -8px">支付宝</div>
        </div>
        <div>
          <img
            class="wx_icon"
            src="../assets/prestore/2.png"
            alt=""
          />
          <div class="payment_text" style="margin-left: 30px">微信</div>
        </div>
        <div>
          <img
            class="unionpay_icon"
            src="../assets/prestore/9.png"
            alt=""
          />
          <div class="payment_text" style="margin-left: 30px">银联</div>
        </div>
      </div>
    </div>
    <div v-show="!isPaySuccess">
      <a-result
        status="success"
        title="支付成功!"
      >
        <template #extra>
          <p>订单号为：283912823288</p>
          <p>充值金额：2000.00</p>
          <p>申请时间：2023-12-11 10:13</p>
          <p>发票抬头：广东工业大学</p>
          <p>纳税人识别号：12330000470003281H</p>
        </template>
      </a-result>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.pay-wrap {
  flex-direction: column;
  text-align: center;
  p{
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
  span{
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
  margin-bottom: 4px;
}

#cmbPayDialog .wx_icon {
  width: 27px;
  height: 24px;
  margin-left: 28px;
  margin-bottom: 4px;
}

#cmbPayDialog .unionpay_icon {
  width: 36px;
  height: 24px;
  margin-left: 28px;
  margin-bottom: 4px;
}

#cmbPayDialog .payment_text {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 17px;
}
</style>
