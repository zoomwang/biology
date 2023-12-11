<script setup>
import { ref } from "vue";
import { notification } from "ant-design-vue";
import { resetPassword } from "../../services/user";

const isPaySuccess = ref(true);

const onRefrush = () => {
  setTimeout(() => {
    isPaySuccess.value = false;
  },4000)
}
const onSubmit = () => {
  if (formState.oldPassword != formState.newPassword) {
    notification.error({
      description: "密码不一致，请确认",
    });
    return;
  }
  validate()
    .then(async (res) => {
      try {
        const data = await resetPassword({
          mobile: formState.mobile,
          newPassword: formState.newPassword,
          code: formState.code,
        });
        if (data?.code == 0) {
          notification.success({
            description: "修改密码成功",
          });
          setTimeout(() => {
            // router.push({name: "login"});
          }, 400);
        }
      } catch (err) {
        alert(err);
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};
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
          src="../../assets/prestore/6.png"
          alt=""
          
        />点击刷新二维码
      </div>
      <div class="crmbpay_tips">您可以使用以下软件扫描上方二维码付款</div>
      <div class="crmbpay_tips_img_box">
        <div>
          <img
            class="ali_icon"
            src="../../assets/prestore/3.png"
            alt=""
          />
          <div class="payment_text" style="margin-left: -8px">支付宝</div>
        </div>
        <div>
          <img
            class="wx_icon"
            src="../../assets/prestore/2.png"
            alt=""
          />
          <div class="payment_text" style="margin-left: 30px">微信</div>
        </div>
        <div>
          <img
            class="unionpay_icon"
            src="../../assets/prestore/9.png"
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
        sub-title="请关注公众号."
      >
        <template #extra>
          <!-- <a-button key="console" type="primary">确定</a-button>
          <a-button key="buy">关闭</a-button> -->
        </template>
      </a-result>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.pay-wrap {
  flex-direction: column;
  text-align: center;
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
